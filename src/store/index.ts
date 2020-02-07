import Vue from 'vue';
import Vuex from 'vuex';
import AuthenticationStateModule from '@/store/modules/auth';
// import { IAuthenticationState } from '@/store/modules/IAuthenticationState';


// https://stackoverflow.com/questions/53807294/how-is-the-correct-way-to-work-with-vuex-and-typescript
// https://blog.logrocket.com/how-to-write-a-vue-js-app-completely-in-typescript/

Vue.use(Vuex);

export interface IRootState {
  // authentication: IAuthenticationState,
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    authentication: AuthenticationStateModule,
  },
});
