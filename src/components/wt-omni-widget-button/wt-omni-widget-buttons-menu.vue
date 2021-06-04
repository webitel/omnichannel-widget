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
.wt-omni-widget-buttons-menu {
  width: fit-content;
  padding: 10px;
  border-radius: 50%;
  background: hsla(0, 0%, 100%, 1);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--morf-style-up-100);
  }
}
</style>
