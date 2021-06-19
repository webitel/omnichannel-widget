import { objSnakeToCamel } from '../../../app/webitel-ui/scripts/caseConverters';
import { postMessageToWSServer, addMsgCallback } from '../../../app/workers/websocket-shared-worker/install';
import MessageType from '../enums/MessageType.enum';

const parseMessage = (_message) => {
  const message = objSnakeToCamel(_message);
  switch (message.type) {
    case MessageType.TEXT:
      return message;
    case MessageType.FILE:
      return message;
    case MessageType.CONTACT:
      return message;
    case MessageType.JOINED:
      return message;
    case MessageType.LEFT:
      return message;
    case MessageType.CLOSED:
      return message;
    default:
      return message;
  }
};

const state = {
  draft: '',
  messages: [],
  seq: 1,
};

const getters = {};

const actions = {
  SUBSCRIBE_TO_MESSAGES: (context) => {
    const msgHandler = (context) => (msg) => {
      context.dispatch('ON_SESSION_INFO_MESSAGE', msg);
      return (msg) => context.dispatch('ON_MESSAGE', msg);
    };
    addMsgCallback(msgHandler(context));
  },

  // process chat session data, received as 1st msg
  ON_SESSION_INFO_MESSAGE: (context, data) => {
    console.info('here hoes session data!', data);
    if (data.messages) {
      context.commit('SET_MESSAGES', data.messages);
      const lastSeqMessage = data.messages.findLast((msg) => msg.seq);
      if (lastSeqMessage) {
        context.commit('INCREMENT_SEQ', lastSeqMessage.seq);
      }
    }
  },

  ON_MESSAGE: (context, _message) => {
    const message = parseMessage(_message.data);
    return message.seq
      ? context.dispatch('REPLACE_MESSAGE')
      : context.dispatch('ADD_MESSAGE');
  },

  REPLACE_MESSAGE: (context, message) => {
    context.commit('REPLACE_MESSAGE_BY_SEQ', message);
  },

  ADD_MESSAGE: (context, message) => {
    context.commit('PUSH_MESSAGE', message);
  },

  SEND_MESSAGE: (context) => {
    const { draft, seq } = context.state;
    const message = { seq, text: draft };
    postMessageToWSServer(message);
    context.commit('INCREMENT_SEQ');
    context.dispatch('SET_DRAFT', '');
  },

  SEND_FILE: (context, file) => {
    console.info('send file action called with', file);
  },

  SET_DRAFT: (context, draft) => {
    context.commit('SET_DRAFT', draft);
  },
};

const mutations = {
  SET_MESSAGES: (state, messages) => {
    state.messages = messages;
  },
  SET_DRAFT: (state, draft) => {
    state.draft = draft;
  },
  REPLACE_MESSAGE_BY_SEQ: (state, newMsg) => {
    const msgIndex = state.messages.findIndex((msg) => msg.seq === newMsg.seq);
    state.messages.splice(msgIndex, 1, newMsg);
  },
  PUSH_MESSAGE: (state, message) => {
    state.messages.push(message);
  },
  INCREMENT_SEQ: (state, seq) => {
    state.seq = (seq || state.seq) + 1;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
