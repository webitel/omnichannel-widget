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
      <keep-alive>
        <wt-omni-widget-popup
          v-if="isPopupOpened"
          @close="closePopup"
        ></wt-omni-widget-popup>
        <wt-omni-widget-window
          v-else-if="isWidgetOpened"
          :class="{
            'wt-omni-widget-window--preview-mode': isPreviewMode === 'chat',
          }"
          @open="openWidget"
          @close="closeWidget"
        ></wt-omni-widget-window>
        <wt-omni-widget-buttons-menu
          v-else
          @open="handleBtnOpen"
        ></wt-omni-widget-buttons-menu>
      </keep-alive>
    </transition>
  </aside>
</template>

<script>
import WtOmniWidgetButtonsMenu from './wt-omni-widget-button/wt-omni-widget-buttons-menu.vue';
import WtOmniWidgetWindow from './wt-omni-widget-window/wt-omni-widget-window.vue';
import WtOmniWidgetPopup from './wt-omni-widget-popup/wt-omni-widget-popup.vue';
import ChatChannel from '../enum/ChatChannel.enum';

let openTimeoutContainer = null;

export default {
  name: 'wt-omni-widget',
  components: {
    WtOmniWidgetWindow,
    WtOmniWidgetPopup,
    WtOmniWidgetButtonsMenu,
  },
  data: () => ({
    isPopupOpened: false,
    isWidgetOpened: false,
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
    applyGlobalConfig() {
      this.isWidgetOpened = this.isPreviewMode === 'chat'; // Open chat preview if configuration contains chat preview property
      if (this.config.view.lang) this.$i18n.locale = this.config.view.lang;
      document.documentElement.style.setProperty('--wt-omni-widget__accent-color', this.config.view.accentColor);
      document.documentElement.style.setProperty('--wt-omni-widget__buttons-menu-opacity', this.config.view.btnOpacity);

      this.setupOpenTimeout();
    },
    setupOpenTimeout() {
      const openTimeout = this.config.chat?.openTimeout;
      if (openTimeoutContainer) openTimeoutContainer = clearTimeout(openTimeoutContainer);
      if (typeof openTimeout === 'number' && openTimeout >= 0) {
        openTimeoutContainer = setTimeout(() => this.openWidget(), openTimeout * 1000); // sec -> msec
      }
    },
    handleBtnOpen(type) {
      if (type === ChatChannel.APPOINTMENT) {
        this.openPopup();
      } else {
        this.openWidget();
      }
    },
    openWidget() {
      if (this.isPreviewMode) return;
      this.isWidgetOpened = true;
    },
    openPopup() {
      this.isPopupOpened = true;
    },
    closePopup() {
      this.isPopupOpened = false;
    },
    closeWidget() {
      if (this.isPreviewMode) return;
      this.isWidgetOpened = false;
    },
  },

  watch: {
    config() {
      this.applyGlobalConfig();
    },
  },

  created() {
    this.applyGlobalConfig();
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
      left: var(--chat-offset);
      bottom: var(--chat-offset);

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
