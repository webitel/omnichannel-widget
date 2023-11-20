import Vue from 'vue';
import Vuex from 'vuex';

// modules
import appointment from '../../modules/appointment/store/appointment';
import chat from '../../modules/chat/store/chat';
import call from '../../modules/call/store/call';
import notifications from '../../modules/notifications/notifications';

Vue.use(Vuex);

const state = {
  config: {},
  offline: false,
};

const actions = {
  SUBSCRIBE_TO_NETWORK_CONNECTION_STATUS: (context) => {
    // don't need to unsubscribe because subscription should be active for the whole app lifecycle
    window.addEventListener('offline', () => {
      context.commit('SET_OFFLINE', true);
    });
    // don't need to unsubscribe because subscription should be active for the whole app lifecycle
    window.addEventListener('online', () => {
      context.commit('SET_OFFLINE', false);
    });
  },
  INITIALIZE_SESSION: (context, payload) => Promise.allSettled([
    context.dispatch('chat/SUBSCRIBE_TO_MESSAGES', payload),
    context.dispatch('notifications/INITIALIZE'),
  ]),
  CLOSE_SESSION: (context) => Promise.allSettled([
    context.dispatch('notifications/DESTROY'),
  ]),
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
  SET_OFFLINE: (state, offline) => {
    state.offline = offline;
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    appointment,
    chat,
    call,
    notifications,
  },
});
