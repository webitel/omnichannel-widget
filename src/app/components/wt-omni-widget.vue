<template>
  <aside
    id="wt-omni-widget"
    class="wt-omni-widget--reset-styles wt-omni-widget"
    :class="[
      `wt-omni-widget--${borderRadiusStyleClass}`,
      `wt-omni-widget--position-${positionClass}`,
      ]"
  >
    <transition name="widget-appearance-transition">
<!--
I don't remember why there's a keep-alive,
  but researching through https://my.webitel.com/browse/WTEL-4027,
  i discovered, that, at least, keep-alive prevents chat components from creating new ws connections
  (you can see this as: messages that are duplicated as many times as connection is reinitialized)

  can't say for sure, if this keep-alive is a mistake, or not :(
  -->
      <keep-alive>
        <wt-omni-widget-buttons-menu
          v-if="!activeChannel"
          @open="setActiveChannel"
        ></wt-omni-widget-buttons-menu>
        <wt-omni-widget-popup
          v-else-if="activeChannel === WidgetChannel.APPOINTMENT"
          :channel="activeChannel"
          @close="setActiveChannel({ channel: null })"
        ></wt-omni-widget-popup>
        <wt-omni-widget-window
          v-else
          :class="{
            'wt-omni-widget-window--preview-mode': isPreviewMode === 'chat',
          }"
          :channel="activeChannel"
          @close="setActiveChannel({ channel: null })"
        ></wt-omni-widget-window>
      </keep-alive>
    </transition>
  </aside>
</template>

<script>
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import { mapActions } from 'vuex';
import WtOmniWidgetButtonsMenu from './wt-omni-widget-button/wt-omni-widget-buttons-menu.vue';
import WtOmniWidgetWindow from './wt-omni-widget-window/wt-omni-widget-window.vue';
import WtOmniWidgetPopup from './wt-omni-widget-popup/wt-omni-widget-popup.vue';
import WidgetChannel from '../enums/WidgetChannel.enum';
import GlobalEvent from '../enums/GlobalEvent.enum';

let openTimeoutContainer = null;

export default {
  name: 'wt-omni-widget',
  components: {
    WtOmniWidgetWindow,
    WtOmniWidgetPopup,
    WtOmniWidgetButtonsMenu,
  },
  data: () => ({
    WidgetChannel,
    activeChannel: null,
  }),

  computed: {
    borderRadiusStyleClass() {
      switch (this.config.view.borderRadiusStyle) {
        case 'square':
          return this.config.view.borderRadiusStyle;
        case 'rounded':
          return this.config.view.borderRadiusStyle;
        default:
          return 'square';
      }
    },
    positionClass() {
      switch (this.config.view.position) {
        case 'right':
          return this.config.view.position;
        case 'left':
          return this.config.view.position;
        case 'static':
          return this.config.view.position;
        default:
          return 'right';
      }
    },
  },

  methods: {
    ...mapActions({
      subscribeToNetworkConnectionStatus: 'SUBSCRIBE_TO_NETWORK_CONNECTION_STATUS',
    }),
    applyGlobalConfig() {
      if (this.isPreviewMode === 'chat') this.activeChannel = WidgetChannel.CHAT; // Open chat preview if configuration contains chat preview property
      if (this.config.view.lang) this.$i18n.locale = this.config.view.lang;
      document.documentElement.style.setProperty('--wt-omni-widget__accent-color', this.config.view.accentColor);
      document.documentElement.style.setProperty('--wt-omni-widget__buttons-menu-opacity', this.config.view.btnOpacity);
      if (!this.config.captcha?.showFlag) {
        document.styleSheets[0].insertRule('.grecaptcha-badge { visibility: hidden; }', 0);
      }

      this.setupOpenTimeout();
    },
    setupOpenTimeout() {
      const openTimeout = this.config.chat?.openTimeout;
      if (openTimeoutContainer) openTimeoutContainer = clearTimeout(openTimeoutContainer);
      if (typeof openTimeout === 'number' && openTimeout >= 0) {
        openTimeoutContainer = setTimeout(() => this.setActiveChannel({ channel: WidgetChannel.CHAT }), openTimeout * 1000); // sec -> msec
      }
    },
    setActiveChannel({ channel, options }) {
      if (this.isPreviewMode) return;
      this.activeChannel = channel;
    },
  },

  watch: {
    config() {
      this.applyGlobalConfig();
    },
  },

  created() {
    this.subscribeToNetworkConnectionStatus();
    this.applyGlobalConfig();
    eventBus.$on(GlobalEvent.SET_ACTIVE_WIDGET_CHANNEL, this.setActiveChannel);
  },
  destroyed() {
    eventBus.$off(GlobalEvent.SET_ACTIVE_WIDGET_CHANNEL, this.setActiveChannel);
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget.wt-omni-widget {
  position: fixed;
  z-index: 2147483646; // int32 - 1 -- for preview pic popup

  .wt-omni-widget-window,
  .wt-omni-widget-buttons-menu {
    position: absolute;
    bottom: 0;
  }

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
      bottom: var(--chat-offset);
      left: var(--chat-offset);

      .wt-omni-widget-window,
      .wt-omni-widget-buttons-menu {
        left: 0;
      }
    }

    &-static {
      position: static;

      .wt-omni-widget-window,
      .wt-omni-widget-buttons-menu {
        position: static;
      }
    }
  }

  .widget-appearance-transition-enter-active,
  .widget-appearance-transition-leave-active {
    transition: var(--transition)
  }

  .widget-appearance-transition-enter,
  .widget-appearance-transition-leave-to {
    opacity: 0;
  }

  .wt-omni-widget-window--preview-mode {
    pointer-events: none;
  }
}

</style>
