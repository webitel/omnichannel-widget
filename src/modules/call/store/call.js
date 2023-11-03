import JsSIP from 'jssip';
import ReactiveNowStoreModule
  from '../../../app/webitel-ui/store/ReactiveNowStoreModule/ReactiveNowStoreModule';
import SessionState from '../enums/SessionState.enum';

const state = {
  // incapsulated
  userAgent: null,
  session: null,
  sessionAudio: null,

  // exposed to ui
  sessionState: SessionState.IDLE,
  sessionMute: false,
  sessionDTMF: '',
};

const getters = {
  SESSION_DURATION: (state) => {
    if (!state.session) return null;
    const { start_time: startTime } = state.session;
    if (!startTime) return null;
    const duration = state.now.now - new Date(startTime).getTime();
    return duration < 0 ? 0 : duration;
  },
  SESSION_HOLD: (state) => state.sessionState === SessionState.HOLD,
};

const actions = {
  START_USER_AGENT: (context) => {
    const socket = new JsSIP.WebSocketInterface(context.rootState.config.call.url);
    JsSIP.debug.enable('JsSIP:*');

    const { hostname } = new URL(context.rootState.config.call.url);

    const configuration = {
      sockets: [socket],
      uri: `sip:${context.rootState.config.call.id}@${hostname}`,
      register: false,
    };
    const userAgent = new JsSIP.UA(configuration);

    userAgent.start();

    context.commit('SET_USER_AGENT', userAgent);

    window.addEventListener('beforeunload', async (event) => {
      await context.dispatch('CLOSE_USER_AGENT');
      // eslint-disable-next-line no-param-reassign
      delete event.returnValue; // page will always reload
    });
  },
  CLOSE_USER_AGENT: (context) => {
    context.state.userAgent.stop();
    context.commit('SET_USER_AGENT', null);
  },
  MAKE_CALL: async (context, { initWithMuted }) => {
    await context.dispatch('now/SET_NOW_WATCHER');

    const initAudio = () => {
      const audio = new Audio();
      audio.autoplay = true;
      // eslint-disable-next-line prefer-destructuring
      const stream = new MediaStream();
      stream.addTrack(context.state.session.connection.getReceivers()[0].track);
      audio.srcObject = stream;
      context.commit('SET_SESSION_AUDIO', audio);
      if (initWithMuted) context.dispatch('TOGGLE_MUTE', true);
    };

    const closeSession = () => {
      // https://stackoverflow.com/questions/8864617/how-do-i-remove-properly-html5-audio-without-appending-to-dom
      // eslint-disable-next-line no-param-reassign
      if (context.state.sessionAudio) context.state.sessionAudio.srcObject = null;
      context.commit('SET_SESSION_STATE', SessionState.IDLE);
      context.commit('SET_SESSION_AUDIO', null);
      context.commit('SET_SESSION_MUTE', false);
      context.commit('SET_SESSION_DTMF', '');
      context.commit('SET_SESSION', null);
      context.dispatch('CLOSE_USER_AGENT');
      context.dispatch('now/SET_NOW_WATCHER');
    };

    const eventHandlers = {
      progress() { // ringing
        context.commit('SET_SESSION_STATE', SessionState.RINGING);
        initAudio();
      },
      // 200 OK
      confirmed: () => {
        context.commit('SET_SESSION_STATE', SessionState.ACTIVE);
        if (!context.state.sessionAudio) initAudio();
      },
      hold: () => context.commit('SET_SESSION_STATE', SessionState.HOLD),
      unhold: () => context.commit('SET_SESSION_STATE', SessionState.ACTIVE),
      muted: () => context.commit('SET_SESSION_MUTE', true),
      unmuted: () => context.commit('SET_SESSION_MUTE', false),
      newDTMF: ({ originator, dtmf }) => originator === 'local' &&
        context.commit('NEW_SESSION_DTMF', dtmf.tone),
      // bug
      failed: (event) => {
        console.error('call failed with cause', event);
        closeSession();
      },
      // bye
      ended: () => closeSession(),
    };

    await context.dispatch('START_USER_AGENT');

    const options = {
      eventHandlers,
      mediaConstraints: { audio: true },
      sessionTimersExpires: 300,
    };
    const session = context.state.userAgent.call('sip:call-from-web@dev.webitel.com', options);
    window.session = session;
    context.commit('SET_SESSION', session);
  },
  HANGUP: (context) => {
    context.state.session.terminate();
  },
  TOGGLE_HOLD: (context) => {
    const { session } = context.state;
    if (session.isOnHold().local) {
      session.unhold();
    } else {
      session.hold();
    }
  },
  TOGGLE_MUTE: (context, value) => {
    const { session } = context.state;
    // checking typeof because toggle button can send event
    if (value !== undefined && typeof value === 'boolean') {
      if (value) return session.mute();
      return session.unmute();
    }
    if (session.isMuted().audio) {
      return session.unmute();
    }
    return session.mute();
  },
  SEND_DTMF: (context, digit) => {
    const { session } = context.state;
    session.sendDTMF(digit);
  },
};

const mutations = {
  SET_USER_AGENT: (state, userAgent) => {
    state.userAgent = userAgent;
  },
  SET_SESSION: (state, session) => {
    state.session = session;
  },
  SET_SESSION_STATE: (state, sessionState) => {
    state.sessionState = sessionState;
  },
  SET_SESSION_AUDIO: (state, sessionAudio) => {
    state.sessionAudio = sessionAudio;
  },
  SET_SESSION_MUTE: (state, sessionMute) => {
    state.sessionMute = sessionMute;
  },
  NEW_SESSION_DTMF: (state, sessionDTMF) => {
    state.sessionDTMF += sessionDTMF;
  },
  SET_SESSION_DTMF: (state, sessionDTMF) => {
    state.sessionDTMF = sessionDTMF;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    now: new ReactiveNowStoreModule().getModule(),
  },
};
