import { IAuthProvider } from './IAuthProvider';
import { IAxiousRequestData } from './IAxiosRequestData';


export default class FirebaseAuthProvider implements IAuthProvider {
  readonly name: string = 'FirebaseAuthProvider';

  private apiKey!: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

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
      data: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      config: {
        params: { key: this.apiKey },
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      },
    };
  }
}
