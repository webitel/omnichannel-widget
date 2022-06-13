import { objSnakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import axios from 'axios';
import i18n from '../../../app/locale/i18n';
import ChatAPI from '../api/chat';
import MessageType from '../enums/MessageType.enum';
import bToMb from '../scripts/bToMb';
import parseMessage from '../scripts/parseMessage';

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
  IS_MY_MESSAGE: (state) => (message) => message.from?.contact
    === state.user?.contact,
};

const actions = {
  SUBSCRIBE_TO_MESSAGES: (context, { messageClient }) => {
    messageClient.addEventListener('message', (msg) => context.dispatch('ON_MESSAGE', msg));
    context.commit('SET_MESSAGE_CLIENT', messageClient);

    context.commit('ADD_LISTENER', {
      event: [MessageType.INIT],
      callback: (data) => context.dispatch('ON_SESSION_INFO_MESSAGE', data),
    });

    context.commit('ADD_LISTENER', {
      event: [MessageType.TEXT, MessageType.FILE, MessageType.CONTACT, MessageType.CLOSED],
      callback: (data) => {
        if (context.getters.IS_MY_MESSAGE(data)) {
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

  // process chat session data, received as 1st msg
  ON_SESSION_INFO_MESSAGE: (context, message) => {
    const {
      user,
      msgs,
      mediaMaxSize = 0,
    } = message;
    context.commit('SET_USER', user);
    context.commit('SET_MEDIA_MAX_SIZE', mediaMaxSize);
    if (msgs) {
      context.commit('SET_MESSAGES', msgs);
    }
  },

  ON_MESSAGE: async (context, _message) => {
    const {
      message,
      seq,
    } = parseMessage(objSnakeToCamel(_message.data));
    if (seq) {
      await context.dispatch('REPLACE_MESSAGE', {
        message,
        seq,
      });
    } else {
      await context.dispatch('ADD_MESSAGE', message);
    }

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

  SEND_MENU: (context, { code }) => {
    const message = {
      text: code,
      type: MessageType.TEXT,
    };
    return context.dispatch('SEND_MESSAGE', { message });
  },

  SEND_DRAFT: async (context) => {
    const text = context.state.draft.trim();
    if (!text) return; // DO NOT send empty message
    try {
      const message = {
        text,
        type: MessageType.TEXT,
      };
      await context.dispatch('SEND_MESSAGE', { message });
      await context.dispatch('SET_DRAFT', '');
    } catch (err) {
      throw err;
    }
  },

  SEND_MESSAGE: (context, message) => {
    try {
      context.state.messageClient.send(message);
    } catch (err) {
      throw err;
    }
  },

  SEND_FILES: async (context, files) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const { seq } = context.state;
      context.commit('INCREMENT_SEQ');

      try {
        console.info(file.size, context.state.mediaMaxSize);
        if (file.size > context.state.mediaMaxSize) {
          throw new RangeError(i18n.t('errors.fileTooLarge', {
            file: file.name,
            maxSize: bToMb(context.state.mediaMaxSize),
          }));
        }
        // eslint-disable-next-line no-await-in-loop
        const messageMock = await context.dispatch('_GET_FILE_PREVIEW', {
          file,
          seq,
        });
        context.dispatch('ADD_MESSAGE', messageMock);

        // eslint-disable-next-line no-await-in-loop
        await context.dispatch('_UPLOAD_FILE', {
          file,
          seq,
          messageMock,
        });
      } catch (err) {
        const message = {
          type: MessageType.ERROR,
          error: {
            text: err.response?.data?.detail || err.message,
          },
        };
        context.dispatch('ADD_MESSAGE', message);
      }
    }
  },

  _GET_FILE_PREVIEW: (context, {
    file,
    seq,
  }) => {
    const message = {
      type: MessageType.FILE,
      file: {
        url: file.url, // prop, set by file-upload-preview-popup
        mime: file.type,
        name: file.name,
        size: file.size,
        uploadProgress: 0,
      },
      from: context.state.user,
      seq,
    };

    return message;
  },

  _UPLOAD_FILE: async (context, {
    file,
    seq,
    messageMock,
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

    const message = {
      message: {
        type: MessageType.FILE,
        file: fileLink,
      },
      seq,
    };

    return context.dispatch('SEND_MESSAGE', message);
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
