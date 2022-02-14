<template>
  <button
    class="wt-omni-widget-chat-menu-button"
    type="button"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'menu-button',
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-chat-menu-button {
    --chat-menu-button-min-width: 114px;
    --chat-menu-button-border-size: 1px;
    --chat-menu-button-padding: calc(15px - var(--chat-menu-button-border-size));

    @extend %typo-body-md;

    box-sizing: border-box;
    text-align: left;
    min-width: var(--chat-menu-button-min-width);
    width: fit-content;
    max-width: 100%;
    display: block;
    padding: var(--chat-menu-button-padding);
    border: var(--chat-menu-button-border-size) solid var(--secondary-color);
    transition: var(--transition);
    border-radius: var(--border-radius--square);
    outline: none;

    &:hover, &:focus, &:active {
      border-color: var(--wt-omni-widget__accent-color);
    }
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-chat-menu-button {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
