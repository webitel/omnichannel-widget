import AppointmentAPI from '../api/appointment';

const state = {
  appointmentState: {},
  error: {},
};

const getters = {
  APPOINTMENT_URL: (s, g, rootState) => rootState.config.appointment.url,
};

const actions = {
  LOAD_APPOINTMENT_DATA: async (context) => {
    let appointmentState;
    try {
      appointmentState = await AppointmentAPI.getAppointment(context.getters.APPOINTMENT_URL);
    } catch (err) {
      context.commit('SET_ERROR', err);
    }
    return context.commit('SET_APPOINTMENT_STATE', appointmentState);
  },
  SCHEDULE_APPOINTMENT: async (context, scheduleInfo) => {
    let appointmentState;
    try {
      const _scheduleInfo = {
        scheduleDate: scheduleInfo.scheduleDate,
        scheduleTime: scheduleInfo.scheduleTime,
        name: scheduleInfo.name,
        destination: scheduleInfo.destination,
        variables: {},
      };
      if (scheduleInfo.email) _scheduleInfo.variables.email = scheduleInfo.email;
      if (scheduleInfo.message) _scheduleInfo.variables.message = scheduleInfo.message;

      appointmentState = await AppointmentAPI.postAppointment(context.getters.APPOINTMENT_URL, _scheduleInfo);
      context.commit('SET_APPOINTMENT_STATE', appointmentState);
      if (state.error) context.commit('SET_ERROR', {});
    } catch (err) {
      context.commit('SET_ERROR', err);
    }
  },
  REMOVE_APPOINTMENT: async (context) => {
    try {
      await AppointmentAPI.deleteAppointment(context.getters.APPOINTMENT_URL);
    } catch (err) {
      context.commit('SET_ERROR', err);
    } finally {
      await context.dispatch('LOAD_APPOINTMENT_DATA');
    }
  },
};

const mutations = {
  SET_APPOINTMENT_STATE: (state, appointmentState) => {
    state.appointmentState = appointmentState;
  },
  SET_ERROR: (state, error) => {
    state.error = error;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
