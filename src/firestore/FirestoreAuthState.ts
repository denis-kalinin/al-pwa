import {
  VuexModule, Module, Mutation, Action, getModule, MutationAction,
} from 'vuex-module-decorators';
import { IFirestoreAuthenticationState, IUserDetails } from '@/firestore/api/IFirestoreAuthenticationState';
import store from '@/store';
import {
  FirebaseAuthResponse, IFirebaseAuthTokenResponse, IFirebaseAuthRefreshResponse, AuthType,
} from '@/firestore/api/IFirebaseAuthResponses';
import { UserDataService } from '@/services/security/UserDataService';

@Module({
  dynamic: true,
  namespaced: true,
  store,
  name: 'firestoreAuth',
})
export default class FirestoreAuthState extends VuexModule
  implements IFirestoreAuthenticationState {
  /**
   * @override {@link IFirestoreAuthenticationState#userDetails}
   */
  public userData : {
    signedIn: boolean,
    userDetails?: IUserDetails,
  } = { signedIn: false };

  /**
   * @override {@link IFirestoreAuthenticationState#clearUserDetails}
   */
  @Action
  public clearUserDetails() {
    this.context.commit('deleteUserDetails');
  }

  /**
   * @override {@link IFirestoreAuthenticationState#updateUserDetails}
   * @param userDetails
   */
  @Action
  public updateUserDetails(typedResponse: {
    userDetails: FirebaseAuthResponse,
    authType: AuthType,
  }): void {
    this.context.commit('setUserDetails', typedResponse);
  }

  @Mutation
  private deleteUserDetails() {
    this.userData.signedIn = false;
    const toRemove = this.userData;
    delete toRemove.userDetails;
  }

  @Mutation
  private setUserDetails(
    typedResponse: { userDetails:FirebaseAuthResponse, authType: AuthType },
  ): void {
    this.userData.signedIn = true;
    const authState = this;
    switch (typedResponse.authType) {
      case AuthType.TOKEN: {
        FirestoreAuthState.tokenUserData(
          typedResponse.userDetails as IFirebaseAuthTokenResponse,
          authState,
        );
        break;
      }
      case AuthType.REFRESH: {
        FirestoreAuthState.refreshUserData(
          typedResponse.userDetails as IFirebaseAuthRefreshResponse,
          authState,
        );
        break;
      }
      default:
    }
  }

  private static tokenUserData(
    userDetails: IFirebaseAuthTokenResponse,
    authState: FirestoreAuthState,
  ): void {
    const {
      email,
      fullName,
      photoUrl,
      providerId,
      registered,
    } = userDetails;
    let { displayName } = userDetails;
    if (!displayName) {
      displayName = ((authState.userData.userDetails?.displayName ?? fullName) ?? email);
    } else if (displayName.length === 0) {
      displayName = (fullName ?? email);
    }
    const { userData } = authState;
    userData.userDetails = {
      email,
      fullName,
      displayName,
      photoUrl,
      providerId,
      registered,
    };
  }

  private static refreshUserData(
    userDetails: IFirebaseAuthRefreshResponse,
    authState: FirestoreAuthState,
  ): void {
    UserDataService.getUserData(userDetails.id_token)
      .then((firebaseUserData) => {
        if (firebaseUserData.users.length > 0) {
          const { userData } = authState;
          if (userData.userDetails) {
            userData.userDetails.displayName = firebaseUserData.users[0].displayName;
          } else {
            const {
              photoUrl,
              email,
            } = firebaseUserData.users[0];
            let { displayName } = firebaseUserData.users[0];
            if (!displayName || displayName.length === 0) {
              displayName = email;
            }
            userData.userDetails = {
              email,
              photoUrl,
              displayName,
            };
          }
        }
      });
  }
}
