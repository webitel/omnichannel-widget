<template>
  <div
    class="wt-omni-widget-chat-message wt-omni-widget-chat-message--event"
    :class="{ 'wt-omni-widget-chat-message--event--error': isError }"
  >
    {{ eventMessage }}
  </div>
</template>

<script>
import MessageType from '../../../../enums/MessageType.enum';
import chatMessageMixin from '../../../../mixins/chatMessageMixin';

export default {
  name: 'event-message',
  mixins: [chatMessageMixin],
  computed: {
    eventMessage() {
      switch (this.message.type) {
        case MessageType.ERROR:
          return this.$t('chat.events.error', { error: this.message.error.text });
        default:
          return this.message;
      }
    },
    isError() {
      return this.message.type === MessageType.ERROR;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../css/wt-omni-widget-chat-message';

#wt-omni-widget {
  .wt-omni-widget-chat-message--event {
    text-align: center;
    min-height: 34px;
    padding: var(--message-padding--event);
    margin: auto;
    background: var(--event-message-color);
  }

  .wt-omni-widget-chat-message--event--error {
    color: var(--negative-color);
  }
}
</style>
