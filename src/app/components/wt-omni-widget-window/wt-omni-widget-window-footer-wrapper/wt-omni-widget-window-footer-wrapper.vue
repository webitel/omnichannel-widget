<template>
  <footer class="wt-omni-widget-window-footer-wrapper">
    <slot></slot>
  </footer>
</template>

<script>
export default {
  name: 'wt-omni-widget-window-footer-wrapper',
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-window-footer-wrapper {
  padding: var(--footer-wrapper-padding);
}
</style>
