<template>
  <div class="wt-omni-widget-chat-message">
    {{ message.text }}
  </div>
</template>

<script>
export default {
  name: 'wt-omni-widget-chat-message',
  props: {
    message: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-chat-message {
  min-height: 32px;
}
</style>
