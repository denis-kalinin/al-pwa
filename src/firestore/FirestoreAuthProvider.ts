import { IAuthProvider } from '@/firestore/api/IAuthProvider';
import { IAxiousRequestData } from '@/firestore/api/IAxiosRequestData';
import FirestoreConfig from '@/firestore/api/FirebaseConfig';


export default class FirestoreUsernameAuthProvider implements IAuthProvider {
  readonly name: string = 'FirebaseAuthProvider';

  private apiKey: string = FirestoreConfig.apiKey;

  /**
   * @override {@link IAuthProvider}
   */
  getNewJWTRequestData(credentials: { username:string, password:string }): IAxiousRequestData {
    return {
      url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      data: {
        returnSecureToken: true,
        email: credentials.username,
        password: credentials.password,
      },
      config: {
        params: { key: this.apiKey },
      },
    };
  }

  getRefreshJWTRequestData(refreshToken: string): IAxiousRequestData {
    return {
      url: 'https://securetoken.googleapis.com/v1/token',
      data: {},
      config: {
        params: {
          key: this.apiKey,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      },
    };
  }
}
const usernameAuthProvider: IAuthProvider = new FirestoreUsernameAuthProvider();
export { usernameAuthProvider };
