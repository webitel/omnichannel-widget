<template>
  <header class="wt-omni-widget-appointment-calendar-title">
    <span class="wt-omni-widget-appointment-calendar-title__text">
      {{ $t('appointment.calendar.title') }}
    </span>
    <div class="wt-omni-widget-appointment-calendar-title__time-zone">
      <img
        class="wt-omni-widget-appointment-calendar-title__time-zone-icon"
        src="../../../assets/appointment-time-zone.svg"
        alt="time zone icon"
      >
      <span class="wt-omni-widget-appointment-calendar-title__time-zone-text"
      >
        {{ timeZone }} {{ $t('appointment.calendar.timeZone') }}
      </span>
    </div>
  </header>
</template>

<script>

export default {
  name: 'wt-omni-widget-appointment-calendar-title',
  data: () => ({
  }),
  props: {
    timeZone: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-appointment-calendar-title {
    padding: var(--main-app-padding) 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: $breakpoint-md) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 44px;
      padding: 0;
      gap: var(--gap-md);
    }

    @media (max-width: $breakpoint-xxs) {
      margin-bottom: 0;
      padding: var(--main-app-padding) 0;
    }

    &__text {
      @extend %typo-heading-md;

      @media (max-width: $breakpoint-xxs) {
        max-height: 50%;
        gap: var(--gap-md);
      }
    }

    &__time-zone {
      @extend %typo-body-md;
      display: flex;
      align-items: center;
      gap: var(--gap-md);
    }

    &__time-zone-icon {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
