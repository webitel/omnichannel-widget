<template>
  <article class="wt-omni-widget-appointment-calendar">
    <calendar-title
      @previous="handlePrevDate"
      @next="handleNextDate"
      >
      {{ timeZone }}
    </calendar-title>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
      {{ maxVisibleItems }}
      <calendar-date
        v-for="({ date, times }, index) of calendar"
        :key="date"
        :value="{ date, times }"
        :selected-value="{ date:value.scheduleDate, time:value.scheduleTime }"
        :hidden="isDateHidden(index)"
        @select="selectTime"
      ></calendar-date>
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
    firstVisibleItem: 0,
    step: 1, // how many date items should be changing
    visibleItems: 2, // how many date items can be visible
    breakpoints: {
      lg: 1024,
      md: 820,
      sm: 648,
    },
    popUpWidth: 0,
  }),
  mounted() {
    console.log(document.getElementsByClassName('wt-omni-widget-popup__popup')[0].getBoundingClientRect());
    window.addEventListener("resize", () => {
      this.popUpWidth = document.getElementsByClassName('wt-omni-widget-popup__popup')[0].clientWidth;
    });
  },
  computed: {
    maxVisibleItems() {
      const popup = document.getElementsByClassName('wt-omni-widget-popup__popup')[0];
      console.log('this.popUpWidth:', this.popUpWidth);
      // треба визначати ширину попапу та фіксувати її
      // треба відстежувати зміну розміру попапу
      switch (this.popUpWidth) {
        case this.breakpoints.lg: return 7;
        case this.breakpoints.md: return 5;
        case this.breakpoints.sm: return 3;
        default: return 3;
      }
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
    isDateHidden(index) {
      console.log('index', index, index < this.firstVisibleItem && index >= (this.firstVisibleItem + this.maxVisibleItems));
      return index < this.firstVisibleItem || index >= (this.firstVisibleItem + this.maxVisibleItems);
    },
    handlePrevDate() {
      if (this.firstVisibleItem > 0) this.firstVisibleItem -= this.step;
    },
    handleNextDate() {
      if (this.firstVisibleItem + this.maxVisibleItems < this.calendar.length) this.firstVisibleItem += this.step;
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
