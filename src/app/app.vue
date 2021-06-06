<template>
  <div id="app">
    <wt-omni-widget/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import WtOmniWidget from './components/wt-omni-widget.vue';

export default {
  name: 'app',
  components: {
    WtOmniWidget,
  },
  methods: {
    ...mapActions({
      openSession: 'OPEN_SESSION',
      closeSession: 'CLOSE_SESSION',
    }),
  },
  created() {
    this.openSession();
  },
  destroyed() {
    this.closeSession();
  },
};
</script>

<style lang="scss">
@import 'css/main';
</style>
