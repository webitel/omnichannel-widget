<template>
  <section class="wt-omni-widget-appointment-list">
    <div class="wt-omni-widget-appointment-list__wrap">
      <appointment-form
        v-model="draft"
        :v="$v"
      ></appointment-form>
      <appointment-calendar
        v-model="draft"
        :calendar="state.list"
        :locale="$i18n.locale"
        :time-zone="state.timezone"
      ></appointment-calendar>
    </div>
    <wt-button
      :disabled="disableSend"
      @click="send"
    >{{ $t('reusable.send') }}
    </wt-button>
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { isValidPhoneNumber } from 'libphonenumber-js';
import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapState } from 'vuex';
import AppointmentCalendar from './calendar/wt-omni-widget-appointment-calendar.vue';
import AppointmentForm from './form/wt-omni-widget-appointment-form.vue';

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
#wt-omni-widget {
  .wt-omni-widget-appointment-list {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: var(--gap-md);

    &__wrap {
      display: flex;
      overflow: auto; // prevent scroll bugs on small height
      min-height: 0;
      gap: var(--gap-md);
      height: 100%;

      @media (max-width: $breakpoint-xs) {
        overflow: auto;
        flex-direction: column;
      }
    }

    .wt-button {
      min-width: 168px;
      margin: 0 auto;

      @media (max-width: $breakpoint-xs) {
        width: 100%;
      }
    }
  }
}
</style>
