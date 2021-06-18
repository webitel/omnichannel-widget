<template>
  <aside class="wt-omni-widget" :class="{'wt-omni-widget--rounded': true }">
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
    isWidgetOpened: true,
  }),
  methods: {
    openWidget() {
      this.isWidgetOpened = true;
    },
    closeWidget() {
      this.isWidgetOpened = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget {
  position: fixed;
  z-index: 11;
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
