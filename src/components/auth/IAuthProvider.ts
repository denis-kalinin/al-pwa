import { IAxiousRequestData } from './IAxiosRequestData';

export interface IAuthProvider {
  /**
   * An arbitrary name of the authentication provider, e.g. Firebase, Microsoft
   */
  name: string;

  /**
   * JWT's refresh token
   */
  refreshToken?: string;

  /**
   * @abstract
   * Gets data for axsious to request JWT
   * @param credentials username and password
   *
   */
  getNewJWTRequestData(credentials: { username: string, password: string }): IAxiousRequestData;

  /**
   * @abstract
   * Gets data for axious request to refresh JWT
   * @param refreshToken a refresh token in exchange for a new JWT
   *
   */
  getRefreshJWTRequestData(refreshToken: string): IAxiousRequestData;

}
