<template>
 <article>
   {{ value.scheduleDate }}
   {{ value.scheduleTime }}
   <div
     style="border: 1px solid red;"
     v-for="({ date, times }) of calendar"
     :key="date"
   >
     <div
       style="border: 1px solid blue;"
       v-for="(time) of times"
       :key="time"
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
};
</script>

<style lang="scss" scoped>

</style>
