<template>
  <header class="wt-omni-widget-appointment-calendar-title">
    <div class="wt-omni-widget-appointment-calendar-title__button-wrapper">
<!--      https://naver.github.io/egjs-flicking/Plugins#options-3-->
      <wt-icon-btn
        class="flicking-arrow-prev is-outside flicking-arrow-disabled"
        icon="arrow-left"
        icon-size="sm"
        size="md"
      ></wt-icon-btn>
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
    <div class="wt-omni-widget-appointment-calendar-title__button-wrapper">
      <!--      https://naver.github.io/egjs-flicking/Plugins#options-3-->
      <wt-icon-btn
        class="flicking-arrow-next is-outside flicking-arrow-disabled"
        icon="arrow-right"
        icon-size="sm"
        size="md"
      ></wt-icon-btn>
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
    display: grid;
    grid-template-columns: 32px 1fr 32px;
    grid-auto-rows: 44px;
    justify-self: center;

    @media (max-width: $breakpoint-xs) {
      grid-auto-rows: 70px;
    }

    &__wrapper {
      display: flex;
      justify-content: space-around;
      align-items: center;

      @media (max-width: $breakpoint-md) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
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

    &__button-wrapper {
      align-self: center;
      justify-self: center;
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

  // https://naver.github.io/egjs-flicking/Plugins#options-3
  .flicking-arrow-disabled {
    display: none;
  }
}
</style>
