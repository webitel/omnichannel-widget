<template>
    <section class="wt-omni-widget-appointment-calendar-date">
      <calendar-date-title>
        {{ $d( new Date(value.date), 'appointments', localeDateKey) }}
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

import CalendarTimeItem from '../time/wt-omni-widget-appointment-calendar-time-item.vue';
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
  },
  computed: {
    localeDateKey() {
      if (this.$i18n.locale === 'ua') return 'uk';
      return this.$i18n.locale;
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  $time-wrap-padding: 10px;

  .wt-omni-widget-appointment-calendar-date {
    position: relative;

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
