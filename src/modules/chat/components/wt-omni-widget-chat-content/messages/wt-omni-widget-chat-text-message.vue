<template>
  <div
    class="wt-omni-widget-chat-message wt-omni-widget-chat-message--text"
    :class="{ 'wt-omni-widget-chat-message--my': my }"
    v-html="text"
  ></div>
</template>

<script>
import linkifyHtml from 'linkifyjs/html';
import chatMessageMixin from '../../../mixins/chatMessageMixin';

export default {
  name: 'wt-omni-widget-chat-text-message',
  mixins: [chatMessageMixin],
  computed: {
    text() {
      return linkifyHtml(this.message.text, {
        target: '_blank',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../../css/wt-omni-widget-chat-message';
</style>
