<template>
  <button
    class="wt-icon-btn"
    :class="[
      `wt-icon-btn--${size}`,
    ]"
    type="button"
    @click.prevent="$emit('click', $event)"
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
  },
};
</script>

<style lang="scss" scoped>
.wt-icon-btn {
  position: relative;
  padding: 10px;
  background: var(--main-color);
  border-radius: var(--border-radius--circular);
  box-shadow: var(--morf-style-up-50);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--morf-style-up-100);
  }

  &--sm {
    padding: 6px;
  }

  &--md {
    padding: 10px;
  }

  &--xl {
    padding: 18px;
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
</style>
