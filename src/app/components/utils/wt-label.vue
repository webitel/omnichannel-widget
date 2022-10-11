<template>
  <label
    class="wt-label"
    :class="{
      'wt-label--invalid': invalid,
    }"
    :for="this.for"
  >
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'wt-label',
  props: {
    for: {
      type: String,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-label {
  @extend %typo-body-sm;

  display: flex;
  align-items: center;
  color: var(--contrast-color);
  transition: var(--transition);
  cursor: text;

  &--invalid {
    color: var(--negative-color);
  }
}
</style>
