<template>
  <footer class="wt-omni-widget-window-footer">
    <wt-omni-widget-chat-input
      @send="sendMessage"
    ></wt-omni-widget-chat-input>
    <wt-omni-widget-chat-footer-actions
      :namespace="namespace"
    ></wt-omni-widget-chat-footer-actions>
  </footer>
</template>

<script>
import { mapActions } from 'vuex';
import WtOmniWidgetChatInput from './wt-omni-widget-chat-input.vue';
import WtOmniWidgetChatFooterActions from './wt-omni-widget-chat-footer-actions.vue';

export default {
  name: 'wt-omni-widget-window-footer',
  components: { WtOmniWidgetChatInput, WtOmniWidgetChatFooterActions },
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

</style>
