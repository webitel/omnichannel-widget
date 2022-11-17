<template>
  <section
    class="wt-omni-widget-appointment-calendar-date"
  >
    <calendar-date-title>
      {{ formattingDateTitle }}
    </calendar-date-title>
    <div class="wt-omni-widget-appointment-calendar-date__main">
      <calendar-time-item
        v-for="item of value.times"
        :key="value.date.concat(item.time)"
        :value="item"
        :date="value.date"
        :selected-value="{ time: selectedValue.time, date: selectedValue.date }"
        @click="$emit('select', { date: value.date, time: item.time })"
      ></calendar-time-item>
    </div>
  </section>
</template>

<script>

import CalendarTimeItem from './wt-omni-widget-appointment-calendar-time-item.vue';
import CalendarDateTitle from './wt-omni-widget-appointment-calendar-date-title.vue';

export default {
  name: 'wt-omni-widget-appointment-calendar-date',
  components: {
    CalendarTimeItem,
    CalendarDateTitle,
  },
  data: () => ({
  }),
  props: {
    value: {
      type: Object,
      required: true,
    },
    selectedValue: {
      type: Object,
      required: true,
    },
    locale: {
      type: String,
      default: '',
    },
  },
  computed: {
    formattingDateTitle() {
      const currentDate = new Date(this.value.date);
      const dateStr = currentDate.toLocaleDateString(
        this.locale || 'en-US', { day: 'numeric', weekday: 'short' }
        ).toString(); //formatting date from DB in form '18 Fri' (Day of month + Weekday), using available locate
      if (Number(dateStr.substring(0, 1))) return dateStr; // return result if day of month goes first
      const subStr1 = dateStr.substring(0, dateStr.indexOf(',' || '' || '.'));
      const subStr2 = dateStr.substring(dateStr.indexOf(',' || '' || '.') + 1, dateStr.length + 1);
      return `${subStr2} ${subStr1}`; // if weekday goes first - switch 2 parts of string and return
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  $time-wrap-padding: 10px;

  .wt-omni-widget-appointment-calendar-date {
    position: relative;
    flex: 1;
    height: fit-content;

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
      &__main {
        border-radius: 0 0 var(--border-radius--rounded) var(--border-radius--rounded);
      }
    }
  }
}
</style>
