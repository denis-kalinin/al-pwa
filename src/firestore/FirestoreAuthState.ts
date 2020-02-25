import {
  VuexModule, Module, Mutation, Action, getModule, MutationAction,
} from 'vuex-module-decorators';
import { IFirestoreAuthenticationState, IFirestoreUserDetails } from '@/firestore/api/IFirestoreAuthenticationState';
import store from '@/store';

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
  public userDetails: IFirestoreUserDetails = {};

  /**
   * @override {@link IFirestoreAuthenticationState#username}
   */
  public get username(): string | undefined {
    return this.userDetails.nickname ?? this.userDetails.email;
  }

  /**
   * @override {@link IFirestoreAuthenticationState#updateUserDetails}
   * @param userDetails
   */
  @Action
  public updateUserDetails(userDetails?: IFirestoreUserDetails): void {
    this.context.commit('setUserDetails', userDetails);
  }

  @Mutation
  private setUserDetails(userDetails?:IFirestoreUserDetails): void {
    this.userDetails = userDetails ?? {};
  }
}
