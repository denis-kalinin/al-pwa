import { IAxiousRequestData } from './IAxiosRequestData';
import { IAuthCredentials } from '@/services/security/IAuthCredentials';

export interface IAuthProvider {
  /**
   * An arbitrary name of the authentication provider, e.g. Firebase, Microsoft
   */
  name: string;

  refreshToken?: string;
  /**
   * @abstract
   * Gets data for axious to request JWT
   * @param credentials
   *
   */
  getNewJWTRequestData(credentials: IAuthCredentials): IAxiousRequestData;

  /**
   * @abstract
   * Gets data for axious request to refresh JWT
   * @param refreshToken a refresh token in exchange for a new JWT
   *
   */
  getRefreshJWTRequestData(refreshToken: string): IAxiousRequestData;

}
