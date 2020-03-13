export interface IAuthCredentials {
  providerId: string;

  endpoint: string;

  body?: any;

  params?: { [key:string]: string };

  setApiKey(apiKey:string) : void;

}
