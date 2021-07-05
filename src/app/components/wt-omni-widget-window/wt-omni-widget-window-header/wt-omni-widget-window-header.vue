<template>
  <header class="wt-omni-widget-window-header">
    <div class="logo">
      <img src="../../../assets/img/logo.svg" alt="Webitel logo">
    </div>
    <wt-icon-btn
      icon="close"
      size="sm"
      @click="$emit('close')"
    ></wt-icon-btn>
  </header>
</template>

<script>
export default {
  name: 'wt-omni-widget-window-header',
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-window-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--header-padding);
    background: var(--wt-omni-widget__accent-color);
    border-radius: var(--border-radius--square);

    .logo {
      width: 24px;
      height: 24px;
    }
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-window-header {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
