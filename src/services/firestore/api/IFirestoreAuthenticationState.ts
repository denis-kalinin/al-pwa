import { FirebaseAuthResponse, AuthType } from './IFirebaseAuthResponses';

interface IUserDetails {
  providerId?: string;

  email?: string;

  firstName?: string;

  lastName?: string;

  fullName?: string;

  displayName?: string;

  photoUrl?: string;

  localId?: string;

  registered?: boolean;
}

interface IFirestoreAuthenticationState {
  userData: { signedIn: boolean, userData?: IUserDetails };
  clearUserDetails(): void;
  /**
   * Vuex action to update authentication details
   * @param userDetails to be set in the Vuex store
   */
  updateUserDetails(typedResponse: { userDetails: FirebaseAuthResponse, authType: AuthType }): void;
}

export { IFirestoreAuthenticationState, IUserDetails };
