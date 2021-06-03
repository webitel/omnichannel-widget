<template>
  <footer class="wt-omni-widget-window-footer">
    <form id="form" @submit.prevent="sendMessage">
      <input type="submit" value="Send" />
      <input v-model="draft" type="text" size="64" autofocus />
    </form>
  </footer>
</template>

<script>
import { postMessageToWSServer } from '../../workers/websocket-shared-worker/install';

export default {
  name: 'wt-omni-widget-window-footer',
  data: () => ({
    draft: '',
  }),
  methods: {
    sendMessage() {
      postMessageToWSServer(this.draft);
      this.draft = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-window-footer {
}
</style>
