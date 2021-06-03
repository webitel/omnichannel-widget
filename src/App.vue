<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div
      v-for="{ id, data } of messages"
      :key="id"
    >{{ data.text }}</div>
    <form id="form" @submit.prevent="sendMessage">
      <input type="submit" value="Send" />
      <input v-model="draft" type="text" size="64" autofocus />
    </form>
  </div>
</template>

<script>
import { postMessageToWSServer, addMsgCallback } from './workers/websocket-shared-worker/install';

export default {
  name: 'App',
  data: () => ({
    draft: '',
    messages: [],
  }),
  created() {
    addMsgCallback(this.receiveMessage);
  },
  methods: {
    sendMessage() {
      postMessageToWSServer(this.draft);
      this.draft = '';
    },
    receiveMessage(msg) {
      this.addMessage(msg);
    },
    addMessage(msg) {
      this.messages.push(msg);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
