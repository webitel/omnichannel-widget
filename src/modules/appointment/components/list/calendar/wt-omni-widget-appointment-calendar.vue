<template>
 <article class="wt-omni-widget-appointment-calendar">
   <div class="wt-omni-widget-appointment-calendar__title">
     {{ $t('appointment.calendar.title') }}
   </div>
   <div class="wt-omni-widget-appointment-calendar__wrapper">
   <div
     v-for="({ date, times }) of calendar"
     class="wt-omni-widget-appointment-calendar__date"
     :key="date"
   >
     <div class="wt-omni-widget-appointment-calendar__date-title">
       {{ date }}
     </div>
     <div
       v-for="({ time, reserved }) of times"
       class="wt-omni-widget-appointment-calendar__time"
       :class="{ reserved: reserved, selected: reserved ? '' : isTimeSelected({date, time}) }"
       :key="date.concat(time)"
       @click="selectTime({date, time, reserved})"
     >{{ time }}</div>
   </div>
   </div>
 </article>
</template>

<script>

export default {
  name: 'wt-omni-widget-appointment-calendar',
  data () {
    return {
      selectedTime: {},
      daysOfWeek: []
    };
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
    selectTime({ date, time, reserved }) {
      if (reserved) return;
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
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-appointment-calendar {
    width: -webkit-fill-available;
    color: var(--contrast-color);
    &__title {
      margin-bottom: var(--main-app-padding);
      padding: var(--main-app-padding);
      font-size: 12px;
      font-weight: 600;
      line-height: 14px;
    }
    &__wrapper {
      @extend %wt-scrollbar;
      margin-left: 8px;
      max-height: 402px;
      display: flex;
      justify-content: space-between;
      gap: 8px;
      overflow-y: auto;
    }
    &__date {
      display: flex;
      flex-direction: column;
      width: -webkit-fill-available;
      height: fit-content;
      padding: 8px;
      gap: 8px;
      border: 1px solid #E0E7EB;
      border-radius: var(--border-radius--rounded);
      &-title {
        padding: var(--main-app-padding) 0;
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        line-height: 14px;
      }
    }
    &__time {
      max-height: 46px;
      max-width: 220px;
      height: 46px;
      padding: var(--main-app-padding) 0;
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      line-height: 14px;
      border-radius: 30px;
      border: 2px solid #68CC66;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      user-select: none;
      cursor: pointer;
    }
    .reserved {
      background: #F2F2F2;
      border: none;
      cursor: default;
    }
    .selected {
      background: #68CC66;
      color: white;
    }
  }
}
</style>
