import AppointmentAPI from '../api/appointment';

const mockAppointmentState = {
  list: [
    {
      date: '2022-11-30',
      times: [
        {
          time: '12:00',
          reserved: false,
        },
        {
          time: '12:30',
          reserved: true,
        },
        {
          time: '13:00',
          reserved: false,
        },
        {
          time: '13:30',
          reserved: true,
        },
        {
          time: '14:00',
          reserved: false,
        },
        {
          time: '14:30',
          reserved: false,
        },
        {
          time: '15:00',
          reserved: true,
        },
        {
          time: '15:30',
          reserved: true,
        },
        {
          time: '16:00',
          reserved: false,
        },
        {
          time: '16:30',
          reserved: true,
        },
        {
          time: '17:00',
          reserved: true,
        },
      ],
    },
    {
      date: '2022-12-01',
      times: [
        {
          time: '12:00',
          reserved: false,
        },
        {
          time: '12:30',
          reserved: false,
        },
        {
          time: '13:00',
          reserved: false,
        },
        {
          time: '13:30',
          reserved: true,
        },
        {
          time: '14:00',
          reserved: true,
        },
        {
          time: '14:30',
          reserved: true,
        },
        {
          time: '15:00',
          reserved: true,
        },
        {
          time: '15:30',
          reserved: false,
        },
        {
          time: '16:00',
          reserved: false,
        },
        {
          time: '16:30',
          reserved: false,
        },
        {
          time: '17:00',
          reserved: false,
        },
      ],
    },
    {
      date: '2022-12-02',
      times: [
        {
          time: '12:00',
          reserved: true,
        },
        {
          time: '12:30',
          reserved: true,
        },
        {
          time: '13:00',
          reserved: true,
        },
        {
          time: '13:30',
          reserved: false,
        },
        {
          time: '14:00',
          reserved: false,
        },
        {
          time: '14:30',
          reserved: true,
        },
        {
          time: '15:00',
          reserved: false,
        },
        {
          time: '15:30',
          reserved: true,
        },
        {
          time: '16:00',
          reserved: true,
        },
        {
          time: '16:30',
          reserved: true,
        },
        {
          time: '17:00',
          reserved: true,
        },
      ],
    },
  ],
  timezone: 'Europe/Kiev',
  type: 'list',
};

const state = {
  appointmentState: {},
};

const getters = {
  APPOINTMENT_URL: (s, g, rootState) => rootState.config.appointment.url,
};

const actions = {
  LOAD_APPOINTMENT_DATA: async (context) => {
    // const appointmentState = await AppointmentAPI.getAppointment(context.getters.APPOINTMENT_URL);
    return context.commit('SET_APPOINTMENT_STATE', mockAppointmentState);
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

    // const appointmentState = await AppointmentAPI.postAppointment(context.getters.APPOINTMENT_URL, _scheduleInfo);
    return context.commit('SET_APPOINTMENT_STATE', mockAppointmentState);
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
  SET_APPOINTMENT_STATE: (state) => {
    state.appointmentState = mockAppointmentState;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
