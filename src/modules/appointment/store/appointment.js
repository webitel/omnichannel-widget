import AppointmentAPI from '../api/appointment';

const state = {
  appointmentState: {},
};

const getters = {
  APPOINTMENT_URL: (s, g, rootState) => rootState.config.appointment.url,
};

const actions = {
  LOAD_APPOINTMENT_DATA: async (context) => {
    const appointmentState = await AppointmentAPI.getAppointment(context.getters.APPOINTMENT_URL);
    return context.commit('SET_APPOINTMENT_STATE', appointmentState);
  },
  SCHEDULE_APPOINTMENT: async (context, scheduleInfo) => {
    const _scheduleInfo = {
      scheduleDate: scheduleInfo.scheduleDate,
      scheduleTime: scheduleInfo.scheduleTime,
      name: scheduleInfo.name,
      destination: scheduleInfo.destination,
      variables: {},
    };
    if (scheduleInfo.email) _scheduleInfo.variables.email = scheduleInfo.email;
    if (scheduleInfo.message) _scheduleInfo.variables.message = scheduleInfo.message;

    const appointmentState = await AppointmentAPI.postAppointment(context.getters.APPOINTMENT_URL, _scheduleInfo);
    return context.commit('SET_APPOINTMENT_STATE', appointmentState);
  },
  REMOVE_APPOINTMENT: async (context) => {
    try {
      await AppointmentAPI.deleteAppointment(context.getters.APPOINTMENT_URL);
    } finally {
      await context.dispatch('LOAD_APPOINTMENT_DATA');
    }
  },
};

const mutations = {
  SET_APPOINTMENT_STATE: (state, appointmentState) => {
    state.appointmentState = appointmentState;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
