import axios from 'axios';
import { getModule } from 'vuex-module-decorators';
import { firestoreAuthProvider } from './FirestoreAuthProvider';
import FirestoreApi from './api/FirestoreApi';
import EventBus from '@/services/eventbus';
// import { IFirestoreUserDetails } from '@/firestore/api/IFirestoreAuthenticationState';
import FirestoreAuthState from './FirestoreAuthState';
import { IAuthCredentials } from '@/services/security/IAuthCredentials';
import { IFirebaseAuthTokenResponse, AuthType } from './api/IFirebaseAuthResponses';

export default class FirestoreUserService {
  /**
   * This is locally hold refresh token if session storage is not available
   */
  private localRefereshToken: string | null = null;

  private sessionStoragePath: string = `${firestoreAuthProvider.name}/refreshToken`;

  private authenticateOnReject = () : Promise<string> => this.getJWT();

  private static firestoreAuthState = getModule(FirestoreAuthState);

  constructor() {
    FirestoreApi.authenticationInterceptor = this.authenticateOnReject;
  }

  public get refreshToken(): string | null {
    const globThis = window.self;
    return globThis.sessionStorage?.getItem(this.sessionStoragePath) ?? this.localRefereshToken;
  }

  public set refreshToken(newRefreshToken: string | null) {
    const globThis = window.self;
    if (newRefreshToken) {
      if (globThis.sessionStorage) {
        globThis.sessionStorage.setItem(this.sessionStoragePath, newRefreshToken);
      } else {
        // console.warn('Refresh token is saved in FirestoreUserService instead of sessionStorage');
        this.localRefereshToken = newRefreshToken;
      }
    } else {
      if (globThis.sessionStorage) globThis.sessionStorage.removeItem(this.sessionStoragePath);
      this.localRefereshToken = null;
    }
  }

  /**
   * Authenticates with `username` and `password` and adds interceptor
   * with `Authorization` header to FirestoreApi
   * @param username
   * @param password
   * @returns response data promise
   */
  public async login(credentials: IAuthCredentials): Promise<IFirebaseAuthTokenResponse> {
    const { url, data, config } = firestoreAuthProvider.getNewJWTRequestData(credentials);
    const response = await axios.post(url, data, config);
    if (response.data?.idToken) {
      const { idToken, refreshToken, email } = response.data;
      FirestoreApi.addAuthentication(idToken);
      this.refreshToken = refreshToken;
      FirestoreUserService.firestoreAuthState.updateUserDetails({
        userDetails: response.data,
        authType: AuthType.TOKEN,
      });
      return Promise.resolve(response.data);
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
    FirestoreUserService.firestoreAuthState.clearUserDetails();
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
        resolve: (credentials?: IAuthCredentials) => void,
        reject: (error: Error) => void,
      ) => {
        EventBus.$once('firestore-auth-credentials', (credentials: IAuthCredentials) => {
          if (!credentials) {
            console.debug('credentials are empty');
            reject(new Error('Authentication canceled'));
          } else {
            console.debug('EventBus on firestore-auth-credentials to', credentials.providerId);
            resolve(credentials);
          }
        });
        EventBus.$emit('firestore-auth-request');
      },
    );
    const responseData = await this.login(authObj);
    return responseData.idToken;
  }

  /**
   * Exchanges refresh token for a new ID token
   * @param refreshToken if `undefinded` then it will get refresh token from state module
   */
  public static async refreshAuthentication(refreshToken: string): Promise<string> {
    const { url, data, config } = firestoreAuthProvider.getRefreshJWTRequestData(refreshToken);
    const response = await axios.post(url, data, config);
    const idToken = response.data.id_token;
    if (idToken) {
      console.debug('Refreshed! id_token found', response.data);
      FirestoreUserService.firestoreAuthState.updateUserDetails({
        userDetails: response.data,
        authType: AuthType.REFRESH,
      });
      return idToken;
    }
    return Promise.reject(new Error('idToken is undefined'));
  }
}
