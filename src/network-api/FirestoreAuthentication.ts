import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { getModule } from 'vuex-module-decorators';
import loginPasswordAuthProvider from '@/components/auth/LoginPasswordProvider';
import store from '@/store';
import EventBus from '@/services/eventbus';
import { IAuthProvider } from '@/components/auth/IAuthProvider';
import AuthenticationStateModule from '@/store/modules/auth';

export default class FirestoreAuthentication {
  private authProvider: IAuthProvider = loginPasswordAuthProvider;

  private authState: AuthenticationStateModule = getModule(AuthenticationStateModule, store);

  constructor(axiosInstance: AxiosInstance) {
    const innerAxios = axiosInstance;
    axiosInstance.interceptors.response.use(undefined, (err) => {
      const originalRequest = err.config;
      console.log('Inercepting');
      if (err.response.status === 403 && !originalRequest.retry) {
        originalRequest.retry = true;
        return this.getJWT()
          .then((idToken) => {
            debugger;
            console.debug('idToken set', idToken);
            /*
            axiosInstance.interceptors.request.use((config) => {
              const newConfig = config;
              if (idToken) {
                newConfig.headers.common.Authorization = `Bearer ${idToken}`;
              } else {
                delete newConfig.headers.common.Authorization;
              }
              return newConfig;
            });
            */
            if (idToken) {
              innerAxios.defaults.headers.common.Authorization = `Bearer ${idToken}`;
              EventBus.$root.$on('auth-logout', (data:string) => {
                console.debug('auth-logout', data);
                axiosInstance.interceptors.request.use((config) => {
                  debugger;
                  const newConfig = config;
                  delete newConfig.headers.common.Authorization;
                  return newConfig;
                });
              });
            } else {
              delete innerAxios.defaults.headers.common.Authorization;
            }
            return axiosInstance(originalRequest);
          });
        /*
        return authPromise
          .then((authObj) => {
            const { username, password } = authObj;
            return firestoreAuthentication.authenticate(username, password);
          })
          .catch((authError) => {
            console.log('auth error', authError);
          })
          .then((idToken) => {
            console.log('idToken set', idToken);
            axiosInstance.interceptors.request.use((config) => {
              const newConfig = config;
              if (idToken) {
                newConfig.headers.Authorization = `Bearer ${idToken}`;
              } else {
                delete newConfig.headers.Autherization;
              }
              return newConfig;
            });
            return axiosInstance(originalRequest);
          });
        */
      }
      return Promise.reject(err);
    });
  }

  public setAuthenticationProvider(authProvider : IAuthProvider) : void {
    this.authProvider = authProvider;
  }

  /**
   * Authenticates with `username` and `password`
   * @param username
   * @param password
   * @returns idToken
   */
  public authenticate(username: string, password: string): Promise<string> {
    const { url, data, config } = this.authProvider.getNewJWTRequestData({ username, password });
    return axios.post(url, data, config)
      .then((response) => {
        if (response.data?.idToken) {
          this.authState.setIdToken(response.data.idToken);
          this.authState.setRefreshToken(response.data.refreshToken);
          return response.data.idToken;
        }
        throw new Error('idToken is not found in the HTTP response');
      });
  }

  /**
   * Exchanges refresh token for a new ID token
   * @param refreshToken if `undefinded` then it will get refresh token from state module
   */
  public refreshAuthentication(refreshToken?: string): Promise<string> {
    const theRefreshToken = refreshToken ?? this.authState.refreshToken;
    if (theRefreshToken) {
      const { url, data, config } = this.authProvider.getRefreshJWTRequestData(theRefreshToken);
      return axios.post(url, data, config)
        .then((response) => {
          // this.updateIdToken(response.data?.idToken);
          this.authState.updateIdToken(response.data.id_token);
          this.authState.updateRefreshToken(response.data.refresh_token);
          console.dir(response.data);
          if (response.data.id_token) {
            console.info('id_token found');
            return response.data.id_token;
          }
          return Promise.reject(new Error('idToken is undefined'));
        });
    }
    return Promise.reject(new Error('refreshToken is not found. Authenticate first!'));
  }

  /**
   * Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.
   *
   * @returns the current token if it has not expired. Otherwise, this will
   * refresh the token and return a new one or,
   * @throws if user hasn't logged in yet
   */
  public getJWT() : Promise<string> {
    const { idToken, refreshToken } = this.authState;
    if (idToken && idToken.length > 0) return Promise.resolve(idToken);
    if (refreshToken) {
      return this.refreshAuthentication(refreshToken);
    }
    console.log('Authentication required...');
    EventBus.$emit('auth-request');
    return new Promise(
      (
        resolve: (auth?: {username:string, password:string}) => void,
        reject: () => void,
      ) => {
        EventBus.$once('auth-response', (auther?: {username:string, password:string}) => {
          console.log('EventBus on auth-response', auther);
          if (!auther) reject();
          resolve(auther);
        });
      },
    ).then((authObj) => {
      const { username, password } = authObj;
      return this.authenticate(username, password);
    });
  }
}
