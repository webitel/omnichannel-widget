<template>
 <article class="wt-omni-widget-appointment-calendar">
   <div class="wt-omni-widget-appointment-calendar__title">
     {{ $t('appointment.calendar.title') }}
   </div>
   <div
     class="wt-omni-widget-appointment-calendar__wrapper"
     ref="wrapper"
   >
   <div
     v-for="({ date, times }) of calendar"
     ref="date"
     class="wt-omni-widget-appointment-calendar__date"
     :key="date"
   >
     <div
       class="wt-omni-widget-appointment-calendar__date-title-wrapper"
       :class="{ 'wt-omni-widget-appointment-calendar__date-title-wrapper--sticky':
       !isDateTitleInDefaultPosition
     }">
       <div class="wt-omni-widget-appointment-calendar__date-title-background"></div>
       <div class="wt-omni-widget-appointment-calendar__date-title-text">
         {{ formattingDateTitle(date) }}
       </div>
     </div>
     <div class="wt-omni-widget-appointment-calendar__time-wrapper">
       <calendar-time-item
         v-for="({ time, reserved }) of times"
         :key="date.concat(time)"
         :value="{ time, date, reserved }"
         :selectedValue="{ time: value.scheduleTime, date: value.scheduleDate }"
         @click="selectTime({ time, date })"
       ></calendar-time-item>
     </div>
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
  data: () => ({
    isDateTitleInDefaultPosition: true,
  }),
  props: {
    value: {
      type: Object,
      required: true,
    },
    calendar: {
      type: Array,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.wrapper.addEventListener('scroll', this.handleDateTitlePositionChange);
    });
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
    handleDateTitlePositionChange() {
      const blockTopPosition = this.$refs.wrapper.getBoundingClientRect().top;
      const dateTopPosition = this.$refs.date[0].getBoundingClientRect().top;
      this.isDateTitleInDefaultPosition = blockTopPosition === dateTopPosition;
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
      padding-right: var(--gap-md);
      max-height: 402px;
      display: flex;
      justify-content: space-between;
      gap: var(--gap-md);
      overflow-y: auto;
    }
    &__date {
      position: relative;
      flex: 1;
      height: fit-content;
      border: 1px solid var(--border-default-color);
      border-radius: var(--border-radius--square);
    }
    &__date-title-wrapper {
      position: sticky;
      top: 0;
      left: -1px;
      &--sticky {
        .wt-omni-widget-appointment-calendar {
          &__date-title-wrapper {
            background: var(--background-color);
            border: 1px solid var(--border-default-color);
            border-bottom: none;
          }
          &__date-title-text {
            background: var(--background-color);
            border: 1px solid var(--border-default-color);
            border-bottom: none;
          }
          &__date-title-background {
            background: var(--background-color);
          }
        }
      }
    }
    &__date-title-text {
      @extend %typo-heading-md;
      position: relative;
      //left: -1px;
      //width: calc(100% + 2px);
      padding: 24px 0;
      text-align: center;
      text-transform: uppercase;
    }
    &__date-title-background {
      position: absolute;
      left: -1px;
      width: calc(100% + 2px);
      height: 100%;
    }
    &__time-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--gap-md);
      padding: 0 $time-wrap-padding $time-wrap-padding;
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
