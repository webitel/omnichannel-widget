<template>
  <button
    class="wt-omni-widget-btn"
    :class="`wt-omni-widget-btn--${type}`"
    @click.prevent="$emit('click')"
  >
    <wt-icon
      icon="chat"
      color="contrast"
    ></wt-icon>
  </button>
</template>

<script>
export default {
  name: 'wt-omni-widget-button',
  data: () => ({}),
  props: {
    type: {
      type: String,
      required: true,
      options: ['chat'],
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-btn {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius--square);
    transition: var(--transition);
    cursor: pointer;
    pointer-events: auto; // cause its wrapper p-events is none

    &:hover {
      box-shadow: var(--morf-style-up-50);
    }

    &--chat {
      background: var(--wt-omni-widget__accent-color);
    }
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-btn {
      border-radius: var(--border-radius--rounded-btn);
    }
  }
}
</style>
