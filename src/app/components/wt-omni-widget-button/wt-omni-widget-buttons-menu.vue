<template>
  <div class="wt-omni-widget-buttons-menu">
    <wt-omni-widget-button
      type="chat"
      @click="$emit('click', 'chat')"
    ></wt-omni-widget-button>
  </div>
</template>

<script>
import WtOmniWidgetButton from './wt-omni-widget-button.vue';

export default {
  name: 'wt-omni-widget-buttons-menu',
  components: {
    WtOmniWidgetButton,
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-buttons-menu {
    width: fit-content;
    padding: var(--buttons-menu-padding);
    border-radius: var(--border-radius--square);
    background: var(--main-color);
    opacity: var(--wt-omni-widget__buttons-menu-opacity); // configured style
    transition: var(--transition);
    // https://stackoverflow.com/a/30104683
    pointer-events: none; // apply hover styles only on child hover

    &:hover {
      box-shadow: var(--morf-style-up-100);
      opacity: 1;
    }
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-buttons-menu {
      border-radius: var(--border-radius--rounded-btn);
    }
  }
}
</style>
