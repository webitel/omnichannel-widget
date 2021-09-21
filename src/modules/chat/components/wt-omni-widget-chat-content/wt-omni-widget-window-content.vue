<template>
  <article
    class="wt-omni-widget-window-content"
    ref="chat-messages-container"
    v-chat-scroll
  >
    <component
      v-for="(message, key) of messages"
      :message="message"
      :namespace="namespace"
      :key="key"
      :is="componentMap[message.type]"
    ></component>
  </article>
</template>

<script>
import { mapState } from 'vuex';
import getNamespacedState from '../../../../app/webitel-ui/store/helpers/getNamespacedState';
import TextMessage from './messages/wt-omni-widget-chat-text-message.vue';
import FileMessage from './messages/wt-omni-widget-chat-file-message.vue';
import EventMessage from './messages/wt-omni-widget-chat-event-message.vue';
import chatScroll from '../../../../app/directives/chat-scroll/chatScroll';
import scrollToBottom from '../../../../app/directives/chat-scroll/scripts/scrollToBottom';
import MessageType from '../../enums/MessageType.enum';

export default {
  name: 'wt-omni-widget-window-content',
  directives: { chatScroll },
  components: {
    TextMessage,
    FileMessage,
    EventMessage,
  },
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    componentMap: {
      [MessageType.TEXT]: 'text-message',
      [MessageType.FILE]: 'file-message',
      [MessageType.JOINED]: 'event-message',
      [MessageType.LEFT]: 'event-message',
      [MessageType.CLOSED]: 'event-message',
      [MessageType.CONTACT]: 'event-message',
    },
  }),
  computed: {
    ...mapState({
      messages(state) {
        return getNamespacedState(state, this.namespace).messages;
      },
    }),
    isMyMessage() {
      return this.$store.getters[`${this.namespace}/IS_MY_MESSAGE`];
    },
  },
  watch: {
    async messages(messages) {
      if (messages.length && this.isMyMessage(messages[messages.length - 1])) {
        await this.$nextTick(); // wait for message to draw
        scrollToBottom(this.$refs['chat-messages-container']);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-window-content {
    @extend %wt-scrollbar;
    height: 100%;
    overflow-y: scroll;
  }

  .wt-omni-widget-chat-message {
    margin-top: 10px;
  }
}
</style>
