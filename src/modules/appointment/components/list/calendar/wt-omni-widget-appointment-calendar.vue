<template>
  <article class="wt-omni-widget-appointment-calendar">
    <div class="wt-omni-widget-appointment-calendar__title">
      {{ $t('appointment.calendar.title') }}
    </div>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
      <calendar-date
        v-for="({ date, times }) of calendar"
        :key="date"
        :value="{ date, times }"
        :selected-value="{ date:value.scheduleDate, time:value.scheduleTime }"
        @select-time="selectTime"
      >
      </calendar-date>
    </div>
  </article>
</template>

<script>

import CalendarDate from './wt-omni-widget-appointment-calendar-date.vue';

export default {
  name: 'wt-omni-widget-appointment-calendar',
  components: {
    CalendarDate,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    calendar: {
      type: Array,
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
    flex: 1;
    color: var(--contrast-color);

    &__title {
      @extend %typo-heading-md;
      margin-bottom: var(--gap-md);
      padding: var(--main-app-padding);
    }

    &__wrapper {
      @extend %wt-scrollbar;
      display: flex;
      overflow-y: auto;
      justify-content: space-between;
      max-height: 402px;
      padding-right: var(--gap-md);
      gap: var(--gap-md);
    }
  }
}
</style>
