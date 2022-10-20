<template>
  <label
    :class="{
      'wt-label--invalid': invalid,
    }"
    :for="this.for"
    class="wt-label"
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
#wt-omni-widget {
  .wt-label {
    @extend %typo-body-sm;

    display: flex;
    align-items: center;
    cursor: text;
    transition: var(--transition);
    color: var(--contrast-color);

    &--invalid {
      color: var(--negative-color);
    }
  }
}
</style>
