<template>
  <header class="wt-omni-widget-appointment-calendar-title">
    <div
      class="wt-omni-widget-appointment-calendar-title__button-previous"
      @click="$emit('previous')"
    >
      <wt-icon icon="wt-omni-widget-arrow-left" size="sm"></wt-icon>
    </div>
    <div class="wt-omni-widget-appointment-calendar-title__wrapper">
      <span class="wt-omni-widget-appointment-calendar-title__text">
        {{ $t('appointment.calendar.title') }}
      </span>
      <div class="wt-omni-widget-appointment-calendar-title__time-zone">
        <wt-icon icon="wt-omni-widget-time-zone" size="sm"></wt-icon>
        <span class="wt-omni-widget-appointment-calendar-title__time-zone-text">
            <slot></slot> {{ $t('appointment.calendar.timeZone') }}
          </span>
      </div>
    </div>
    <div
      class="wt-omni-widget-appointment-calendar-title__button-next"
      @click="$emit('next')"
    >
      <wt-icon icon="wt-omni-widget-arrow-right" size="sm"></wt-icon>
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

    @media (max-width: $breakpoint-xs) {
      padding: var(--main-app-padding) 0;
    }

    &__wrapper {
      display: flex;
      justify-content: space-around;
      flex-grow: 1;

      @media (max-width: $breakpoint-md) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5px;
        gap: var(--gap-md);
      }
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

    &__button-previous,
    &__button-next {
      display: flex;
      padding: 10px;
      background: var(--icon-contrast-color);
      border-radius: var(--border-radius--square);
      cursor: pointer;
    }
  }
  &.wt-omni-widget--rounded {
    .wt-omni-widget-appointment-calendar-title {
      &__button-previous,
      &__button-next {
        border-radius: var(--border-radius--rounded);
      }
    }
  }
}
</style>
