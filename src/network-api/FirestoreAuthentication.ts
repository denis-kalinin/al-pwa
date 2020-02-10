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
}
