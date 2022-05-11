import { objSnakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import MessageType from '../enums/MessageType.enum';
import ChatAPI from '../api/chat';

const parseMessage = ({
 message: msg, seq, type, ...rest
}) => {
  if (!msg && !type) return { message: { ...rest }, type: MessageType.INIT }; // 1st message of session without type - init
  const message = objSnakeToCamel(msg);
  switch (message.type) {
    case MessageType.TEXT:
    case MessageType.FILE:
    case MessageType.CONTACT:
    case MessageType.JOINED:
    case MessageType.LEFT:
    case MessageType.CLOSED:
    default:
      return { message, seq, type: message.type };
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
    const { message, seq, type } = parseMessage(_message.data);
    if (seq) await context.dispatch('REPLACE_MESSAGE', { message, seq });
    else await context.dispatch('ADD_MESSAGE', message);
    await triggerListeners({
      event: type,
      listeners: state._listeners,
      payload: message,
    });
  },

  REPLACE_MESSAGE: (context, { message, seq }) => {
    context.commit('REPLACE_MESSAGE_BY_SEQ', { message, seq });
  },

  ADD_MESSAGE: (context, message) => {
    context.commit('PUSH_MESSAGE', message);
  },

  SEND_MENU: (context, { code }) => {
    const message = { text: code, type: MessageType.TEXT };
    return context.dispatch('SEND_MESSAGE', { message });
  },

  SEND_DRAFT: async (context) => {
    const text = context.state.draft.trim();
    if (!text) return; // DO NOT send empty message
    try {
      const message = { text, type: MessageType.TEXT };
      await context.dispatch('SEND_MESSAGE', { message });
      await context.dispatch('SET_DRAFT', '');
    } catch (err) {
      throw err;
    }
  },

  SEND_MESSAGE: (context, message) => {
    try {
      state.messageClient.send(message);
    } catch (err) {
      throw err;
    }
  },

  SEND_FILE: async (context, files) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const { seq } = context.state;
      context.commit('INCREMENT_SEQ');

      // eslint-disable-next-line no-await-in-loop
      const onUploadProgress = await context.dispatch('_ADD_FILE_PREVIEW', { file, seq });
      context.dispatch('_UPLOAD_FILE', { file, seq, onUploadProgress });
    }
  },

  _ADD_FILE_PREVIEW: (context, { file, seq }) => {
    const message = {
      type: MessageType.FILE,
      file: {
        mime: file.type,
        name: file.name,
        size: file.size,
        uploadProgress: 0,
      },
      from: context.state.user,
      seq,
    };

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      message.file.url = event.target.result;
      context.dispatch('ADD_MESSAGE', message);
    };
    fileReader.readAsDataURL(file);

    const onUploadProgress = ({ total, loaded }) => {
      console.log('progress', { total, loaded });
      message.file.uploadProgress = Math.round(loaded / (total * 1.2)) * 100; // calc 100%
    };

    return onUploadProgress;
  },

  _UPLOAD_FILE: async (context, { file, seq, onUploadProgress }) => {
    const [fileLink] = await ChatAPI.sendFile({
      uri: context.rootState.config.wsUrl,
      file,
      onUploadProgress,
    });

    return context.dispatch('SEND_MESSAGE', {
      message: {
        type: MessageType.FILE,
        file: fileLink,
      },
      seq,
    });
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
  REPLACE_MESSAGE_BY_SEQ: (state, { message, seq }) => {
    const msgIndex = state.messages.findIndex((msg) => msg.seq === seq);
    state.messages.splice(msgIndex, 1, message);
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
