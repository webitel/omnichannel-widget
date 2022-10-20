<template>
 <article class="wt-omni-widget-appointment-calendar">
   {{ value.scheduleDate }}
   {{ value.scheduleTime }}
   <div
     v-for="({ date, times }) of calendar"
     class="wt-omni-widget-appointment-calendar_date"
     :key="date"
   >
     <div class="wt-omni-widget-appointment-calendar_date-title">
       {{ date }}
     </div>
     <div
       v-for="({ time, reserved }) of times"
       class="wt-omni-widget-appointment-calendar_date-time-option"
       :key="date.concat(time)"
       @click="selectTime({ time })"
     >{{ time }}</div>
   </div>
 </article>
</template>

<script>
export default {
  name: 'wt-omni-widget-appointment-calendar',
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
  .wt-omni-widget-appointment-calendar {
    margin-left: 8px;
    width: -webkit-fill-available;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    overflow-y: auto;
    &_date {
      display: flex;
      flex-direction: column;
      width: inherit;
      padding: 8px;
      gap: 8px;
      border: 1px solid #E0E7EB;
      border-radius: 20px;
      &-title {
        padding: 16px 0;
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        line-height: 14px;
      }
      &-time-option {
        padding: 16px 0;
        text-align: center;
        background: #F2F2F2;
        font-size: 12px;
        font-weight: 600;
        line-height: 14px;
        border-radius: 30px;
        &_free {

        }
        &_selected {

        }
      }
    }
  }
}
</style>
