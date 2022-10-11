<template>
  <section>
    {{ state }}
    <wt-button
      @click="removeAppointment"
    >Cancel</wt-button>
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'wt-omni-widget-appointment-success',
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      state(state) {
        return getNamespacedState(state, this.namespace).appointmentState;
      },
    }),
  },
  methods: {
    ...mapActions({
      removeAppointment(dispatch, payload) {
        return dispatch(`${this.namespace}/REMOVE_APPOINTMENT`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  // code goes here
}
</style>
