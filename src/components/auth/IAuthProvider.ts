import { IAxiousRequestData } from './IAxiosRequestData';

export interface IAuthProvider {
  /**
   * An arbitrary name of the authentication provider, e.g. Firebase, Microsoft
   */
  name: string;

  /**
   * @abstract
   * @param credentials username and password
   *
   */
  getRequestData(credentials: { username: string, password: string }): IAxiousRequestData;
}
