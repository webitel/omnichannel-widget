import Vue from 'vue';
import Vuex from 'vuex';

// modules
import chat from '../../modules/chat/store/chat';
import notifications from '../../modules/notifications/notifications';

Vue.use(Vuex);

const state = {
  config: {},
};

const actions = {
  INITIALIZE_SESSION: (context, payload) => Promise.allSettled([
    context.dispatch('chat/SUBSCRIBE_TO_MESSAGES', payload),
    context.dispatch('notifications/INITIALIZE'),
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
    notifications,
  },
});
