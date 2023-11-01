<template>
  <article class="wt-omni-widget-call-title-wrapper">
    <p class="wt-omni-widget-call-title-wrapper__title">
      <slot></slot>
    </p>
    <p class="wt-omni-widget-call-title-wrapper__description">
      <slot name="description"></slot>
    </p>
  </article>
</template>

<script>
export default {
  name: 'wt-omni-widget-call-title-wrapper',
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-call-title-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    &__title {
      @extend %typo-heading-lg;
      text-align: center;
    }

    &__description {
      @extend %typo-body-sm;
      text-align: center;
    }
  }
}
</style>
