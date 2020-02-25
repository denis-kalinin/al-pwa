interface IFirestoreUserDetails {
  nickname?: string;
  email?: string;
}

interface IFirestoreAuthenticationState {
  userDetails: IFirestoreUserDetails;
  username?: string;
  /**
   * Vuex action to update authentication details
   * @param userDetails to be set in the Vuex store
   */
  updateUserDetails(userDetails?:IFirestoreUserDetails): void;
}

export { IFirestoreAuthenticationState, IFirestoreUserDetails };
