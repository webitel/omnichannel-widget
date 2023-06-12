import { createStore } from 'vuex';

// modules
import appointment from '../../modules/appointment/store/appointment';
import chat from '../../modules/chat/store/chat';
import notifications from '../../modules/notifications/notifications';

const state = {
  config: {},
};

const actions = {
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
};

export default createStore({
  state,
  actions,
  mutations,
  modules: {
    appointment,
    chat,
    notifications,
  },
});
