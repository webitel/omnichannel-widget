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
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import chatScroll from '../../../../app/directives/chat-scroll/chatScroll';
import scrollToBottom from '../../../../app/directives/chat-scroll/scripts/scrollToBottom';
import MessageType from '../../enums/MessageType.enum';
import Message from './messages/message/message.vue';
import EventMessage from './messages/event-message/event-message.vue';

export default {
  name: 'wt-omni-widget-window-content',
  directives: { chatScroll },
  components: {
    Message,
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
      [MessageType.TEXT]: 'message',
      [MessageType.FILE]: 'message',
      [MessageType.JOINED]: 'event-message',
      [MessageType.LEFT]: 'event-message',
      [MessageType.CLOSED]: 'event-message',
      [MessageType.CONTACT]: 'event-message',
      [MessageType.ERROR]: 'event-message',
    },
  }),
  computed: {
    ...mapState({
      messages(state) {
        return getNamespacedState(state, this.namespace).messages;
      },
    }),
  },
  methods: {
    scrollToBottom() {
      return scrollToBottom(this.$refs['chat-messages-container']);
    },
  },
  activated() {
    this.scrollToBottom();
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-window-content {
    @extend %wt-scrollbar;
    height: 100%;
    overflow-y: scroll;
    padding-right: 5px; // prevent "my" messages sticking to scrollbar
  }

  .wt-omni-widget-chat-message {
    margin-top: 10px;
  }
}
</style>
