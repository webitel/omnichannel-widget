<template>
  <article class="wt-omni-widget-appointment-calendar">
    <calendar-title
      :visible-next="visibleNext"
      :visible-prev="visiblePrev"
    >
      {{ timeZone }}
    </calendar-title>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
      <flicking
        :cameraClass="''"
        :cameraTag="'div'"
        :options="{ circular: false, moveType: ['freeScroll', { stopAtEdge: true }], align: 0, bound: true }"
        :viewportTag="'section'"
        :plugins="plugins"
        @before-resize="beforeResize"
        @ready="visibilitySlideArrows"
        @changed="visibilitySlideArrows"
      >
        <calendar-date
          :class="[
            `wt-omni-widget-appointment-calendar-date--count-${calendar.length}`
          ]"
          v-for="({ date, times }) of calendar"
          :key="date"
          ref="date"
          :selected-value="{ date:value.scheduleDate, time:value.scheduleTime }"
          :value="{ date, times }"
          @select="selectTime"
        ></calendar-date>
      </flicking>
    </div>
  </article>
</template>

<script>

import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import { Flicking } from '@egjs/vue-flicking';
import CalendarDate from './date/wt-omni-widget-appointment-calendar-date.vue';
import CalendarTitle from './wt-omni-widget-appointment-calendar-title.vue';

export default {
  name: 'wt-omni-widget-appointment-calendar',
  components: {
    CalendarDate,
    CalendarTitle,
    Flicking,
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
    visiblePrev: true,
    visibleNext: true,
    visibleSlides: 3,
    breakpoints: {
      lg: 1024,
      md: 820,
      sm: 648,
    },
    plugins: [new Arrow({ parentEl: document.body })],
  }),
  mounted() {
    this.getMaxVisibleItems();
  },
  methods: {
    selectTime({
      date,
      time,
    }) {
      const value = {
        ...this.value,
        scheduleDate: date,
        scheduleTime: time,
      };
      this.$emit('input', value);
    },
    visibilitySlideArrows(event) {
      console.log(event.eventType, event);
      if (event.eventType === 'ready') {
        console.log('ready:', event);
        this.visiblePrev = false;
        this.visibleNext = this.calendar.length > this.visibleSlides;
      }
      if (event.eventType === 'changed') {
        console.log('changed:', event.index, event.index !== 0);
        this.visiblePrev = event.index !== 0;
        this.visibleNext = event.index + this.visibleSlides !== this.calendar.length;
      }
    },
    isCurrentBreakpoint(value) {
      return window.matchMedia(`(min-width: ${value}px)`).matches;
    },
    beforeResize(event) {
      console.log(event.eventType, event);
      this.getMaxVisibleItems();
    },
    getMaxVisibleItems() {
      console.log('maxVisibleItems:', this.isCurrentBreakpoint(this.breakpoints.lg), 'calendar:', this.calendar);
      // if (this.isCurrentBreakpoint(this.breakpoints.lg)) this.visibleSlides = this.calendar.length > 7 ? 7 : this.calendar.length;
      // if (this.isCurrentBreakpoint(this.breakpoints.md)) this.visibleSlides = this.calendar.length > 5 ? 5 : this.calendar.length;
      // this.visibleSlides = this.calendar.length > 3 ? 3 : this.calendar.length;
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-appointment-calendar {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    color: var(--contrast-color);
    gap: var(--gap-md);
    min-width: 0;

    &__wrapper {
      @extend %wt-scrollbar;
      position: relative;
      overflow-y: auto;
      padding-right: var(--gap-md);

      @media (max-width: $breakpoint-xs) {
        padding-right: 0;
      }
    }
    &::v-deep .flicking-viewport {
      //height: fit-content;
      @extend %wt-scrollbar;
      overflow-y: auto;
    }

    &::v-deep .flicking-camera {
      height: fit-content;
    }

    @media screen and (min-width: 1408px) {
      .flicking-camera > * {
        width: 25%;
      }
    }

    &::v-deep .wt-omni-widget-appointment-calendar-date {
      margin-right: var(--gap-md);

      &--count-1 {
        width: 100%;
      }

      &--count-2 {
        width: calc(50% - var(--gap-md));
      }

      &--count-3 {
        width: calc(100% / 3 - var(--gap-md));
      }

      &--count-4 {
        width: calc(100% / 4 - var(--gap-md));
      }

      &--count-5 {
        width: calc(100% / 5 - var(--gap-md));
      }

      &--count-6 {
        width: calc(100% / 6 - var(--gap-md));
      }

      &--count-7 {
        width: calc(100% / 7 - var(--gap-md));
      }
    }

    @media (max-width: $breakpoint-lg) {
      &::v-deep .wt-omni-widget-appointment-calendar-date {
        &--count-5,
        &--count-6,
        &--count-7 {
          width: calc(100% / 5 - var(--gap-md));
        }
      }
    }

    @media (max-width: $breakpoint-md) {
      &::v-deep .wt-omni-widget-appointment-calendar-date {
        &--count-3,
        &--count-4,
        &--count-5,
        &--count-6,
        &--count-7 {
          width: calc(100% / 3 - var(--gap-md));
        }
      }
    }
  }
}

</style>
