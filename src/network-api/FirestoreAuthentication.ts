import axios, { AxiosResponse } from 'axios';
import { getModule } from 'vuex-module-decorators';
import loginPasswordAuthProvider from '@/components/auth/LoginPasswordProvider';
import store from '@/store';
import { IAuthProvider } from '@/components/auth/IAuthProvider';
import AuthenticationStateModule from '@/store/modules/auth';

export default class FirestoreAuthentication {
  private authProvider: IAuthProvider = loginPasswordAuthProvider;

  private authState: AuthenticationStateModule = getModule(AuthenticationStateModule, store);

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
          this.authState.updateIdToken(response.data.idToken);
          this.authState.updateRefreshToken(response.data.refreshToken);
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
    return Promise.reject(new Error('Sign-in!'));
  }
}
