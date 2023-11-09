<template>
  <section class="wt-omni-widget-call-offline">
    <wt-icon
      color="error"
      icon="attention"
      icon-prefix="wt-omni-widget"
    ></wt-icon>
    <call-title-wrapper>
      unlucky
      <template #description>
        unlucky x2
      </template>
    </call-title-wrapper>
  </section>
</template>

<script>
import CallTitleWrapper from './utils/wt-omni-widget-call-title-wrapper.vue';

export default {
  name: 'wt-omni-widget-call-offline',
  components: { CallTitleWrapper },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-call-offline {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    gap: 32px;
  }
}
</style>
