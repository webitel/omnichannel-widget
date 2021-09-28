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
        <wt-omni-widget-window
          v-if="isWidgetOpened"
          :class="{
        'wt-omni-widget-window--preview-mode': isPreviewMode === 'chat',
      }"
          @open="openWidget"
          @close="closeWidget"
        ></wt-omni-widget-window>
        <wt-omni-widget-buttons-menu
          v-else
          @click="openWidget"
        ></wt-omni-widget-buttons-menu>
      </keep-alive>
    </transition>
  </aside>
</template>

<script>
import WtOmniWidgetButtonsMenu from './wt-omni-widget-button/wt-omni-widget-buttons-menu.vue';
import WtOmniWidgetWindow from './wt-omni-widget-window/wt-omni-widget-window.vue';

let openTimeoutContainer = null;

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
    applyGlobalConfig() {
      this.isWidgetOpened = this.isPreviewMode === 'chat'; // Open chat preview if configuration contains chat preview property
      this.$i18n.locale = this.config.lang;
      document.documentElement.style.setProperty('--wt-omni-widget__accent-color', this.config.accentColor);
      document.documentElement.style.setProperty('--wt-omni-widget__buttons-menu-opacity', this.config.btnOpacity);

      this.setupOpenTimeout();
    },
    setupOpenTimeout() {
      const { openTimeout } = this.config;
      if (openTimeoutContainer) openTimeoutContainer = clearTimeout(openTimeoutContainer);
      if (typeof openTimeout === 'number' && openTimeout >= 0) {
        openTimeoutContainer = setTimeout(() => this.openWidget(), openTimeout * 1000); // sec -> msec
      }
    },
    openWidget() {
      if (this.isPreviewMode) return;
      this.isWidgetOpened = true;
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
