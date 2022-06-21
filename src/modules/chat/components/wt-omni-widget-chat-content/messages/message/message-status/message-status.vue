<template>
  <aside
    class="wt-omni-widget-chat-message-status"
  >
    <span class="wt-omni-widget-chat-message-status__time">
      {{ new Date(createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) }}
    </span>
    <wt-icon
      v-if="my && statusIcon"
      :icon="statusIcon"
      icon-prefix="wt-omni-widget"
      size="sm"
    ></wt-icon>
  </aside>
</template>

<script>
import MessageStatus from '../../../../../enums/MessageStatus.enum';

export default {
  name: 'message-status',
  props: {
    my: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      options: MessageStatus,
    },
    createdAt: {
      type: Number,
    },
  },
  computed: {
    statusIcon() {
      switch (this.status) {
        case MessageStatus.SENT:
          return 'tick';
        case MessageStatus.ERROR:
          return 'attention';
        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-chat-message-status {
    line-height: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    &__time {
      @extend %typo-body-sm;
    }
  }
}
</style>
