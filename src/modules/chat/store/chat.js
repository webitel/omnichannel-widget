import { objSnakeToCamel } from '../../../app/webitel-ui/scripts/caseConverters';
import MessageType from '../enums/MessageType.enum';

const parseMessage = (_message) => {
  if (!_message.message && !_message.type) return { ..._message, type: MessageType.INIT }; // 1st message of session without type - init
  const { message } = objSnakeToCamel(_message);
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

const triggerListeners = ({ listeners, event, payload }) => Promise.all(listeners[event].map((callback) => callback(payload)));

const state = {
  messageClient: null,
  draft: '',
  messages: [],
  user: {},
  seq: 1,
  isConnectionClosed: false,
  _listeners: {
    [MessageType.INIT]: [],
    [MessageType.TEXT]: [],
    [MessageType.FILE]: [],
    [MessageType.CONTACT]: [],
    [MessageType.JOINED]: [],
    [MessageType.LEFT]: [],
    [MessageType.CLOSED]: [],
  },
};

const getters = {
  IS_MY_MESSAGE: (state) => (message) => message.from?.contact === state.user?.contact,
};

const actions = {
  SUBSCRIBE_TO_MESSAGES: (context, { messageClient }) => {
    messageClient.addEventListener('message', (msg) => context.dispatch('ON_MESSAGE', msg));
    context.commit('SET_MESSAGE_CLIENT', messageClient);

    context.commit('ADD_LISTENER', {
      event: MessageType.INIT,
      callback: (data) => context.dispatch('ON_SESSION_INFO_MESSAGE', data),
    });

    context.commit('ADD_LISTENER', {
      event: MessageType.CLOSED,
      callback: () => context.dispatch('SET_CONNECTION_STATUS', true), // set "true" to isConnectionClosed
    });

    return context.dispatch('OPEN_SESSION');
  },

  OPEN_SESSION: async (context) => {
    try {
      await context.state.messageClient.openSocket();
      await context.dispatch('SET_CONNECTION_STATUS', false); // set "false" to isConnectionClosed
    } catch (err) {
      throw err;
    }
  },

  // process chat session data, received as 1st msg
  ON_SESSION_INFO_MESSAGE: (context, data) => {
    const { user, msgs } = data;
    context.commit('SET_USER', user);
    if (msgs) {
      context.commit('SET_MESSAGES', msgs);
    }
  },

  ON_MESSAGE: async (context, _message) => {
    const message = parseMessage(_message.data);
    if (message.seq) await context.dispatch('REPLACE_MESSAGE', message);
    else await context.dispatch('ADD_MESSAGE', message);
    await triggerListeners({
      event: message.type,
      listeners: state._listeners,
      payload: message,
    });
  },

  REPLACE_MESSAGE: (context, message) => {
    context.commit('REPLACE_MESSAGE_BY_SEQ', message);
  },

  ADD_MESSAGE: (context, message) => {
    context.commit('PUSH_MESSAGE', message);
  },

  SEND_MESSAGE: (context, { text } = {}) => {
    try {
      const { seq, draft } = context.state;
      const _text = (text || draft).trim();
      if (_text) {
        const message = { seq, message: { text: _text, type: 'text' } };
        state.messageClient.send(message);
        context.commit('INCREMENT_SEQ');
      }
      context.dispatch('SET_DRAFT', '');
    } catch (err) {
      throw err;
    }
  },

  SEND_FILE: (context, file) => {
  },

  SET_DRAFT: (context, draft) => {
    context.commit('SET_DRAFT', draft);
  },

  SET_CONNECTION_STATUS: (context, status) => {
    context.commit('SET_CONNECTION_STATUS', status);
  },

  LISTEN_ON_MESSAGE: (context, callback) => {
    context.commit('ADD_LISTENER', { event: MessageType.TEXT, callback });
    context.commit('ADD_LISTENER', { event: MessageType.FILE, callback });
    context.commit('ADD_LISTENER', { event: MessageType.CONTACT, callback });
    context.commit('ADD_LISTENER', { event: MessageType.JOINED, callback });
    context.commit('ADD_LISTENER', { event: MessageType.LEFT, callback });
    context.commit('ADD_LISTENER', { event: MessageType.CLOSED, callback });
  },
};

const mutations = {
  SET_MESSAGE_CLIENT: (state, messageClient) => {
    state.messageClient = messageClient;
  },
  SET_MESSAGES: (state, messages) => {
    state.messages = messages;
  },
  SET_USER: (state, user) => {
    state.user = user;
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
  SET_CONNECTION_STATUS: (state, status) => {
    state.isConnectionClosed = status;
  },
  ADD_LISTENER: (state, { event, callback }) => {
    state._listeners[event].push(callback);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
