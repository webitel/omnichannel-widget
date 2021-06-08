import { postMessageToWSServer, addMsgCallback } from '../../../app/workers/websocket-shared-worker/install';

const state = {
  // draft: '',
  messages: [
    {
      data: { text: 'Hello there!' },
      id: 1,
      my: false,
    },
    {
      data: { text: 'KENOBUS' },
      id: 2,
      my: true,
    },
    {
      data: { text: 'Hello there!' },
      id: 1,
      my: false,
    },
    {
      data: { text: 'KENOBUS' },
      id: 2,
      my: true,
    },
    {
      data: { text: 'Hello there!' },
      id: 1,
      my: false,
    },
    {
      data: { text: 'KENOBUS' },
      id: 2,
      my: true,
    },
    {
      data: { text: 'Hello there!' },
      id: 1,
      my: false,
    },
    {
      data: { text: 'KENOBUS' },
      id: 2,
      my: true,
    },
    {
      data: { text: 'Hello there!' },
      id: 1,
      my: false,
    },
    {
      data: { text: 'KENOBUS' },
      id: 2,
      my: true,
    },
    {
      data: { text: 'Hello there!' },
      id: 1,
      my: false,
    },
    {
      data: { text: 'KENOBUS' },
      id: 2,
      my: true,
    },
    {
      data: { text: 'Hello there!' },
      id: 1,
      my: false,
    },
    {
      data: { text: 'KENOBUS' },
      id: 2,
      my: true,
    },
    {
      data: { text: 'Hello there!' },
      id: 1,
      my: false,
    },
    {
      data: { text: 'KENOBUS' },
      id: 2,
      my: true,
    },
  ],
};

const getters = {};

const actions = {
  SUBSCRIBE_TO_MESSAGES: (context) => {
    const msgHandler = (context) => (msg) => context.dispatch('RECEIVE_MESSAGE', msg);
    addMsgCallback(msgHandler(context));
  },
  SEND_MESSAGE: (context, draft) => {
    postMessageToWSServer(draft);
    // context.commit('SET_DRAFT', '');
  },
  RECEIVE_MESSAGE: (context, message) => {
    context.commit('PUSH_MESSAGE', message);
  },
  SEND_FILE: (context, file) => {
    console.info('send file action called with', file);
  },
};

const mutations = {
  // SET_DRAFT: (state, draft) => {
  //   state.draft = draft;
  // },
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
