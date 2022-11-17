<template>
  <article class="wt-omni-widget-appointment-calendar">
    <calendar-title>
      <div class="wt-omni-widget-appointment-calendar__time-zone">
        <wt-icon icon="wt-omni-widget-time-zone" size="sm"></wt-icon>
        <span class="wt-omni-widget-appointment-calendar__time-zone-text">
          {{ timeZone }} {{ $t('appointment.calendar.timeZone') }}
        </span>
      </div>
    </calendar-title>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
      <calendar-date
        v-for="({ date, times }) of calendar"
        :key="date"
        :value="{ date, times }"
        :selected-value="{ date:value.scheduleDate, time:value.scheduleTime }"
        :locale="locale"
        @select="selectTime"
      >
      </calendar-date>
    </div>
  </article>
</template>

<script>

import CalendarTitle from './wt-omni-widget-appointment-calendar-title.vue';
import CalendarDate from './wt-omni-widget-appointment-calendar-date.vue';

export default {
  name: 'wt-omni-widget-appointment-calendar',
  components: {
    CalendarDate,
    CalendarTitle,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    calendar: {
      type: Array,
    },
    timeZone: {
      type: String,
    },
    locale: {
      type: String,
    },
  },
  methods: {
    selectTime({ date, time }) {
      const value = {
        ...this.value,
        scheduleDate: date,
        scheduleTime: time,
      };
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-appointment-calendar {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--gap-md);
    color: var(--contrast-color);

    &__wrapper {
      @extend %wt-scrollbar;
      display: flex;
      justify-content: space-between;
      padding-right: var(--gap-md);
      gap: var(--gap-md);
      overflow-y: auto;

      @media (max-width: $breakpoint-xs) {
        max-height: 280px;
      }
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
