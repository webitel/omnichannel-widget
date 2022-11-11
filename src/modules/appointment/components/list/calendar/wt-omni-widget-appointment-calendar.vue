<template>
  <article class="wt-omni-widget-appointment-calendar">
    <div class="wt-omni-widget-appointment-calendar__title">
      {{ $t('appointment.calendar.title') }}
    </div>
    <div class="wt-omni-widget-appointment-calendar__wrapper">
      <section
        v-for="({ date, times }) of calendar"
        :key="date"
        class="wt-omni-widget-appointment-calendar-date"
      >
        <header class="wt-omni-widget-appointment-calendar-date__title">
          {{ formattingDateTitle(date) }}
        </header>
        <div class="wt-omni-widget-appointment-calendar-date__main">
          <calendar-time-item
            v-for="({ time, reserved }) of times"
            :key="date.concat(time)"
            :previousValue="{ time: value.scheduleTime, date: value.scheduleDate }"
            :value="{ time, date, reserved }"
            @click="selectTime({ time, date })"
          ></calendar-time-item>
        </div>
      </section>
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
  }

  .wt-omni-widget-appointment-calendar-date {
    position: relative;
    flex: 1;
    height: fit-content;

    &__title {
      @extend %typo-heading-md;
      position: sticky;
      top: 0;
      right: 0;
      left: 0;
      padding: 24px $time-wrap-padding;
      text-align: center;
      text-transform: uppercase;
      background: var(--background-color);

      /*
        We use title:after border instead of simple title border because it
        has border radius, which will be overflown on its corners by main content side borders
      */
      &:after {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        left: 0;
        height: 100%;
        content: '';
        border-top: 1px solid var(--border-default-color);
        border-right: 1px solid var(--border-default-color);
        border-left: 1px solid var(--border-default-color);
        border-radius: var(--border-radius--square) var(--border-radius--square) 0 0;
      }
    }

    &__main {
      display: flex;
      flex-direction: column;
      padding: 0 $time-wrap-padding $time-wrap-padding;
      border-right: 1px solid var(--border-default-color);
      border-bottom: 1px solid var(--border-default-color);
      border-left: 1px solid var(--border-default-color);
      border-radius: var(--border-radius--square) var(--border-radius--square) 0 0;
      gap: var(--gap-md);
    }
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-appointment-calendar-date {
      &__title {
        &:after {
          border-radius: var(--border-radius--rounded) var(--border-radius--rounded) 0 0;
        }
      }

      &__main {
        border-radius: 0 0 var(--border-radius--rounded) var(--border-radius--rounded);
      }
    }
  }
}
</style>
