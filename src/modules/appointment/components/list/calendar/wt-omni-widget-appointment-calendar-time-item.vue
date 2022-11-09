<template>
  <div
    class="wt-omni-widget-appointment-calendar-time-item"
    :class="{
           'wt-omni-widget-appointment-calendar-time-item--reserved': reserved,
           'wt-omni-widget-appointment-calendar-time-item--selected': selected }"
    v-on:click="clickHandler"
  >{{ time }}</div>
</template>

<script>

export default {
  name: 'wt-omni-widget-appointment-calendar-time-item',
  data: () => ({
  }),
  props: {
    time: {
      type: String,
      default: '',
      required: true,
    },
    reserved: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
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
  .wt-omni-widget-appointment-calendar-time-item {
    @extend %typo-strong-md;
    padding: var(--main-app-padding) 0;
    text-align: center;
    border-radius: var(--border-radius--rounded-xl);
    border: 2px solid var(--color-free-day);
    user-select: none;
    cursor: pointer;
    transition: var(--transition);
    &--reserved {
      background: var(--color-reserved-day);
      border-color: var(--color-reserved-day);
      cursor: default;
      pointer-events: none;
    }
    &--selected {
      background: var(--color-free-day);
      color: #FFFFFF;
    }
    &:hover {
      color: #FFFFFF;
      background: var(--color-free-day-hover);
      border-color: var(--color-free-day-hover);
    }
  }
}
</style>
