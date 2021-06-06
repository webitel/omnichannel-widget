import { postMessageToWSServer, addMsgCallback } from '../../../app/workers/websocket-shared-worker/install';

const state = {
  draft: '',
  messages: [],
};

const getters = {};

const actions = {
  SUBSCRIBE_TO_MESSAGES: (context) => {
    const msgHandler = (context) => (msg) => context.dispatch('RECEIVE_MESSAGE', msg);
    addMsgCallback(msgHandler(context));
  },
  SEND_MESSAGE: (context) => {
    postMessageToWSServer(context.state.draft);
    context.commit('SET_DRAFT', '');
  },
  RECEIVE_MESSAGE: (context, message) => {
    context.commit('PUSH_MESSAGE', message);
  },
};

const mutations = {
  SET_DRAFT: (state, draft) => {
    state.draft = draft;
  },
  PUSH_MESSAGE: (state, message) => {
    state.messages.push(message);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
