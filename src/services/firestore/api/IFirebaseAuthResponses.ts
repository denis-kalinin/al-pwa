export interface IFirebaseAuthTokenResponse {
  federatedId?: string;

  providerId?: string;

  email?: string;

  emailVerified?: boolean;

  firstName?: string;

  fullName?: string;

  lastName?: string;

  photoUrl?: string;

  localId?: string;

  displayName?: string;

  idToken: string;

  refreshToken?: string;

  expiresIn?: string;

  oauthIdToken?: string;

  rawUserInfo?: string;

  kind?: string;

  registered?: boolean;
}

export interface IFirebaseAuthRefreshResponse {
  /* eslint-disable camelcase */
  access_token?: string;
  /* eslint-disable camelcase */
  expires_in?: string;
  /* eslint-disable camelcase */
  token_type?: string;
  /* eslint-disable camelcase */
  refresh_token?: string;
  /* eslint-disable camelcase */
  id_token: string;
  /* eslint-disable camelcase */
  user_id?: string;
  /* eslint-disable camelcase */
  project_id?: string;
}
enum AuthType {
  REFRESH,
  TOKEN,
}
type FirebaseAuthResponse = IFirebaseAuthRefreshResponse | IFirebaseAuthTokenResponse;
export { FirebaseAuthResponse, AuthType };
