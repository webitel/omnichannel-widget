<template>
  <appointment-list
    v-if="state === AppointmentState.LIST"
    :namespace="namespace"
  ></appointment-list>
  <appointment-success
    v-else
    :namespace="namespace"
  ></appointment-success>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import AppointmentList from './list/wt-omni-widget-appointment-list.vue';
import AppointmentSuccess from './success/wt-omni-widget-appointment-success.vue';
import AppointmentState from '../enum/AppointmentState.enum';

export default {
  name: 'wt-omni-widget-appointment',
  components: {
    AppointmentList,
    AppointmentSuccess,
  },

  data: () => ({
    namespace: 'appointment',
    AppointmentState,
  }),
  computed: {
    ...mapState({
      state(state) {
        return getNamespacedState(state, this.namespace).appointmentState.type;
      },
    }),
  },
  methods: {
    ...mapActions('appointment', {
      loadAppointmentData: 'LOAD_APPOINTMENT_DATA',
    }),
  },
  created() {
    this.loadAppointmentData();
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  // code goes here
}
</style>
