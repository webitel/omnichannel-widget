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
       !isDateTitleInDefaultPosition }"
       >
       <div class="wt-omni-widget-appointment-calendar__date-title-background"></div>
       <div class="wt-omni-widget-appointment-calendar__date-title-text">
         {{ formattingDateTitle(date) }}
       </div>
     </div>
     <div class="wt-omni-widget-appointment-calendar__time-wrapper">
       <calendar-time-item
         v-for="({ time, reserved }) of times"
         :key="date.concat(time)"
         :time="time"
         :reserved="reserved"
         :selected="isTimeSelected({ date, time, reserved })"
         @click="selectTime({ date, time })"
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
    isTimeSelected({ date, time, reserved }) {
      return reserved ? false : this.value.scheduleDate === date && this.value.scheduleTime === time;
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
  .wt-omni-widget-appointment-calendar {
    flex: 1;
    color: var(--contrast-color);
    &__title {
      @extend %typo-body-md;
      margin-bottom: var(--app-gap-md);
      padding: var(--main-app-padding);
      font-weight: 600;
    }
    &__wrapper {
      @extend %wt-scrollbar;
      padding-right: var(--app-gap-md);
      max-height: 402px;
      display: flex;
      justify-content: space-between;
      gap: var(--app-gap-md);
      overflow-y: auto;
    }
    &__date {
      position: relative;
      flex: 1;
      height: fit-content;
      border: 1px solid var(--border-default-color);
      border-radius: var(--border-radius--square);
      &-title {
        &-wrapper {
          position: sticky;
          top: 0;
          left: -1px;
          &--sticky {
            .wt-omni-widget-appointment-calendar__date-title {
              &-text {
                left: -1px;
                width: calc(100% + 2px);
                background: var(--background-color);
                border: 1px solid var(--border-default-color);
                border-radius: calc(var(--border-radius--square) + 1px) calc(var(--border-radius--square) + 1px) 0 0;
                border-bottom: none;
              }
              &-background {
                background: var(--background-color);
              }
            }
          }
        }
        &-text {
          @extend %typo-body-md;
          position: relative;
          padding: 24px 0;
          text-align: center;
          font-weight: 600;
          text-transform: uppercase;
        }
        &-background {
          position: absolute;
          left: -1px;
          width: calc(100% + 2px);
          height: 100%;
        }
      }
    }
    &__time-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--app-gap-md);
      padding: 0 var(--appointment-time-wrap-padding) var(--appointment-time-wrap-padding);
    }
  }
  &.wt-omni-widget--rounded {
    .wt-omni-widget-appointment-calendar {
      &__date {
        border-radius: var(--border-radius--rounded);
      }
    }
    .wt-omni-widget-appointment-calendar__date-title-wrapper {
      &--sticky {
        .wt-omni-widget-appointment-calendar__date-title-text {
          border-radius: calc(var(--border-radius--rounded) + 1px) calc(var(--border-radius--rounded) + 1px) 0 0;
        }
      }
    }
  }
}
</style>
