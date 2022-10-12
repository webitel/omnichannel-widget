<template>
 <section>
   <appointment-form
    v-model="draft"
   ></appointment-form>
   <appointment-calendar
    v-model="draft"
    :calendar="state.list"
   ></appointment-calendar>
   <div>
     <wt-button @click="send">Send</wt-button>
   </div>
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
  // code goes here
}
</style>