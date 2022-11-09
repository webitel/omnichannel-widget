<template>
  <div
    class="wt-omni-widget-appointment-calendar-time-item"
    :class="{
           'wt-omni-widget-appointment-calendar-time-item--reserved': value.reserved,
           'wt-omni-widget-appointment-calendar-time-item--selected': isTimeSelected }"
    v-on:click="clickHandler"
  >{{ value.time }}</div>
</template>

<script>

export default {
  name: 'wt-omni-widget-appointment-calendar-time-item',
  data: () => ({
  }),
  props: {
    value: {
      type: Object,
      required: true,
    },
    previousValue: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isTimeSelected() {
      return this.value.reserved
        ? false
        : this.previousValue.date === this.value.date && this.previousValue.time === this.value.time;
    },
  },
  methods: {
    clickHandler() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  $time-padding: 15px;
  $free-day-color: hsla(119, 50%, 60%, 1);
  $reserved-day-color: hsla(0, 0%, 95%, 1);
  $hover-day-color: hsla(119, 50%, 70%, 1);

  .wt-omni-widget-appointment-calendar-time-item {
    @extend %typo-heading-md;
    padding: $time-padding;
    text-align: center;
    border-radius: 100px;
    border: 2px solid $free-day-color;
    user-select: none;
    cursor: pointer;
    transition: var(--transition);
    &--reserved {
      background: $reserved-day-color;
      border-color: $reserved-day-color;
      cursor: default;
      pointer-events: none;
    }
    &--selected {
      background: $free-day-color;
      color: #FFFFFF;
    }
    &:hover {
      background: $hover-day-color;
      border-color: $hover-day-color;
      color: #FFFFFF;
    }
  }
}
</style>
