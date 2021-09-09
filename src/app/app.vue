<template>
  <div id="app">
    <wt-omni-widget/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import WtOmniWidget from './components/wt-omni-widget.vue';
import MessageClient from './websocket/MessageClient';

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
    const workerSupport = !!window.SharedWorker && !!window.BroadcastChannel;
    const messageClient = new MessageClient({ url: this.$config.wsUrl, workerSupport });
    this.openSession({ messageClient });
  },
  destroyed() {
    this.closeSession();
  },
};
</script>

<style lang="scss">
@import 'css/main';
</style>
