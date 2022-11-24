<template>
  <section
    class="wt-omni-widget-appointment-calendar-date"
    :class="{
    'wt-omni-widget-appointment-calendar-date--hidden': hidden,
    }"
  >
    <calendar-date-title>
      {{ $d(new Date(value.date), 'appointments') }}
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
    hidden: {
      type: Boolean,
      default: false,
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
    visibility: visible;
    transition: var(--transition);

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

    &--hidden {
      display: none;
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
