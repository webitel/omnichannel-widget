<template>
  <section class="wt-omni-widget-numpad">
    <wt-button
      v-for="(value) of ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']"
      :key="value"
      color="secondary"
      wide
      @click="$emit('input', value)"
    >{{ value }}
    </wt-button>
  </section>
</template>

<script>
export default {
  name: 'wt-omni-widget-numpad',
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-numpad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
    width: 280px;
  }
}
</style>
