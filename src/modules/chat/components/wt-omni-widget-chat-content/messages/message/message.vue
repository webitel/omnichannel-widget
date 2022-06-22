<template>
  <section
    class="wt-omni-widget-chat-message"
    :class="{
      'wt-omni-widget-chat-message--my': my,
     }"
  >
    <message-gallery
      v-if="isGallery"
      :file="message.file"
    ></message-gallery>
    <message-text
      v-if="message.text"
      :text="message.text"
    ></message-text>
    <message-file
      v-if="message.file"
      :file="message.file"
    ></message-file>
    <message-menu
      v-if="message.buttons"
      :buttons="message.buttons"
      :namespace="namespace"
    ></message-menu>
    <message-status
      :my="my"
      :status="message.status"
      :created-at="message.createdAt"
    ></message-status>
  </section>
</template>

<script>

import chatMessageMixin from '../../../../mixins/chatMessageMixin';
import MessageGallery from './message-gallery/message-gallery.vue';
import MessageText from './message-text/message-text.vue';
import MessageFile from './message-attachment/message-attachment.vue';
import MessageMenu from './message-menu/message-menu.vue';
import MessageStatus from './message-status/message-status.vue';

export default {
  name: 'message',
  mixins: [chatMessageMixin],
  components: {
    MessageGallery,
    MessageText,
    MessageFile,
    MessageMenu,
    MessageStatus,
  },
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  computed: {
    my() {
      return this.$store.getters[`${this.namespace}/IS_MY_MESSAGE`](this.message);
    },
    isGallery() {
      return this.message.file?.mime?.includes('image');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../css/wt-omni-widget-chat-message';

#wt-omni-widget {
  .wt-omni-widget-chat-message {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
