<template>
  <button
    class="wt-omni-widget-chat-menu-button"
    type="button"
    @click="$emit('click', $event)"
  >
    <wt-icon
      v-if="type === MenuButtonType.URL"
      icon="link"
      size="sm"
      icon-prefix="wt-omni-widget"
    ></wt-icon>
    <slot></slot>
  </button>
</template>

<script>
import MenuButtonType from '../../../../../enums/MenuButtonType.enum';

export default {
  name: 'menu-button',
  props: {
    type: {
      type: String,
      default: MenuButtonType.REPLY,
    },
  },
  data: () => ({
    MenuButtonType,
  }),
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-chat-menu-button {
    @extend %typo-body-md;

    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    gap: 10px;

    width: 100%;
    padding: var(--chat-menu-button-padding);
    transition: var(--transition);
    border: var(--chat-menu-button-border-size) solid var(--secondary-color);
    border-radius: var(--border-radius--square);
    outline: none;
    --chat-menu-button-border-size: 1px;
    --chat-menu-button-padding: calc(15px - var(--chat-menu-button-border-size));

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
