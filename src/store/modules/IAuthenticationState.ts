export interface IAuthenticationState {
  idToken?: string;
  authenticated: boolean;
  setIdToken(idToken: string): void;
  updateIdToken(payload: string): void;
}
