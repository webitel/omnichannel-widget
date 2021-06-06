<template>
  <aside class="wt-omni-widget">
    <wt-omni-widget-window
      v-show="isWidgetOpened"
      @close="closeWidget"
    ></wt-omni-widget-window>
    <wt-omni-widget-buttons-menu
      v-show="!isWidgetOpened"
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
}
</style>
