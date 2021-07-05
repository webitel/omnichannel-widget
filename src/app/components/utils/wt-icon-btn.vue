<template>
  <button
    class="wt-icon-btn"
    :class="[
      `wt-icon-btn--${size}`,
      { 'wt-icon-btn--permanent-shadow': permanentShadow },
    ]"
    type="button"
    @click="$emit('click', $event)"
  >
    <div class="wt-icon-btn__wrapper">
      <wt-icon
        :icon="icon"
        :size="iconSize || size"
        :color="color"
      ></wt-icon>
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  name: 'wt-icon-btn',
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'md',
      options: ['sm', 'md', 'xl'],
      description: 'BUTTON SIZE!',
    },
    iconSize: {
      type: String,
    },
    color: {
      type: String,
    },
    permanentShadow: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-icon-btn {
    position: relative;
    padding: var(--icon-btn-padding--md);
    background: var(--main-color);
    border-radius: var(--border-radius--square);
    transition: var(--transition);

    &:hover {
      box-shadow: var(--morf-style-up-50);
    }

    &--sm {
      padding: var(--icon-btn-padding--sm);
    }

    &--md {
      padding: var(--icon-btn-padding--md);
    }

    &--xl {
      padding: var(--icon-btn-padding--xl);
    }

    &--permanent-shadow {
      box-shadow: var(--morf-style-up-50);

      &:hover {
        box-shadow: var(--morf-style-up-100);
      }
    }

    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }

  .wt-icon-btn,
  .wt-icon-btn__button {
    line-height: 0;
  }

  &.wt-omni-widget--rounded {
    .wt-icon-btn {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
