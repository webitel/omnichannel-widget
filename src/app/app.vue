<template>
  <div id="app">
    <wt-omni-widget/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import WtOmniWidget from './components/wt-omni-widget.vue';
import MessageClient from './websocket/MessageClient';

export default {
  name: 'app',
  components: {
    WtOmniWidget,
  },
  computed: {
    messages() {
      return [{
        type: 'message',
        data: {
          seq: 1,
          id: 1,
          message: {
            type: 'text',
            text: this.$t('chat.previewChatMessage1'),
            from: {
              channel: 'bot',
              contact: '99',
              firstName: 'website',
              id: 99,
            },
          },
        },
      }, {
        type: 'message',
        data: {
          id: 2,
          seq: 2,
          message: {
            type: 'text',
            text: this.$t('chat.previewChatMessage2'),
          },
        },
      }];
    },
  },
  methods: {
    ...mapActions({
      openSession: 'OPEN_SESSION',
      closeSession: 'CLOSE_SESSION',
    }),
    ...mapActions('chat', {
      onMessage: 'ON_MESSAGE',
    }),
    initSession() {
      // FIXME
      const workerSupport = false && !!window.SharedWorker && !!window.BroadcastChannel;
      const messageClient = new MessageClient({
        url: this.$config.wsUrl,
        workerSupport,
      });
      this.openSession({ messageClient });
    },
    initPreviewMode() {
      this.messages.forEach((message) => this.onMessage(message));
    },
  },
  created() {
    if (this.$config._previewMode) {
      this.initPreviewMode();
    } else {
      this.initSession();
    }
  },
  destroyed() {
    this.closeSession();
  },
};
</script>

<style lang="scss">
@import 'css/main';
</style>
