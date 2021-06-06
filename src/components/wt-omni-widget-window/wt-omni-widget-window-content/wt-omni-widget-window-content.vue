<template>
  <article class="wt-omni-widget-window-content">
    <div
      v-for="{ id, data } of messages"
      :key="id"
    >{{ data.text }}</div>
  </article>
</template>

<script>
import { addMsgCallback } from '../../../app/workers/websocket-shared-worker/install';

export default {
  name: 'wt-omni-widget-window-content',
  data: () => ({
    messages: [],
  }),
  created() {
    addMsgCallback(this.receiveMessage);
  },
  methods: {
    receiveMessage(msg) {
      this.addMessage(msg);
    },
    addMessage(msg) {
      this.messages.push(msg);
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-window-content {
}
</style>
