import AppointmentAPI from '../api/appointment';

const generateAppointmentSchema = ({
  showEmailField,
  showMessageField,
}) => {
  const appointment = {
      scheduleDate: '', // required
      scheduleTime: '', // required
      name: '', // required
     destination: '', // required
    };
  if (showEmailField) appointment.email = '';
  if (showMessageField) appointment.message = '';
  return appointment;
};

const state = {
  apointment: {},
  userAppointmentState: null,
  info: {},
};

const getters = {};

const actions = {
  LOAD_APPOINTMENT_DATA: async (context) => {
    const {
      url,
      showEmailField,
      showMessageField,
    } = context.rootState.config.appointment;
    const info = await AppointmentAPI.getAppointment(url);
    context.commit('SET_USER_APPOINTMENT_STATE', info.type);
    if (info.type === 'list') {
      context.commit('GENERATE_APPOINTMENT_SCHEMA', { showEmailField, showMessageField });
      return context.dispatch('HANDLE_APPOINTMENT_LIST', info);
    }
    return null;
  },
  HANDLE_APPOINTMENT_LIST: (context, {
    timezone, list,
  }) => {
    context.commit('SET_TIMEZONE', timezone);
    context.commit('SET_APPOINTMENT_LIST', list);
  },
  SCHEDULE_APPOINTMENT: () => {},
};

const mutations = {
  GENERATE_APPOINTMENT_SCHEMA: (state, { showEmailField, showMessageField }) => {
    state.appointment = generateAppointmentSchema({ showEmailField, showMessageField });
  },
  SET_USER_APPOINTMENT_STATE: (state, userAppointmentState) => {
    state.userAppointmentState = userAppointmentState;
  },
  SET_TIMEZONE: (state, timezone) => {
    state.timezone = timezone;
  },
  SET_APPOINTMENT_LIST: (state, list) => {
    state.list = list;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
