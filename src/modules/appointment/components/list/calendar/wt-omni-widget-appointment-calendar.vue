<template>
 <article class="wt-omni-widget-appointment-calendar">
   {{ value.scheduleDate }}
   {{ value.scheduleTime }}
   <div
     style="border: 1px solid red;"
     v-for="({ date, times }) of calendar"
     :key="date"
   >
     <div
       style="border: 1px solid blue;"
       v-for="({ time, reserved }) of times"
       :key="date.concat(time)"
       @click="selectTime({ time, date })"
     >{{ time }}, reserved: {{ reserved }}</div>
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
    max-height: 410px; //temporary parameter
    margin-left: 8px;
  }
}
</style>
