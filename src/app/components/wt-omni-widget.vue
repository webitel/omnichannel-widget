<template>
  <aside
    class="wt-omni-widget"
    :class="[`wt-omni-widget--${borderRadiusStyle}`]"
    :style="widgetStyle"
  >
    <wt-omni-widget-window
      :class="{ 'hidden': !isWidgetOpened }"
      @close="closeWidget"
    ></wt-omni-widget-window>
    <wt-omni-widget-buttons-menu
      :class="{ 'hidden': isWidgetOpened }"
      @click="openWidget"
    ></wt-omni-widget-buttons-menu>
  </aside>
</template>

<script>
import WtOmniWidgetWindow from './wt-omni-widget-window/wt-omni-widget-window.vue';
import WtOmniWidgetButtonsMenu from './wt-omni-widget-button/wt-omni-widget-buttons-menu.vue';

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
    borderRadiusStyle() {
      switch (this.$config.borderRadiusStyle) {
        case 'square': return this.$config.borderRadiusStyle;
        case 'rounded': return this.$config.borderRadiusStyle;
        default: return 'square';
      }
    },
    widgetStyle() {
      return `
       bottom: ${this.$config.position.bottom}px;
       right: ${this.$config.position.right}px;
       `;
    },
  },
  methods: {
    applyGlobalConfig() {
      this.$i18n.locale = this.$config.lang;
      document.documentElement.style.setProperty('--accent-color', this.$config.accentColor);
      document.documentElement.style.setProperty('--buttons-menu-opacity', this.$config.btnOpacity);
    },
    openWidget() {
      this.isWidgetOpened = true;
    },
    closeWidget() {
      this.isWidgetOpened = false;
    },
  },
  created() {
    this.applyGlobalConfig();
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget {
  position: fixed;
  z-index: 2147483646; // int32 - 1 -- for preview pic popup
  bottom: 100px;
  right: 100px;

  .wt-omni-widget-window,
  .wt-omni-widget-buttons-menu {
    position: absolute;
    right: 0;
    bottom: 0;
    transition: var(--transition);
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
