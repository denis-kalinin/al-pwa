import {
  VuexModule, Module, Mutation, Action, getModule,
} from 'vuex-module-decorators';
import { IAuthenticationState } from '@/store/modules/IAuthenticationState';
// import store from '@/store';

// @Module({ dynamic: true, store, name: 'authentication' })
// @Module({ namespaced: true, name: 'authentication' })
@Module({ namespaced: true, name: 'authentication' })
export default class AuthenticationState extends VuexModule implements IAuthenticationState {
  public idToken: string = '';

  public authenticated: boolean = false;

  @Mutation
  public setIdToken(idToken: string): void {
    this.idToken = idToken;
    this.authenticated = !!idToken && idToken.length > 0;
  }

  @Action({ rawError: true })
  updateIdToken(payload: string) {
    this.context.commit('setIdToken', payload);
  }
}
// const AuthenticationStateModule = getModule(AuthenticationState);
// export default AuthenticationStateModule;
