<template>
  <article class="wt-omni-widget-window-content">
    <message
      v-for="message of messages"
      :message="message"
      :key="message.id"
    ></message>
  </article>
</template>

<script>
import { mapState } from 'vuex';
import getNamespacedState from '../../../../app/webitel-ui/store/helpers/getNamespacedState';
import Message from './wt-omni-widget-chat-message.vue';

export default {
  name: 'wt-omni-widget-window-content',
  components: { Message },
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
.wt-omni-widget-chat-message {
  margin-top: 10px;
}
</style>
