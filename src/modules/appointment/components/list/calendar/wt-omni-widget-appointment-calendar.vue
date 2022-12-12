<template>
  <article class="wt-omni-widget-appointment-calendar">
    <calendar-title>
      {{ timeZone }}
    </calendar-title>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
      <flicking
        :options="{ circular: false, moveType: ['freeScroll', { stopAtEdge: true }], align: 0, bound: true }"
        :plugins="plugins"
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
    plugins: [new Arrow({ parentEl: document.body })],
  }),
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
    }
    &::v-deep .flicking-viewport {
      //height: fit-content;
      @extend %wt-scrollbar;
      overflow-y: auto;
      padding-right: var(--gap-md);

      @media (max-width: $breakpoint-xs) {
        padding-right: 0;
      }
    }

    &::v-deep .flicking-camera {
      height: fit-content;
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
