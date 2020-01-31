// import firebase, { auth } from 'firebase/app';
// import 'firebase/auth';
import axios from 'axios';
import { IAuthProvider } from './IAuthProvider';

export default class Authentication {
  /**
   * Authenticates with username and password
   * @param username
   * @param password
   * @todo
   */
  public static authenticate(
    username: string, password: string,
    authProvider: IAuthProvider,
  ): Promise<any> {
    const { url, data, config } = authProvider.getRequestData({ username, password });

    return axios.post(url, data, config);
  }

  /**
   * Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.
   *
   * @returns the current token if it has not expired. Otherwise, this will
   * refresh the token and return a new one or,
   * if user hasn't logged in yet - `null`
   */
  public static getJWT(): Promise<string | null> {
    return Promise.reject(new Error('Not implemented'));
  }
}
