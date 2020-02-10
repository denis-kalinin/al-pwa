import axios from 'axios';
import { getModule } from 'vuex-module-decorators';
import { IAuthProvider } from './IAuthProvider';
import store from '@/store';
import AuthenticationStateModule from '@/store/modules/auth';
import loginPasswordAuthProvider from '@/components/auth/LoginPasswordProvider';

export default class Authentication {
  private static authState: AuthenticationStateModule = getModule(AuthenticationStateModule, store);

  public static currentAuthProvider = loginPasswordAuthProvider;

  /**
   * Authenticates with username and password
   * @param username
   * @param password
   * @todo
   */
  public static authenticate(
    username: string,
    password: string,
    authProvider: IAuthProvider,
  ): Promise<any> {
    const { url, data, config } = authProvider.getNewJWTRequestData({ username, password });

    return axios.post(url, data, config)
      .then((response) => {
        // this.updateIdToken(response.data?.idToken);
        this.authState.updateIdToken(response.data?.idToken);
        this.authState.updateRefreshToken(response.data?.refreshToken);
      });
  }

  public static refreshAuthentication(
    refreshToken: string,
    authProvider: IAuthProvider,
  ): Promise<string> {
    const { url, data, config } = authProvider.getRefreshJWTRequestData(refreshToken);

    return axios.post(url, data, config)
      .then((response) => {
        // this.updateIdToken(response.data?.idToken);
        this.authState.updateIdToken(response.data?.idToken);
        this.authState.updateRefreshToken(response.data?.refreshToken);
        if (response.data?.idToken) {
          return response.data.idToken;
        }
        throw new Error('idToken is woring');
      });
  }

  /**
   * Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.
   *
   * @returns the current token if it has not expired. Otherwise, this will
   * refresh the token and return a new one or,
   * @throws if user hasn't logged in yet
   */
  public static getJWT(
    authProvider: IAuthProvider = Authentication.currentAuthProvider,
  ) : Promise<string> {
    const { idToken } = Authentication.authState;
    if (idToken && idToken.length > 0) return Promise.resolve(idToken);
    if (authProvider.refreshToken) {
      return Authentication.refreshAuthentication(authProvider.refreshToken, authProvider);
    }
    return Promise.reject(new Error('Sing In!'));
  }
}
