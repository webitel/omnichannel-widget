<template>
  <footer class="wt-omni-widget-window-footer">
    <wt-omni-widget-chat-input
      @send="sendMessage"
    ></wt-omni-widget-chat-input>
  </footer>
</template>

<script>
import { mapActions } from 'vuex';
import WtOmniWidgetChatInput from './wt-omni-widget-chat-input.vue';

export default {
  name: 'wt-omni-widget-window-footer',
  components: { WtOmniWidgetChatInput },
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      sendMessage(dispatch, payload) {
        return dispatch(`${this.namespace}/SEND_MESSAGE`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-window-footer {
  padding: 5px 10px;
}
</style>
