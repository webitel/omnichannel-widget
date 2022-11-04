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
    @extend %typo-body-md;
    padding: var(--main-app-padding) 0;
    text-align: center;
    font-weight: 600;
    border-radius: 30px;
    border: 2px solid var(--color-free-day);
    user-select: none;
    cursor: pointer;
    &--reserved {
      background: var(--color-resered-day);
      border: none;
      cursor: default;
      pointer-events: none;
    }
    &--selected {
      background: var(--color-free-day);
      color: #FFFFFF;
    }
  }
}
</style>
