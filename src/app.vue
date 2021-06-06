<template>
  <div id="app">
    <wt-omni-widget/>
  </div>
</template>

<script>
import WtOmniWidget from './components/wt-omni-widget.vue';

export default {
  name: 'app',
  components: {
    WtOmniWidget,
  },
};
</script>

<style lang="scss">
@import 'css/main';
</style>
