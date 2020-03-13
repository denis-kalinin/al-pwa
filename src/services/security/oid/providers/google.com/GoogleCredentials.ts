import { IAuthCredentials } from '@/services/security/IAuthCredentials';

export default class GoogleCredentials implements IAuthCredentials {
  providerId: string = 'google.com';

  endpoint: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp';

  body!: {
    postBody:string,
    returnSecureToken:boolean,
    requestUri: string,
  };

  params?: { key:string };

  constructor(googleIdToken: string, requestUri: string) {
    this.body = {
      postBody: `id_token=${googleIdToken}&providerId=${this.providerId}`,
      returnSecureToken: true,
      requestUri,
    };
  }

  setApiKey(firebaseApiKey:string): void {
    this.params = { key: firebaseApiKey };
  }
}
