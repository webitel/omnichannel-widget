<template>
 <article class="wt-omni-widget-appointment-calendar">
   <div class="wt-omni-widget-appointment-calendar__title">
     {{ $t('appointment.calendar.title') }}
   </div>
   <div
     class="wt-omni-widget-appointment-calendar__wrapper"
     ref="wrapper">
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
       ref="dateTitle">
       <div class="background"></div>
       <div class="title">
         {{ dateTitle(date) }}
       </div>
     </div>
     <div class="wt-omni-widget-appointment-calendar__time-wrapper">
       <div
         v-for="({ time, reserved }) of times"
         class="wt-omni-widget-appointment-calendar__time-item"
         :class="{
           'wt-omni-widget-appointment-calendar__time-item--reserved': reserved,
         'wt-omni-widget-appointment-calendar__time-item--selected': reserved ?
         '' : isTimeSelected({ date, time }) }"
         :key="date.concat(time)"
         @click="selectTime({ date, time })"
       >{{ time }}</div>
     </div>
   </div>
   </div>
 </article>
</template>

<script>

export default {
  name: 'wt-omni-widget-appointment-calendar',
  data: () => ({
    selectedTime: {},
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
    dateTitle(currentDateForm) {
      const currentDate = new Date(currentDateForm);
      return `${currentDate.getUTCDate()} ${currentDate.toString().substring(0,3)}`;
    },
    selectTime({ date, time }) {
      this.selectedTime = {
        date,
        time,
      };
      const value = {
        ...this.value,
        scheduleDate: date,
        scheduleTime: time,
      };
      this.$emit('input', value);
    },
    isTimeSelected({date, time}) {
      return this.selectedTime.date === date && this.selectedTime.time === time;
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
    width: -webkit-fill-available;
    color: var(--contrast-color);
    &__title {
      @extend %typo-body-md;
      margin-bottom: 16px;
      padding: 16px;
      font-weight: 600;
    }
    &__wrapper {
      @extend %wt-scrollbar;
      margin-left: 8px;
      padding-right: 8px;
      max-height: 402px;
      display: flex;
      justify-content: space-between;
      gap: 8px;
      overflow-y: auto;
    }
    &__date {
      position: relative;
      width: -webkit-fill-available;
      height: fit-content;
      gap: 8px;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius--rounded);
      &-title-wrapper {
        position: sticky;
        top: 0;
        left: -1px;
        .title {
          @extend %typo-body-md;
          position: relative;
          padding: 24px 0;
          text-align: center;
          font-weight: 600;
          text-transform: uppercase;
        }
        .background {
          position: absolute;
          left: -1px;
          width: calc(100% + 2px);
          height: 100%;
        }
        &--sticky {
          .title {
            left: -1px;
            width: 100%;
            border: 1px solid var(--border-color);
            border-radius: calc(var(--border-radius--rounded) + 1px) calc(var(--border-radius--rounded) + 1px) 0 0;
            border-bottom: none;
            background: var(--background-color);
          }
          .background {
            background: var(--background-color);
          }
        }
      }
    }
    &__time {
      &-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 0 8px 8px;
      }
      &-item {
        @extend %typo-body-md;
        max-height: 46px;
        height: 46px;
        padding: 16px 0;
        text-align: center;
        font-weight: 600;
        border-radius: var(--border-radius--rounded-btn);
        border: 2px solid var(--positive-light-color);
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        user-select: none;
        cursor: pointer;
        &--reserved {
          background: var(--background-darker-color);
          border: none;
          cursor: default;
          pointer-events: none;
        }
        &--selected {
          background: var(--positive-light-color);
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>
