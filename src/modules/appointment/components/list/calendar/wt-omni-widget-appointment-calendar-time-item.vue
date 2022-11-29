<template>
  <div
    class="wt-omni-widget-appointment-calendar-time-item"
    :class="{
           'wt-omni-widget-appointment-calendar-time-item--reserved': value.reserved,
           'wt-omni-widget-appointment-calendar-time-item--selected': isSelected
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
    date: {
      type: String,
      required: true,
    },
    selectedValue: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isSelected() {
      return this.value.reserved
        ? false
        : this.selectedValue.date === this.date && this.selectedValue.time === this.value.time;
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  $time-padding: 15px;
  $free-time-color: hsla(119, 50%, 60%, 1);
  $reserved-time-color: hsla(0, 0%, 95%, 1);
  $time-hover-color: hsla(119, 50%, 70%, 1);
  $selected-time-text-color: hsla(0, 0%, 100%, 1);
  $time-border-width: 2px;

  .wt-omni-widget-appointment-calendar-time-item {
    @extend %typo-heading-md;
    padding: calc($time-padding - $time-border-width);
    cursor: pointer;
    user-select: none;
    transition: var(--transition);
    text-align: center;
    border: $time-border-width solid $free-time-color;
    border-radius: var(--border-radius--square);

    &--reserved {
      cursor: default;
      pointer-events: none;
      border-color: $reserved-time-color;
      background: $reserved-time-color;
    }

    &--selected {
      color: $selected-time-text-color;
      background: $free-time-color;
    }

    &:hover {
      color: $selected-time-text-color;
      border-color: $time-hover-color;
      background: $time-hover-color;
    }
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-appointment-calendar-time-item {
      border-radius: var(--border-radius--rounded-btn);
    }
  }
}
</style>
