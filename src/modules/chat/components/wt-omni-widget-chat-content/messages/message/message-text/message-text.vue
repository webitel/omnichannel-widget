<template>
    <p
      class="wt-omni-widget-chat-message-text"
      v-html="parsedText"
    ></p>
</template>

<script>
import linkifyHtml from 'linkifyjs/html';
import dompurify from 'dompurify';
import he from 'he';

export default {
  name: 'message-text',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    parsedText() {
      return linkifyHtml(he.encode(dompurify.sanitize(this.text)), {
        target: '_blank',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-chat-message-text {}
</style>
