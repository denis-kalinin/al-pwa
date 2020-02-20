import axios from 'axios';
import { usernameAuthProvider } from '@/firestore/FirestoreAuthProvider';
import FirestoreApi from '@/firestore/api/FirestoreApi';
import EventBus from '@/services/eventbus';

export default class FirestoreUserService {
  /**
   * This is locally hold refresh token if session storage is not available
   */
  private localRefereshToken: string | null = null;

  private sessionStoragePath: string = `${usernameAuthProvider.name}/refreshToken`;

  constructor() {
    FirestoreApi.authenticationInterceptor = this.authenticateOnReject;
  }

  public get refreshToken(): string | null {
    return globalThis.sessionStorage?.getItem(this.sessionStoragePath) ?? this.localRefereshToken;
  }

  public set refreshToken(newRefreshToken: string | null) {
    if (newRefreshToken) {
      if (globalThis.sessionStorage) {
        globalThis.sessionStorage.setItem(this.sessionStoragePath, newRefreshToken);
      } else {
        // console.warn('Refresh token is saved in FirestoreUserService instead of sessionStorage');
        this.localRefereshToken = newRefreshToken;
      }
    } else {
      if (globalThis.sessionStorage) globalThis.sessionStorage.removeItem(this.sessionStoragePath);
      this.localRefereshToken = null;
    }
  }

  private authenticateOnReject = () : Promise<string> => this.getJWT()

  /**
   * Authenticates with `username` and `password` and adds interceptor
   * with `Authorization` header to FirestoreApi
   * @param username
   * @param password
   * @returns refreshToken promise
   */
  public async login(credentials: {username: string, password: string}): Promise<string> {
    console.debug('loggig in', credentials.username);
    const { url, data, config } = usernameAuthProvider.getNewJWTRequestData(credentials);
    const response = await axios.post(url, data, config);
    if (response.data?.idToken) {
      const { idToken, refreshToken } = response.data;
      FirestoreApi.addAuthentication(idToken);
      this.refreshToken = refreshToken;
      return Promise.resolve(refreshToken);
    }
    return Promise.reject(new Error('idToken is not found in the HTTP response'));
  }

  /**
   * @param full clear JWT and refreshToken
   */
  public logout(full: boolean = true): Promise<void> {
    FirestoreApi.removeAuthentication();
    if (full) {
      this.refreshToken = null;
    }
    return Promise.resolve();
  }

  /**
   * @return refreshToken promise
   */
  public async getJWT() : Promise<string> {
    const theRefreshToken = this.refreshToken;
    if (theRefreshToken) {
      try {
        const newIdToken = await FirestoreUserService.refreshAuthentication(theRefreshToken);
        FirestoreApi.removeAuthentication();
        FirestoreApi.addAuthentication(newIdToken);
        return Promise.resolve(newIdToken);
      } catch (e) {
        // proceed futher then
        console.warn('failed to refresh token');
      }
    }
    console.debug('Authentication required... Sending firestore-auth-request event');
    const authObj = await new Promise(
      (
        resolve: (credentials?: { username: string; password: string; }) => void,
        reject: () => void,
      ) => {
        EventBus.$once('firestore-auth-credentials', (credentials: {
          username: string;
          password: string;
        }) => {
          console.debug('EventBus on firestore-auth-credentials', credentials.username);
          if (!credentials) {
            console.debug('credentials are empty');
            reject();
          } else {
            console.debug('credentials:', credentials.username);
            resolve(credentials);
          }
        });
        EventBus.$emit('firestore-auth-request');
      },
    ).then((creds) => {
      console.debug('credentials resovled:', creds.username);
      return creds;
    });
    return this.login(authObj);
  }

  /**
   * Exchanges refresh token for a new ID token
   * @param refreshToken if `undefinded` then it will get refresh token from state module
   */
  public static async refreshAuthentication(refreshToken: string): Promise<string> {
    const { url, data, config } = usernameAuthProvider.getRefreshJWTRequestData(refreshToken);
    const response = await axios.post(url, data, config);
    if (response.data.id_token) {
      console.debug('Refreshed! id_token found', response.data.id_token);
      return response.data.id_token;
    }
    return Promise.reject(new Error('idToken is undefined'));
  }
}
