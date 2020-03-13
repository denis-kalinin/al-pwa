import { IAuthProvider } from '@/firestore/api/IAuthProvider';
import { IAxiousRequestData } from '@/firestore/api/IAxiosRequestData';
import FirebaseConfig from '@/firestore/api/FirebaseConfig';
import { IAuthCredentials } from '@/services/security/IAuthCredentials';


export default class FirestoreUsernameAuthProvider implements IAuthProvider {
  readonly name: string = 'FirebaseAuthProvider';

  private apiKey: string = FirebaseConfig.apiKey;

  /**
   * @override {@link IAuthProvider}
   */
  getNewJWTRequestData(credentials: IAuthCredentials): IAxiousRequestData {
    credentials.setApiKey(this.apiKey);
    return {
      url: credentials.endpoint,
      data: credentials.body,
      config: {
        params: credentials.params,
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
const firestoreAuthProvider: IAuthProvider = new FirestoreUsernameAuthProvider();
export { firestoreAuthProvider };
