<template>
  <div class="wt-omni-widget-progress-bar">
    <div
      class="wt-omni-widget-progress-bar__progress"
      :style="{ width: progressWidth }"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  computed: {
    progressWidth() {
      let width = (this.value / (this.max - this.min)) * 100;
      if (width >= 100) width = 100;
      return `${width}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget .wt-omni-widget-progress-bar {

  box-sizing: border-box;
  width: 100%;
  height: 10px;
  background: var(--progress-bar-bg-color);
  border: 2px solid var(--main-color);
  border-radius: 50px;

  &__progress {
    height: 6px;
    background: var(--wt-omni-widget__accent-color);
    border-radius: 20px;
    will-change: width;
    transition: var(--transition);
  }
}
</style>
