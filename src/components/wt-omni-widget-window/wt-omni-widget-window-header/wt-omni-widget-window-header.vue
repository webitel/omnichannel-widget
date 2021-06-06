<template>
  <header class="wt-omni-widget-window-header">
    <div class="logo">
      <img src="../../../assets/img/logo.svg" alt="Webitel logo">
    </div>
  </header>
</template>

<script>
export default {
  name: 'wt-omni-widget-window-header',
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-window-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background: var(--accent-color);
  border-radius: var(--border-radius--circular);

  .logo {
    width: 24px;
    height: 24px;
  }
}
</style>
