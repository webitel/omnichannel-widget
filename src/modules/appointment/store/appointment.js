import AppointmentAPI from '../api/appointment';

const state = {
  appointmentState: {},
};

const getters = {};

const actions = {
  LOAD_APPOINTMENT_DATA: async (context) => {
    const { url } = context.rootState.config.appointment;
    const appointmentState = await AppointmentAPI.getAppointment(url);
    return context.commit('SET_APPOINTMENT_STATE', appointmentState);
  },
  SCHEDULE_APPOINTMENT: (context, scheduleInfo) => {},
  REMOVE_APPOINTMENT: () => {},
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
