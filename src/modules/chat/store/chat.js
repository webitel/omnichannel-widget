import { objSnakeToCamel } from '../../../app/webitel-ui/scripts/caseConverters';
import MessageType from '../enums/MessageType.enum';

const parseMessage = (_message) => {
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

const ChatEvent = Object.freeze({
  MESSAGE: 'message',
});

const triggerListeners = ({ listeners, event }) => Promise.all(listeners[event].map((callback) => callback()));

const state = {
  messageClient: null,
  draft: '',
  messages: [],
  user: {},
  seq: 1,
  _listeners: {
    [ChatEvent.MESSAGE]: [],
  },
};

const getters = {
  IS_MY_MESSAGE: (state) => (message) => message.from?.contact === state.user?.contact,
};

const actions = {
  SUBSCRIBE_TO_MESSAGES: (context, { messageClient }) => {
    const msgHandler = (context) => (msg) => {
      context.dispatch('ON_SESSION_INFO_MESSAGE', msg);
      messageClient.removeEventListener('message', this);
      messageClient.addEventListener('message', (msg) => context.dispatch('ON_MESSAGE', msg));
    };
    messageClient.addEventListener('message', msgHandler(context));
    context.commit('SET_MESSAGE_CLIENT', messageClient);
  },

  // process chat session data, received as 1st msg
  ON_SESSION_INFO_MESSAGE: (context, data) => {
    console.warn('here hoes session data!', data);
    const { user, msgs } = data.data;
    context.commit('SET_USER', user);
    if (msgs) {
      context.commit('SET_MESSAGES', msgs);
    }
  },

  ON_MESSAGE: async (context, _message) => {
    const message = parseMessage(_message.data);
    if (message.seq) await context.dispatch('REPLACE_MESSAGE', message);
    else await context.dispatch('ADD_MESSAGE', message);
    await triggerListeners({ event: ChatEvent.MESSAGE, listeners: state._listeners });
  },

  REPLACE_MESSAGE: (context, message) => {
    context.commit('REPLACE_MESSAGE_BY_SEQ', message);
  },

  ADD_MESSAGE: (context, message) => {
    context.commit('PUSH_MESSAGE', message);
  },

  SEND_MESSAGE: (context) => {
    const { draft, seq } = context.state;
    if (!draft) return;
    const message = { seq, message: { text: draft, type: 'text' } };
    state.messageClient.send(message);
    context.commit('INCREMENT_SEQ');
    context.dispatch('SET_DRAFT', '');
  },

  SEND_FILE: (context, file) => {
    console.info('send file action called with', file);
  },

  SET_DRAFT: (context, draft) => {
    context.commit('SET_DRAFT', draft);
  },

  LISTEN_ON_MESSAGE: (context, callback) => {
    context.commit('ADD_LISTENER', { event: ChatEvent.MESSAGE, callback });
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
