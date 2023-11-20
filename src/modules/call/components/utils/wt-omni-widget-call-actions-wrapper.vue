<template>
  <footer class="wt-omni-widget-call-actions-wrapper">
    <slot></slot>
  </footer>
</template>

<script>
export default {
  name: 'wt-omni-widget-call-actions-wrapper',
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-call-actions-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
}
</style>
