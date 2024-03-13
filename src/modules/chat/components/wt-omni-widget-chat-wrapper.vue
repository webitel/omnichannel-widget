<template>
  <!--
why there's d: contents; and this weird wrapper?
 see  https://my.webitel.com/browse/WTEL-4027
-->
  <div style="display: contents;">
    <content-wrapper>
      <chat-content :namespace="namespace"></chat-content>
    </content-wrapper>
    <footer-wrapper>
      <chat-footer :namespace="namespace"></chat-footer>
    </footer-wrapper>
  </div>
</template>

<script>
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import { mapActions, mapState } from 'vuex';
import ContentWrapper
  from '../../../app/components/wt-omni-widget-window/wt-omni-widget-window-content-wrapper/wt-omni-widget-window-content-wrapper.vue';
import FooterWrapper
  from '../../../app/components/wt-omni-widget-window/wt-omni-widget-window-footer-wrapper/wt-omni-widget-window-footer-wrapper.vue';
import GlobalEvent from '../../../app/enums/GlobalEvent.enum';
import WidgetChannel from '../../../app/enums/WidgetChannel.enum';
import MessageClient from '../../../app/websocket/MessageClient';
import ChatContent from './wt-omni-widget-chat-content/wt-omni-widget-window-content.vue';
import ChatFooter from './wt-omni-widget-chat-footer/wt-omni-widget-window-footer.vue';
import reCAPTCHify from '../../reCAPTCHA-verification/scripts/reCAPTCHify';

export default {
  name: 'wt-omni-widget-chat-wrapper',
  components: {
    ContentWrapper,
    FooterWrapper,
    ChatContent,
    ChatFooter,
  },
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState('chat', {
      client: (state) => state.messageClient,
    }),
  },
  methods: {
    ...mapActions({
      initializeSession: 'INITIALIZE_SESSION',
      closeSession: 'CLOSE_SESSION',
    }),
    ...mapActions('chat', {
      listenOnMessage: 'LISTEN_ON_MESSAGE',
      onMessage: 'ON_MESSAGE',
    }),
    async initSession() {
      if (this.client) return; // prevent reinitialization, but should be refactored
      try {
        await reCAPTCHify(() => {
          const workerSupport = false && !!window.SharedWorker && !!window.BroadcastChannel; // FIXME
          const messageClient = new MessageClient({
            url: this.config.chat.url,
            workerSupport,
          });
          this.initializeSession({ messageClient });
          this.setOnMessageListener();

          window.addEventListener('beforeunload', async (e) => {
            await this.closeSession();
            delete e.returnValue; // page will always reload
          });
        });
      } catch (err) {
        eventBus.$emit('snack', {
          type: 'error',
          text: this.$t('captcha.error.text'),
        });
        throw err;
      }
    },
    initPreviewMode() {
      const messages = [
        {
          type: 'text',
          text: this.$t('chat.previewChatMessage1'),
          from: {
            channel: 'bot',
            contact: '99',
            firstName: 'website',
            id: 99,
          },
        },
        {
          type: 'text',
          text: this.$t('chat.previewChatMessage2'),
        },
      ];
      messages.forEach((message) => this.onMessage({ message }));
    },
    setOnMessageListener() {
      const callback = () => eventBus.$emit(GlobalEvent.SET_ACTIVE_WIDGET_CHANNEL, { channel: WidgetChannel.CHAT });
      this.listenOnMessage(callback);
    },
  },

  created() {
    if (this.isPreviewMode) {
      this.initPreviewMode();
    }
  },
  activated() {
    if (!this.isPreviewMode) {
      this.initSession(); // try to init, if didn't init on created (note: initSession() has this.client check!!!)
    }
  },
};

</script>

<style lang="scss" scoped>

</style>
