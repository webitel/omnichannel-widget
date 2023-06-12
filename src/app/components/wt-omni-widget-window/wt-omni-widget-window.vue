<template>
  <section class="wt-omni-widget-window">
    <div id="wt-omni-widget-teleport-in-window-popup"></div>
    <wt-omni-widget-header
      @close="$emit('close')"
    ></wt-omni-widget-header>
    <wt-omni-widget-content-wrapper>
      <component
        :is="`${type}-content`"
        :namespace="namespace"
      ></component>
    </wt-omni-widget-content-wrapper>
    <wt-omni-widget-footer-wrapper>
      <component
        :is="`${type}-footer`"
        :namespace="namespace"
      ></component>
    </wt-omni-widget-footer-wrapper>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import ChatContent
  from '../../../modules/chat/components/wt-omni-widget-chat-content/wt-omni-widget-window-content.vue';
import ChatFooter
  from '../../../modules/chat/components/wt-omni-widget-chat-footer/wt-omni-widget-window-footer.vue';
import Type from '../../enum/Type.enum';
import MessageClient from '../../websocket/MessageClient';
import WtOmniWidgetContentWrapper
  from './wt-omni-widget-window-content-wrapper/wt-omni-widget-window-content-wrapper.vue';
import WtOmniWidgetFooterWrapper
  from './wt-omni-widget-window-footer-wrapper/wt-omni-widget-window-footer-wrapper.vue';
import WtOmniWidgetHeader from './wt-omni-widget-window-header/wt-omni-widget-window-header.vue';

export default {
  name: 'wt-omni-widget-window',
  components: {
    WtOmniWidgetHeader,
    WtOmniWidgetContentWrapper,
    WtOmniWidgetFooterWrapper,

    ChatContent,
    ChatFooter,
  },
  data: () => ({
    type: Type.CHAT,
  }),
  computed: {
    namespace() {
      // we place namespacing in container file cause we should pass it to many components with same namespace: content, footer
      switch (this.type) {
        case Type.CHAT:
          return 'chat';
        default:
          return '';
      }
    },
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
    initSession() {
      const workerSupport = false && !!window.SharedWorker && !!window.BroadcastChannel; // FIXME
      const messageClient = new MessageClient({
        url: this.config.chat.url,
        workerSupport,
      });
      this.initializeSession({ messageClient });
      this.setOnMessageListener();
    },
    initPreviewMode() {
      const messages = [{
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
      messages.forEach((message) => this.onMessage(message));
    },
    setOnMessageListener() {
      const callback = () => this.openWidget();
      this.listenOnMessage(callback);
    },
    openWidget() {
      this.$emit('open');
    },
  },

  created() {
    if (this.isPreviewMode) {
      this.initPreviewMode();
    } else {
      this.initSession();
      window.addEventListener('beforeunload', async (e) => {
        await this.closeSession();
        delete e.returnValue; // page will always reload
      });
    }
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-window {
    box-sizing: border-box;
    width: calc(100vw - var(--chat-offset) * 2);
    height: calc(100vh - var(--chat-offset) * 2);
    max-width: 390px;
    max-height: 560px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    background: var(--background-color);
    padding: var(--main-app-padding);
    border-radius: var(--border-radius--square);
    box-shadow: var(--morf-style-font);
  }

  .wt-omni-widget-window-content-wrapper {
    flex-grow: 1;
    min-height: 0;
  }

  .wt-omni-widget-window-header,
  .wt-omni-widget-window-content-wrapper {
    margin-bottom: 10px;
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-window {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
