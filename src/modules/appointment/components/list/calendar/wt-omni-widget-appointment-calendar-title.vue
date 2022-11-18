<template>
  <header class="wt-omni-widget-appointment-calendar-title">
    <span class="wt-omni-widget-appointment-calendar-title__text">
      {{ $t('appointment.calendar.title') }}
    </span>
    <div class="wt-omni-widget-appointment-calendar-title__time-zone">
      <wt-icon icon="wt-omni-widget-time-zone" size="sm"></wt-icon>
      <span class="wt-omni-widget-appointment-calendar-title__time-zone-text">
          <slot></slot> {{ $t('appointment.calendar.timeZone') }}
        </span>
    </div>
  </header>
</template>

<script>

export default {
  name: 'wt-omni-widget-appointment-calendar-title',
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

    &__time-zone {
      @extend %typo-body-md;
      display: flex;
      align-items: center;
      gap: var(--gap-md);
    }
  }
}
</style>
