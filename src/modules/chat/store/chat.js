import axios from 'axios';
import { objSnakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import i18n from '../../../app/locale/i18n';
import ChatAPI from '../api/chat';
import Message from '../classes/Message.class';
import MessageType from '../enums/MessageType.enum';
import bToMb from '../scripts/bToMb';

const triggerListeners = ({
                            listeners = [],
                            payload,
                          }) => Promise.all(listeners.map((callback) => callback(payload)));

const state = {
  messageClient: null,
  draft: '',
  messages: [],
  user: {},
  mediaMaxSize: 0,
  seq: 1,
  sendTimeout: 5,
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
  // check seq cause if no session message => no user => getter is always falsy
  IS_MY_MESSAGE: (state) => (message) => (
    !!message.seq
    || message.from?.contact === state.user?.contact
  ),
  SHOW_BUTTONS: (state, getters) => (message) => {
    const findLastIndexOf = (arr) => (callback) => {
      let index = arr.length;
      while (index--) {
        if (callback(arr[index], index, arr)) return index;
      }
      return -1;
    };
    return state.messages.indexOf(message) > findLastIndexOf(state.messages)((msg) => getters.IS_MY_MESSAGE(msg));
  },
};

const actions = {
  SUBSCRIBE_TO_MESSAGES: (context, { messageClient }) => {
    messageClient.addEventListener('message', (msg) => context.dispatch('ON_WEBSOCKET_MESSAGE', msg));
    messageClient.addEventListener('error', (msg) => context.dispatch('ON_WEBSOCKET_ERROR', msg));
    messageClient.addEventListener('info', (msg) => context.dispatch('ON_WEBSOCKET_INFO', msg));

    context.commit('SET_MESSAGE_CLIENT', messageClient);

    context.commit('ADD_LISTENER', {
      event: [
        MessageType.TEXT,
        MessageType.FILE,
        MessageType.CONTACT,
        MessageType.CLOSED,
      ],
      callback: (data) => {
        if (!context.getters.IS_MY_MESSAGE(data)) {
          return context.dispatch('notifications/HANDLE_CHAT_MESSAGE', null, { root: true });
        }
        return null;
      },
    });

    context.commit('ADD_LISTENER', {
      event: [MessageType.CLOSED],
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

  ON_WEBSOCKET_ERROR: async (context, { data: text }) => {
    const message = new Message({
      type: MessageType.ERROR,
      error: { text },
    });
    await context.dispatch('ADD_MESSAGE', message);
    await context.dispatch('TRIGGER_LISTENERS', message);
  },

  ON_WEBSOCKET_INFO: async (context, { data }) => {
    if (data.code !== 1006) return;
    const message = new Message({ type: MessageType.CLOSED });
    await context.dispatch('ADD_MESSAGE', message);
    await context.dispatch('TRIGGER_LISTENERS', message);
  },

  ON_WEBSOCKET_MESSAGE: (context, msg) => (
    !msg.data.type && !msg.data.message
      ? context.dispatch('ON_SESSION_INFO_MESSAGE', objSnakeToCamel(msg.data))
      : context.dispatch('ON_MESSAGE', objSnakeToCamel(msg.data))
  ),

  // process chat session data, received as 1st msg
  ON_SESSION_INFO_MESSAGE: (context, message) => {
    const {
      user,
      msgs,
      mediaMaxSize = 0,
      sendTimeout = 5,
    } = message;
    context.commit('SET_USER', user);
    context.commit('SET_MEDIA_MAX_SIZE', mediaMaxSize);
    context.commit('SET_SEND_TIMEOUT', sendTimeout);
    if (msgs) {
      const messages = msgs.map((msg) => new Message(msg));
      context.commit('SET_MESSAGES', messages);
    }
  },

  ON_MESSAGE: async (context, { error, message: msg = error, seq }) => {
    const message = new Message(msg);
    if (seq) {
      await context.dispatch('REPLACE_MESSAGE', { message, seq });
    } else {
      await context.dispatch('ADD_MESSAGE', message);
    }
    await context.dispatch('TRIGGER_LISTENERS', message);
  },

  TRIGGER_LISTENERS: async (context, message) => {
    const listeners = context.state._listeners[message.type];
    if (listeners && listeners.length) {
      await triggerListeners({
        listeners,
        payload: message,
      });
    } else {
      console.warn(`No listeners for ${message.type} event`);
    }
  },

  REPLACE_MESSAGE: (context, {
    message,
    seq,
  }) => {
    context.commit('REPLACE_MESSAGE_BY_SEQ', {
      message,
      seq,
    });
  },

  REMOVE_MESSAGE_BY_SEQ: (context, seq) => {
    context.commit('REMOVE_MESSAGE_BY_SEQ', seq);
  },

  ADD_MESSAGE: (context, message) => {
    context.commit('PUSH_MESSAGE', message);
  },

  GENERATE_USER_MESSAGE: (context, content) => {
    const { seq } = context.state;
    context.commit('INCREMENT_SEQ');

    return new Message({
      ...content,
      seq,
    });
  },

  SEND_MENU: async (context, { code }) => {
    const message = await context.dispatch('GENERATE_USER_MESSAGE', {
      text: code,
      type: MessageType.TEXT,
    });
    await context.dispatch('ADD_MESSAGE', message);
    return context.dispatch('SEND_MESSAGE', { seq: message.seq, message });
  },

  SEND_DRAFT: async (context) => {
    const text = context.state.draft.trim();
    if (!text) return; // DO NOT send empty message

    try {
      const message = await context.dispatch('GENERATE_USER_MESSAGE', {
        text,
        type: MessageType.TEXT,
      });
      await context.dispatch('ADD_MESSAGE', message);
      await context.dispatch('SEND_MESSAGE', { seq: message.seq, message });
      await context.dispatch('SET_DRAFT', '');
    } catch (err) {
      throw err;
    }
  },

  SEND_FILES: async (context, files) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      try {
        if (file.size > context.state.mediaMaxSize) {
          throw new RangeError(i18n.t('errors.fileTooLarge', {
            file: file.name,
            maxSize: bToMb(context.state.mediaMaxSize),
          }));
        }
        // eslint-disable-next-line no-await-in-loop
        const messageMock = await context.dispatch('GENERATE_USER_MESSAGE', {
          type: MessageType.FILE,
          file: {
            url: file.url, // prop, set by file-upload-preview-popup
            mime: file.type,
            name: file.name,
            size: file.size,
            uploadProgress: 0,
          },
        });
        context.dispatch('ADD_MESSAGE', messageMock);

        // eslint-disable-next-line no-await-in-loop
        await context.dispatch('_UPLOAD_FILE', {
          file,
          messageMock,
        });
      } catch (err) {
        const message = new Message({
          type: MessageType.ERROR,
          error: {
            text: err.response?.data?.detail || err.message,
          },
        });
        context.dispatch('ADD_MESSAGE', message);
      }
    }
  },

  _UPLOAD_FILE: async (context, {
    file,
    messageMock,
    seq = messageMock.seq,
  }) => {
    const cancelToken = axios.CancelToken.source();
    // eslint-disable-next-line no-param-reassign
    messageMock.file.cancelUpload = () => {
      cancelToken.cancel();
      context.dispatch('REMOVE_MESSAGE_BY_SEQ', seq);
    };

    const onUploadProgress = ({
                                total,
                                loaded,
                              }) => {
      const progress = Math.round((loaded / total) * 100); // calc 100%
      // eslint-disable-next-line no-param-reassign
      messageMock.file.uploadProgress = progress;
    };

    const [fileLink] = await ChatAPI.sendFile({
      uri: context.rootState.config.wsUrl,
      file,
      onUploadProgress,
      cancelToken,
    });

    const message = new Message({
      type: MessageType.FILE,
      file: fileLink,
      seq,
    });
    return context.dispatch('SEND_MESSAGE', { message, seq: message.seq });
  },

  SEND_MESSAGE: (context, { message, seq }) => {
    try {
      context.state.messageClient.send({ message, seq });
      message.setSendingTimeout(context.state.sendTimeout);
    } catch (err) {
      throw err;
    }
  },

  SET_DRAFT: (context, draft) => {
    context.commit('SET_DRAFT', draft);
  },

  SET_CONNECTION_STATUS: (context, status) => {
    context.commit('SET_CONNECTION_STATUS', status);
  },

  LISTEN_ON_MESSAGE: (context, callback) => {
    context.commit('ADD_LISTENER', {
      event: [
        MessageType.TEXT,
        MessageType.FILE,
        MessageType.CONTACT,
        MessageType.JOINED,
        MessageType.LEFT,
        MessageType.CLOSED,
      ],
      callback,
    });
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
  SET_MEDIA_MAX_SIZE: (state, mediaMaxSize) => {
    state.mediaMaxSize = mediaMaxSize;
  },
  SET_SEND_TIMEOUT: (state, sendTimeout) => {
    state.sendTimeout = sendTimeout;
  },
  SET_DRAFT: (state, draft) => {
    state.draft = draft;
  },
  REPLACE_MESSAGE_BY_SEQ: (state, {
    message,
    seq,
  }) => {
    const msgIndex = state.messages.findIndex((msg) => msg.seq === seq);
    if (msgIndex !== -1) state.messages.splice(msgIndex, 1, message);
  },
  REMOVE_MESSAGE_BY_SEQ: (state, seq) => {
    const msgIndex = state.messages.findIndex((msg) => msg.seq === seq);
    state.messages.splice(msgIndex, 1);
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
  ADD_LISTENER: (state, {
    event,
    callback,
  }) => {
    event.forEach((e) => {
      state._listeners[e].push(callback);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
