import Vue from 'vue';
import Vuex from 'vuex';
import {
  State, stateGetters, stateMutations, stateActions,
} from '@/store/State';


// https://stackoverflow.com/questions/53807294/how-is-the-correct-way-to-work-with-vuex-and-typescript

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: new State(),
  getters: stateGetters,
  mutations: stateMutations,
  actions: stateActions,
  modules: {
  },
});
