<template>
  <article class="wt-omni-widget-appointment-calendar">
    <calendar-title>
          {{ timeZone }}
    </calendar-title>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
      <calendar-date
        v-for="({ date, times }) of calendar"
        :key="date"
        :value="{ date, times }"
        :selected-value="{ date:value.scheduleDate, time:value.scheduleTime }"
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
    //display: flex;
    //flex-direction: column;
    //flex: 1;
    //gap: var(--gap-md);
    //color: var(--contrast-color);

    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 100%;
    width: 100%;

    &__wrapper {
      @extend %wt-scrollbar;
      justify-content: space-between;
      padding-right: var(--gap-md);
      gap: var(--gap-md);
      //overflow-y: auto;

      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      position: relative;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      overflow-y: scroll;
      padding-right: var(--spacing-2xs);

      @media (max-width: $breakpoint-xs) {
        height: 280px;
      }
    }
  }
}
</style>
