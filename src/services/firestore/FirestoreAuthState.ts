import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
  MutationAction,
} from 'vuex-module-decorators';
import { IFirestoreAuthenticationState, IUserDetails } from './api/IFirestoreAuthenticationState';
import store from '@/store';
import {
  FirebaseAuthResponse,
  IFirebaseAuthTokenResponse,
  IFirebaseAuthRefreshResponse,
  AuthType,
} from './api/IFirebaseAuthResponses';
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
    switch (typedResponse.authType) {
      case AuthType.TOKEN: {
        const ud = FirestoreAuthState.tokenUserData(
          typedResponse.userDetails as IFirebaseAuthTokenResponse,
        );
        this.context.commit('setUserDetails', ud);
        break;
      }
      case AuthType.REFRESH: {
        FirestoreAuthState.refreshUserData(
          typedResponse.userDetails as IFirebaseAuthRefreshResponse,
        ).then((firebaseUserDetails) => {
          this.context.commit('setUserDetails', firebaseUserDetails);
        });
        break;
      }
      default:
    }
  }

  @Mutation
  private deleteUserDetails() {
    this.userData.signedIn = false;
    const toRemove = this.userData;
    delete toRemove.userDetails;
  }

  @Mutation
  private setUserDetails(userDetails: IUserDetails): void {
    this.userData.signedIn = true;
    this.userData.userDetails = userDetails;
  }

  private static tokenUserData(userDetails: IFirebaseAuthTokenResponse): IUserDetails {
    const {
      email,
      fullName,
      photoUrl,
      providerId,
      registered,
    } = userDetails;
    let { displayName } = userDetails;
    if (!displayName) {
      displayName = fullName ?? email;
    } else if (displayName.length === 0) {
      displayName = fullName ?? email;
    }
    return {
      email,
      fullName,
      displayName,
      photoUrl,
      providerId,
      registered,
    };
  }

  private static async refreshUserData(
    userDetails: IFirebaseAuthRefreshResponse,
  ): Promise<IUserDetails> {
    const firebaseUserData = await UserDataService.getUserData(userDetails.id_token);
    if (firebaseUserData.users.length > 0) {
      const {
        photoUrl,
        email,
      } = firebaseUserData.users[0];
      let { displayName } = firebaseUserData.users[0];
      if (!displayName || displayName.length === 0) {
        displayName = email;
      }
      return { email, photoUrl, displayName };
    }
    throw new Error('user data is empty');
  }
}
