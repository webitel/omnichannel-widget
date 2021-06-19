<template>
  <div class="wt-omni-widget-chat-message">
    info message
  </div>
</template>

<script>
export default {
  name: 'wt-omni-widget-chat-info-message',
  props: {
    message: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-chat-message {
  @extend %typo-body-md;

  box-sizing: border-box;
  width: fit-content;
  max-width: 100%;
  min-height: 44px;
  padding: var(--message-padding);
  color: var(--contrast-color);
  background: var(--agent-message-color);
  border-radius: var(--agent-message-border-radius--square);
}
</style>
