<template>
    <p
      class="wt-omni-widget-chat-message-text"
      v-html="parsedText"
    ></p>
</template>

<script>
import linkifyHtml from 'linkifyjs/html';

export default {
  name: 'message-text',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    parsedText() {
      return linkifyHtml(this.text, {
        target: '_blank',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-chat-message-text {}
</style>
