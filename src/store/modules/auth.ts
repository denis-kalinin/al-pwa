import {
  VuexModule, Module, Mutation, Action, getModule, MutationAction,
} from 'vuex-module-decorators';
import { IAuthenticationState } from '@/store/modules/IAuthenticationState';
// import store from '@/store';

// @Module({ dynamic: true, store, name: 'authentication' })
// @Module({ namespaced: true, name: 'authentication' })
@Module({ namespaced: true, name: 'authentication' })
export default class AuthenticationState extends VuexModule implements IAuthenticationState {
  public idToken: string = '';

  private session?: Storage = globalThis.sessionStorage;

  public authenticated: boolean = !!this.session?.getItem('refreshToken');

  get refreshToken(): string | undefined {
    const id = this.idToken;
    const refreshToken = this.session?.getItem('refreshToken');
    if (refreshToken && refreshToken.length > 0) {
      return refreshToken;
    }
    return undefined;
  }

  @Mutation
  public setIdToken(idToken: string): void {
    this.idToken = idToken;
    this.authenticated = !!idToken && idToken.length > 0;
  }

  @Mutation
  public setRefreshToken(refreshToken: string): void {
    if (this.session) this.session.setItem('refreshToken', refreshToken);
    else throw new Error('sessionStorage not found');
  }

  @Action
  updateIdToken(idToken: string) {
    this.context.commit('setIdToken', idToken);
  }

  @Action
  updateRefreshToken(refreshToken: string) {
    console.log('Updateing refresh token', refreshToken);
    this.context.commit('setRefreshToken', refreshToken);
  }
}
// const AuthenticationStateModule = getModule(AuthenticationState);
// export default AuthenticationStateModule;
