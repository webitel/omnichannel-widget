<template>
  <wt-omni-widget-appointment-list
    v-if=""
  ></wt-omni-widget-appointment-list>
</template>

<script>
import { mapState } from 'vuex';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import WtOmniWidgetAppointmentList from './wt-omni-widget-appointment-list.vue';

export default {
  name: 'wt-omni-widget-appointment',
  components: {},

  data: () => ({
    namespace: 'appointment',
  }),
  computed: {
    ...mapState({
      state(state) {
        return getNamespacedState(state, this.namespace).userAppointmentState;
      },
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
