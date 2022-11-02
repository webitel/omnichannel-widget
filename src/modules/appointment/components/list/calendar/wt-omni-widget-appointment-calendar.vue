<template>
 <article class="wt-omni-widget-appointment-calendar">
   <div class="wt-omni-widget-appointment-calendar__title-wrap">
    <span class="wt-omni-widget-appointment-calendar__title">
      {{ $t('appointment.calendar.title') }}
    </span>
     <div class="wt-omni-widget-appointment-calendar__time-zone">
       <div class="wt-omni-widget-appointment-calendar__time-zone-icon">
         <img
           src="../../../assets/appointment-time-zone.svg"
           alt="time zone icon"
         >
       </div>
       <span class="title">
         {{ timeZone + ' Time Zone' }}
       </span>
     </div>
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
       >
       <div class="background"></div>
       <div class="title">
         {{ formattingDateTitle(date) }}
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
    timeZone: {
      type: String,
    },
    locates: {
      type: String,
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
      const options = { day: 'numeric', weekday: 'short' };
      const dateStr = currentDate.toLocaleDateString(this.locates || 'en-US', options).toString();
      const subStr1 = dateStr.substring(0, dateStr.indexOf(','||''||'.'));
      const subStr2 = dateStr.substring(dateStr.indexOf(','||''||'.') + 1, dateStr.length + 1);
      return Number(dateStr.substring(0, 1)) ?
        `${ subStr1 } ${ subStr2 }` :
        `${ subStr2 } ${ subStr1 }`
    },
    selectTime({ date, time }) {
      const value = {
        ...this.value,
        scheduleDate: date,
        scheduleTime: time,
      };
      this.$emit('input', value);
    },
    isTimeSelected({date, time}) {
      return this.value.scheduleDate === date && this.value.scheduleTime === time;
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
    display: flex;
    flex-direction: column;
    flex: 1;
    color: var(--contrast-color);
    @media (max-width: $breakpoint-xxs) {
      max-height: 50%;
      gap: 8px;
    }
    &__title-wrap {
      @extend %typo-body-md;
      min-height: 48px;
      margin-bottom: 16px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media (max-width: $breakpoint-md) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      @media (max-width: $breakpoint-xxs) {
        margin-bottom: 0;
        padding: 16px 0;
        gap: 8px;
      }
    }
    &__time-zone {
      display: flex;
      align-items: center;
      gap: 8px;
      &-icon {
        width: 16px;
        height: 16px;
      }
    }
    &__wrapper {
      @extend %wt-scrollbar;
      padding-right: 8px;
      display: flex;
      justify-content: space-between;
      gap: 8px;
      overflow-y: auto;
      @media (max-width: $breakpoint-xxs) {
        margin-left: 0;
        max-height: 284px;
      }
    }
    &__date {
      position: relative;
      flex: 1;
      height: fit-content;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius--square);
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
            width: calc(100% + 2px);
            border: 1px solid var(--border-color);
            border-radius: calc(var(--border-radius--square) + 1px) calc(var(--border-radius--square) + 1px) 0 0;
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
        padding: 14px 0;
        text-align: center;
        font-weight: 600;
        border-radius: var(--border-radius--rounded-btn);
        border: 2px solid var(--positive-light-color);
        user-select: none;
        cursor: pointer;
        &--reserved {
          background: var(--background-darker-color);
          border-color: var(--background-darker-color);
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
  &.wt-omni-widget--rounded {
    .wt-omni-widget-appointment-calendar {
      &__date {
        border-radius: var(--border-radius--rounded);
      }
    }
    .wt-omni-widget-appointment-calendar__date-title-wrapper {
      &--sticky {
        .title {
          border-radius: calc(var(--border-radius--rounded) + 1px) calc(var(--border-radius--rounded) + 1px) 0 0;
        }
      }
    }
  }
}
</style>
