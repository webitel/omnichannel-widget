<template>
  <section class="wt-omni-widget-appointment-list">
    <div class="wt-omni-widget-appointment-list__wrap">
      <appointment-form
        v-model="draft"
        :v="$v"
      ></appointment-form>
      <appointment-calendar
        v-model="draft"
        :calendar="calendar"
        :time-zone="state.timezone"
        :locates="config.view.lang"
      ></appointment-calendar>
    </div>
    <wt-button
      :disabled="disableSend"
      @click="send"
    >{{ $t('reusable.send') }}</wt-button>
  </section>
</template>

<script>
import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import { isValidPhoneNumber } from 'libphonenumber-js';
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
export default Vue.extend({
  name: 'wt-omni-widget-appointment-list',
  mixins: [validationMixin],
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
  validations: {
    draft: {
      scheduleDate: { required }, // required
      scheduleTime: { required }, // required
      name: { required }, // required
      destination: {
        required,
        phone: (value) => isValidPhoneNumber(value),
      }, // required
    },
  },
  computed: {
    ...mapState({
      state(state) {
        return getNamespacedState(state, this.namespace).appointmentState;
      },
    }),
    disableSend() {
      this.$v.$touch();
      return this.$v.$error;
    },
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
      this.draft = generateAppointmentSchema(this.config.appointment);
    },
  },
  created() {
    this.initDraft();
  },
});
</script>

<style lang="scss" scoped>
$send-button-weight: 52px;
#wt-omni-widget {
  .wt-omni-widget-appointment-list {
    max-height: 100%;
    height: 100%;
    @media (max-width: $breakpoint-xxs) {
      max-height: none;
      height: auto;
    }
    &__wrap {
      display: flex;
      max-height: calc(100% - $send-button-weight);
      gap: var(--gap-md);
    }
    .wt-button {
      margin: var(--gap-md) auto 0;
      min-width: 168px;
    }
  }
  @media (max-width: $breakpoint-xxs) {
    .wt-omni-widget-appointment-list {
      &__wrap {
        flex-direction: column;
      }
      .wt-button {
        width: 100%;
        margin-top: 8px;
      }
    }
  }
}
</style>
