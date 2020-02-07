import { GetterTree, MutationTree, ActionTree } from 'vuex';
import IAuthenticationState from '@/store/IAuthenticationState';

export class State {
  authentication: IAuthenticationState = {}
}

/**
 * [Vuex Getters](https://vuex.vuejs.org/guide/getters.html)
 */
export const stateGetters = <GetterTree<State, any>> {
  authenticationState(state: State) {
    console.log('Getting jwt', state);
    return state.authentication;
  },
};

/**
 * [Vuex Actions](https://vuex.vuejs.org/guide/actions.html)
 */
export const stateActions = <ActionTree<State, any>>{
  jwt({ commit }, idToken) {
    commit('jwt', idToken);
  },
};

/**
 * [Vuex Mutations](https://vuex.vuejs.org/guide/mutations.html)
 */
export const stateMutations = <MutationTree<State>>{
  jwt(state : State, payload : string) {
    console.log('Commited mutation', state);
    state.authentication.idToken = payload;
  },
};
