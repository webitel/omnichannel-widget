import Vue from 'vue';
import Vuex from 'vuex';

// modules
import chat from '../../modules/chat/store/chat';

Vue.use(Vuex);

const state = {
  config: {},
};

const actions = {
  INITIALIZE_SESSION: (context, payload) => Promise.allSettled([
    context.dispatch('chat/SUBSCRIBE_TO_MESSAGES', payload),
  ]),
  CLOSE_SESSION: () => {
    throw new Error('HOW TO CLOSE SESSION?');
  },
  SET_CONFIG: (context, config) => {
    context.commit('SET_CONFIG', config);
  },
};

const mutations = {
  SET_CONFIG: (state, config) => {
    state.config = {
      ...state.config,
      ...config,
    };
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    chat,
  },
});
