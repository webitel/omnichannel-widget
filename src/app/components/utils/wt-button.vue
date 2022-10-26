<template>
  <button
    class="wt-button"
    :class="[`wt-button--color-${color}`]"
    type="button"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'wt-button',
  props: {
    color: {
      type: String,
      default: 'accent',
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  %typo-btn {
    font: {
      family: 'Montserrat Semi', monospace;
      size: 12px;
    }
    line-height: 14px;
  }

  .wt-button {
    --btn-padding: 11px 19px;
    //--btn-border: 1px solid;

    @extend %typo-btn;
    position: relative;
    display: block;
    width: fit-content;
    padding: var(--btn-padding);
    //border: var(--btn-border);
    color: var(--main-color);
    background: var(--wt-omni-widget__accent-color);
    //border-color: var(--wt-omni-widget__accent-color);
    border-radius: var(--border-radius--rounded-btn);
    transition: var(--transition);
    cursor: pointer;

    &--color {
      &-secondary {
        color: var(--text-primary-color);
        background: var(--secondary-color);
      }
    }

    &:hover {
      box-shadow: var(--morf-style-up-50);
    }
  }

  &.wt-omni-widget--rounded {
    .wt-button {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
