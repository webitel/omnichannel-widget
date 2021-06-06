<template>
  <div
    class="wt-omni-widget-chat-message"
    :class="{ 'wt-omni-widget-chat-message--my': message.my }"
  >
    {{ message.data.text }}
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
  padding: 15px;
  color: var(--contrast-color);
  background: var(--client-message-color);
  border-radius: 30px 30px 30px 0;

  &--my {
    text-align: right;
    background: var(--agent-message-color);
    margin-left: auto;
    border-radius: 30px 30px 0 30px;
  }
}
</style>
