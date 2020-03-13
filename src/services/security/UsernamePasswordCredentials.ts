import { IAuthCredentials } from './IAuthCredentials';

export default class UsernamePasswordCredentials implements IAuthCredentials {
  providerId: string = 'usernamepassword';

  endpoint: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';

  body?: {
    returnSecureToken: boolean,
    email: string,
    password: string,
  };

  params?: { key: string };

  constructor(credentials: { username:string, password:string }) {
    this.body = {
      returnSecureToken: true,
      email: credentials.username,
      password: credentials.password,
    };
  }

  setApiKey(apiKey: string): void {
    this.params = { key: apiKey };
  }
}
