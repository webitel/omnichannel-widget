<template>
  <header class="wt-omni-widget-appointment-calendar-date-title">
    <slot></slot>
  </header>
</template>

<script>

export default {
  name: 'wt-omni-widget-appointment-calendar-date-title',
  data: () => ({
  }),
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  $time-wrap-padding: 10px;

  .wt-omni-widget-appointment-calendar-date-title {
    @extend %typo-heading-md;
    position: sticky;
    top: 0;
    right: 0;
    left: 0;
    padding: 24px $time-wrap-padding;
    text-align: center;
    text-transform: uppercase;
    background: var(--background-color);

    /*
      We use title:after border instead of simple title border because it
      has border radius, which will be overflown on its corners by main content side borders
    */
    &:after {
      position: absolute;
      z-index: 1;
      top: 0;
      right: 0;
      left: 0;
      height: 100%;
      content: '';
      border-top: 1px solid var(--border-default-color);
      border-right: 1px solid var(--border-default-color);
      border-left: 1px solid var(--border-default-color);
      border-radius: var(--border-radius--square) var(--border-radius--square) 0 0;
    }
  }
  &.wt-omni-widget--rounded {
    .wt-omni-widget-appointment-calendar-date-title {
      &:after {
        border-radius: var(--border-radius--rounded) var(--border-radius--rounded) 0 0;
      }
    }
  }
}
</style>
