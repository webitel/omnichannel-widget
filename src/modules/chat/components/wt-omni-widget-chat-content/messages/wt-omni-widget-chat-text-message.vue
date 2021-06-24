<template>
  <div
    class="wt-omni-widget-chat-message wt-omni-widget-chat-message--text"
    :class="{ 'wt-omni-widget-chat-message--my': my }"
  >
    {{ message.text }}
  </div>
</template>

<script>
import chatMessageMixin from '../../../mixins/chatMessageMixin';

export default {
  name: 'wt-omni-widget-chat-text-message',
  mixins: [chatMessageMixin],
};
</script>

<style lang="scss" scoped>
@import '../../../css/wt-omni-widget-chat-message';
</style>
