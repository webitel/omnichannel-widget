<template>
  <footer class="wt-omni-widget-window-footer">
    <wt-omni-widget-chat-input
      @send="sendMessage"
    ></wt-omni-widget-chat-input>
  </footer>
</template>

<script>
import { postMessageToWSServer } from '../../../app/workers/websocket-shared-worker/install';
import WtOmniWidgetChatInput from './wt-omni-widget-chat-input.vue';

export default {
  name: 'wt-omni-widget-window-footer',
  components: { WtOmniWidgetChatInput },
  methods: {
    sendMessage(draft) {
      postMessageToWSServer(draft);
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-window-footer {
  padding: 5px 10px;
}
</style>
