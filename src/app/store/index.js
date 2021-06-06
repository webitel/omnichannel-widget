import Vue from 'vue';
import Vuex from 'vuex';

// modules
import chat from '../../modules/chat/store/chat';

Vue.use(Vuex);

const actions = {
  OPEN_SESSION: (context) => {
    return Promise.allSettled([
      context.dispatch('chat/SUBSCRIBE_TO_MESSAGES'),
    ]);
  },
  CLOSE_SESSION: () => {
    throw new Error('HOW TO CLOSE SESSION?');
  },
};

export default new Vuex.Store({
  actions,
  modules: {
    chat,
  },
});
