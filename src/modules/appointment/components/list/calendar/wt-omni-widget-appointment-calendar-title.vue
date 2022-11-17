<template>
  <header class="wt-omni-widget-appointment-calendar-title">
    <span class="wt-omni-widget-appointment-calendar-title__text">
      {{ $t('appointment.calendar.title') }}
    </span>
    <slot></slot>
  </header>
</template>

<script>

import WtIcon from './../../../../../app/webitel-ui/components/wt-icon/wt-icon';

export default {
  name: 'wt-omni-widget-appointment-calendar-title',
  components: {
   WtIcon,
  },
  data: () => ({
  }),
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-appointment-calendar-title {
    padding: var(--main-app-padding) 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: $breakpoint-sm) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5px;
      gap: var(--gap-md);
    }

    @media (max-width: $breakpoint-xs) {
      padding: var(--main-app-padding) 0;
    }

    &__text {
      @extend %typo-heading-md;
    }
  }
}
</style>
