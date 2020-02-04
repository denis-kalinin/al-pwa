import { IAuthProvider } from './IAuthProvider';
import { IAxiousRequestData } from './IAxiosRequestData';

export default class FirebaseAuthProvider implements IAuthProvider {
  readonly name: string = 'FirebaseAuthProvider';

  apiKey!: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * @override {@link IAuthProvider}
   */
  getRequestData(credentials: {username:string, password:string}): IAxiousRequestData {
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
}
