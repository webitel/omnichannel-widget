<template>
  <div
    class="wt-omni-widget-appointment-calendar-time-item"
    :class="{
           'wt-omni-widget-appointment-calendar-time-item--reserved': value.reserved,
           'wt-omni-widget-appointment-calendar-time-item--selected': isTimeSelected
  }"
    @click="$emit('click');"
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
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  $time-padding: 15px;
  $free-time-color: hsla(119, 50%, 60%, 1);
  $reserved-time-color: hsla(0, 0%, 95%, 1);
  $hover-time-color: hsla(119, 50%, 70%, 1);
  $selected-time-text-color: hsla(0, 0%, 100%, 1);

  .wt-omni-widget-appointment-calendar-time-item {
    @extend %typo-heading-md;
    padding: $time-padding;
    text-align: center;
    border-radius: var(--border-radius--square);
    border: 2px solid $free-time-color;
    user-select: none;
    cursor: pointer;
    transition: var(--transition);
    &--reserved {
      background: $reserved-time-color;
      border-color: $reserved-time-color;
      cursor: default;
      pointer-events: none;
    }
    &--selected {
      background: $free-time-color;
      color: $selected-time-text-color;
    }
    &:hover {
      background: $hover-time-color;
      border-color: $hover-time-color;
      color: $selected-time-text-color;
    }
  }
  &.wt-omni-widget--rounded {
    .wt-omni-widget-appointment-calendar-time-item {
      border-radius: var(--border-radius--rounded-btn);
    }
  }
}
</style>
