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
        :plugins="plugins"
        :viewportTag="'section'"
        @reach-edge="updateChange"
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
    updateChange(event) {
      if (event.direction === 'NEXT') this.visibleNext = false;
      if (event.direction === 'PREV') this.visiblePrev = false;
    },
  },
};
</script>

<style lang="scss">
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
  }

  .flicking-viewport {
    //height: fit-content;
    @extend %wt-scrollbar;
    overflow-y: auto;
  }

  .flicking-camera {
    height: fit-content;
  }

  @media screen and (max-width: 768px) {
    .flicking-camera > * {
      width: 100%;
    }
  }

  @media screen and (min-width: 1024px) {
    .flicking-camera > * {
      width: 50%;
    }
  }

  @media screen and (min-width: 1216px) {
    .flicking-camera > * {
      width: 33.3%;
    }
  }

  @media screen and (min-width: 1408px) {
    .flicking-camera > * {
      width: 25%;

    }
  }
}

</style>
