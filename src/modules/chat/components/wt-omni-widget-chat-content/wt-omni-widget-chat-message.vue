<template>
  <div
    class="wt-omni-widget-chat-message"
    :class="{ 'wt-omni-widget-chat-message--my': message.my }"
  >
    {{ message.data }}
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
  @extend %typo-body-md;

  box-sizing: border-box;
  width: fit-content;
  max-width: 100%;
  min-height: 44px;
  padding: var(--message-padding);
  color: var(--contrast-color);
  background: var(--agent-message-color);
  border-radius: var(--agent-message-border-radius--square);

  &--my {
    text-align: right;
    margin-left: auto;
    background: var(--client-message-color);
    border-radius: var(--client-message-border-radius--square);
  }

  .wt-omni-widget--rounded & {
    border-radius: var(--agent-message-border-radius--rounded);

    &--my {
      border-radius: var(--client-message-border-radius--rounded);
    }
  }
}
</style>
