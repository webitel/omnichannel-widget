<template>
  <section class="wt-omni-widget-appointment-list">
    <div class="wt-omni-widget-appointment-list__wrap">
      <appointment-form
        v-model="draft"
      ></appointment-form>
      <appointment-calendar
        v-model="draft"
        :calendar="calendar"
      ></appointment-calendar>
    </div>
    <wt-button @click="send">{{ $t('reusable.send') }}</wt-button>
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import AppointmentForm from './form/wt-omni-widget-appointment-form.vue';
import AppointmentCalendar from './calendar/wt-omni-widget-appointment-calendar.vue';

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
export default {
  name: 'wt-omni-widget-appointment-list',
  components: {
    AppointmentForm,
    AppointmentCalendar,
  },
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    draft: {},
    calendar: [
      {
        date: '2022-10-20',
        times: [
          {
          reserved: true,
          time: '10:00',
          },
          {
            reserved: false,
            time: '11:00',
          },
          {
            reserved: true,
            time: '12:00',
          },
          {
            reserved: true,
            time: '13:00',
          },
          {
            reserved: false,
            time: '14:00',
          },
          {
            reserved: true,
            time: '15:00',
          },
          {
            reserved: true,
            time: '16:00',
          },
          {
            reserved: false,
            time: '17:00',
          },
          {
            reserved: true,
            time: '18:00',
          },
          {
            reserved: true,
            time: '19:00',
          },
          {
            reserved: false,
            time: '20:00',
          },
          {
            reserved: true,
            time: '21:00',
          },
        ],
      },
      {
        date: '2022-10-21',
        times: [
          {
            reserved: false,
            time: '10:00',
          },
          {
            reserved: false,
            time: '11:00',
          },
          {
            reserved: true,
            time: '12:00',
          },
          {
            reserved: true,
            time: '13:00',
          },
          {
            reserved: false,
            time: '14:00',
          },
          {
            reserved: true,
            time: '15:00',
          },
          {
            reserved: true,
            time: '16:00',
          },
          {
            reserved: true,
            time: '17:00',
          },
          {
            reserved: true,
            time: '18:00',
          },
          {
            reserved: false,
            time: '19:00',
          },
          {
            reserved: true,
            time: '20:00',
          },
          {
            reserved: false,
            time: '21:00',
          },
        ],
      },
      {
        date: '2022-10-22',
        times: [
          {
            reserved: false,
            time: '10:00',
          },
          {
            reserved: false,
            time: '11:00',
          },
          {
            reserved: true,
            time: '12:00',
          },
          {
            reserved: true,
            time: '13:00',
          },
          {
            reserved: false,
            time: '14:00',
          },
          {
            reserved: false,
            time: '15:00',
          },
          {
            reserved: false,
            time: '16:00',
          },
          {
            reserved: false,
            time: '17:00',
          },
          {
            reserved: true,
            time: '18:00',
          },
          {
            reserved: true,
            time: '19:00',
          },
          {
            reserved: false,
            time: '20:00',
          },
          {
            reserved: true,
            time: '21:00',
          },
        ],
      },
    ],
  }),
  computed: {
    ...mapState({
      state(state) {
        return getNamespacedState(state, this.namespace).appointmentState;
      },
    }),
  },
  methods: {
    ...mapActions({
      scheduleAppointment(dispatch, payload) {
        return dispatch(`${this.namespace}/SCHEDULE_APPOINTMENT`, payload);
      },
    }),
    send() {
      this.scheduleAppointment(this.draft);
    },
    initDraft() {
      console.log('initDraft:', this.config.appointment);
      this.draft = generateAppointmentSchema(this.config.appointment);
    },
  },
  created() {
    this.initDraft();
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-appointment-list {
    max-height: 100%;
    &__wrap {
      display: flex;
    }
    .wt-button {
      margin: var(--main-app-padding) auto;
      min-width: 168px;
      font-weight: 400;
    }
  }
}
</style>
