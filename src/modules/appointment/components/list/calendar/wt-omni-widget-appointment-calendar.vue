<template>
  <article class="wt-omni-widget-appointment-calendar">
    <div class="wt-omni-widget-appointment-calendar__title">
      {{ $t('appointment.calendar.title') }}
    </div>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
      <div
        v-for="({ date, times }) of calendar"
        :key="date"
        class="wt-omni-widget-appointment-calendar__date"
      >
        <div class="wt-omni-widget-appointment-calendar__date-title">
          {{ formattingDateTitle(date) }}
        </div>
        <calendar-time-item
          v-for="({ time, reserved }) of times"
          :key="date.concat(time)"
          :selectedValue="{ time: value.scheduleTime, date: value.scheduleDate }"
          :value="{ time, date, reserved }"
          @click="selectTime({ time, date })"
        ></calendar-time-item>
      </div>
    </div>
  </article>
</template>

<script>
import CalendarTimeItem from './wt-omni-widget-appointment-calendar-time-item.vue';

export default {
  name: 'wt-omni-widget-appointment-calendar',
  components: {
    CalendarTimeItem,
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
    formattingDateTitle(currentDateForm) {
      const currentDate = new Date(currentDateForm);
      return `${currentDate.getUTCDate()} ${currentDate.toString().substring(0, 3)}`;
    },
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
  $time-wrap-padding: 10px;

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

    &__date {
      position: relative;
      flex: 1;
      flex-direction: column;
      height: fit-content;
      padding: 0 $time-wrap-padding $time-wrap-padding;
      border: 1px solid var(--border-default-color);
      border-radius: var(--border-radius--square);
      display: flex;
      gap: var(--gap-md);
    }

    &__date-title {
      @extend %typo-heading-md;
      position: sticky;
      top: 1px; // prvent layout shift
      right: 2px;
      left: 2px;
      padding: 24px 0;
      text-align: center;
      text-transform: uppercase;
      border-radius: calc(var(--border-radius--square) + 1px) var(--border-radius--square) 0 0; // FIXME
      background: var(--background-color);
    }
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-appointment-calendar {
      &__date {
        border-radius: var(--border-radius--rounded);
      }

      &__date-title-wrapper--sticky {
        .wt-omni-widget-appointment-calendar__date-title-text {
          border-radius: var(--border-radius--rounded) var(--border-radius--rounded) 0 0;
        }
      }
    }
  }
}
</style>
