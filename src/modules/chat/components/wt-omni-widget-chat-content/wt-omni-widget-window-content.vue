<template>
  <article class="wt-omni-widget-window-content">
    <div
      v-for="{ id, data } of messages"
      :key="id"
    >{{ data.text }}</div>
  </article>
</template>

<script>
import { mapState } from 'vuex';
import getNamespacedState from '../../../../app/webitel-ui/store/helpers/getNamespacedState';

export default {
  name: 'wt-omni-widget-window-content',
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      messages(state) {
        return getNamespacedState(state, this.namespace).messages;
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-window-content {
}
</style>
