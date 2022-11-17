<template>
  <article class="wt-omni-widget-appointment-calendar">
    <calendar-title :time-zone="timeZone"
    ></calendar-title>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
      <calendar-date
        v-for="({ date, times }) of calendar"
        :key="date"
        :value="{ date, times }"
        :selected-value="{ date:value.scheduleDate, time:value.scheduleTime }"
        :locate="locate"
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
    locate: {
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

      //@media (max-width: $breakpoint-xs) {
      //  max-height: 280px;
      //}
    }
  }
}
</style>
