<template>
  <aside
    id="wt-omni-widget"
    class="wt-omni-widget--reset-styles wt-omni-widget"
    :class="[
      `wt-omni-widget--${borderRadiusStyleClass}`,
      `wt-omni-widget--position-${positionClass}`,
      ]"
  >
    <wt-omni-widget-window
      :class="{
        'hhhiden': !isWidgetOpened,
        'wt-omni-widget-window--preview-mode': isPreviewMode === 'chat',
      }"
      @close="closeWidget"
    ></wt-omni-widget-window>
    <wt-omni-widget-buttons-menu
      :class="{ 'hhhiden': isWidgetOpened }"
      @click="openWidget"
    ></wt-omni-widget-buttons-menu>
  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MessageClient from '../websocket/MessageClient';
import WtOmniWidgetButtonsMenu from './wt-omni-widget-button/wt-omni-widget-buttons-menu.vue';
import WtOmniWidgetWindow from './wt-omni-widget-window/wt-omni-widget-window.vue';

export default {
  name: 'wt-omni-widget',
  components: {
    WtOmniWidgetWindow,
    WtOmniWidgetButtonsMenu,
  },
  data: () => ({
    isWidgetOpened: false,
  }),

  computed: {
    ...mapState({
      config: (state) => state.config,
    }),
    isPreviewMode() {
      return this.config._previewMode;
    },
    borderRadiusStyleClass() {
      switch (this.config.borderRadiusStyle) {
        case 'square':
          return this.config.borderRadiusStyle;
        case 'rounded':
          return this.config.borderRadiusStyle;
        default:
          return 'square';
      }
    },
    positionClass() {
      switch (this.config.position) {
        case 'right':
          return this.config.position;
        case 'left':
          return this.config.position;
        case 'static':
          return this.config.position;
        default:
          return 'right';
      }
    },
  },

  methods: {
    ...mapActions({
      openSession: 'OPEN_SESSION',
      closeSession: 'CLOSE_SESSION',
    }),
    ...mapActions('chat', {
      listenOnMessage: 'LISTEN_ON_MESSAGE',
      onMessage: 'ON_MESSAGE',
    }),
    initSession() {
      // FIXME
      const workerSupport = false && !!window.SharedWorker && !!window.BroadcastChannel;
      const messageClient = new MessageClient({
        url: this.config.wsUrl,
        workerSupport,
      });
      this.openSession({ messageClient });
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

    applyGlobalConfig() {
      this.isWidgetOpened = this.isPreviewMode === 'chat'; // Open chat preview if configuration contains chat preview property
      this.$i18n.locale = this.config.lang;
      document.documentElement.style.setProperty('--wt-omni-widget__accent-color', this.config.accentColor);
      document.documentElement.style.setProperty('--wt-omni-widget__buttons-menu-opacity', this.config.btnOpacity);
    },

    openWidget() {
      if (this.isPreviewMode) return;
      this.isWidgetOpened = true;
    },
    closeWidget() {
      if (this.isPreviewMode) return;
      this.isWidgetOpened = false;
    },
    setOnMessageListener() {
      // const callback = () => this.openWidget();
      // this.listenOnMessage(callback);
    },
  },

  watch: {
    config() {
      this.applyGlobalConfig();
    },
  },

  created() {
    this.applyGlobalConfig();
    if (this.config._previewMode) {
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

<style lang="scss" scoped>
#wt-omni-widget.wt-omni-widget {
  position: fixed;
  z-index: 2147483646; // int32 - 1 -- for preview pic popup

  &--position {
    &-right {
      right: var(--chat-offset);
      bottom: var(--chat-offset);

      .wt-omni-widget-window,
      .wt-omni-widget-buttons-menu {
        right: 0;
      }
    }

    &-left {
      left: var(--chat-offset);
      bottom: var(--chat-offset);

      .wt-omni-widget-window,
      .wt-omni-widget-buttons-menu {
        left: 0;
      }
    }

    &-static {
      position: static;
    }
  }

  .wt-omni-widget-window,
  .wt-omni-widget-buttons-menu {
    position: absolute;
    bottom: 0;
    transition: var(--transition);
  }

  .wt-omni-widget-window--preview-mode {
    pointer-events: none;
  }

  .hhhiden {
    opacity: 0;
    pointer-events: none;
  }
}

#wt-omni-widget.wt-omni-widget--position-static .wt-omni-widget-window,
#wt-omni-widget.wt-omni-widget--position-static .wt-omni-widget-buttons-menu {
  position: static;
}
</style>
