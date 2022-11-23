<template>
  <article class="wt-omni-widget-appointment-calendar">
    <calendar-title
    @previous="handlePrevDate"
    @next="handleNextDate"
    >
      {{ timeZone }}
    </calendar-title>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
      <calendar-date
        v-for="({ date, times }, index) of calendar"
        :key="date"
        :value="{ date, times }"
        :selected-value="{ date:value.scheduleDate, time:value.scheduleTime }"
        :hidden="isDateHidden(index)"
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
  data: () => ({
    carouselStart: 0,
    step: 1,
  }),
  computed: {
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
    isDateHidden(index) {
      const visibleItems = 2;
      console.log('index', index, index <= this.carouselStart && index >= (this.carouselStart + visibleItems));
      // if (this.calendar.length > visibleItems)
      return index <= this.carouselStart || index > (this.carouselStart + visibleItems);
    },
    handleNextDate() {
      this.carouselStart += this.step;
    },
    handlePrevDate() {
      this.carouselStart -= this.step;
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-appointment-calendar {
    flex-grow: 1;
    gap: var(--gap-md);
    color: var(--contrast-color);
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (max-width: $breakpoint-xs) {
      height: 50%;
    }

    &__wrapper {
      @extend %wt-scrollbar;
      position: relative;
      justify-content: space-between;
      padding-right: var(--gap-md);
      gap: var(--gap-md);
      flex-grow: 1;
      display: flex;
      overflow-y: auto;
    }
  }
}
</style>
