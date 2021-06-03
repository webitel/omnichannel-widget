<template>
  <section class="wt-omni-widget-window">
    <wt-omni-widget-header></wt-omni-widget-header>
    <wt-omni-widget-content></wt-omni-widget-content>
    <wt-omni-widget-footer></wt-omni-widget-footer>
  </section>
</template>

<script>
import WtOmniWidgetHeader from './wt-omni-widget-window-header.vue';
import WtOmniWidgetContent from './wt-omni-widget-window-content.vue';
import WtOmniWidgetFooter from './wt-omni-widget-window-footer.vue';

export default {
  name: 'wt-omni-widget-window',
  components: {
    WtOmniWidgetHeader,
    WtOmniWidgetContent,
    WtOmniWidgetFooter,
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-window {
  width: 390px;
  height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  border: 1px solid red;
}

.wt-omni-widget-window-header {
  flex: 0 0 44px;
}

.wt-omni-widget-window-content {
  flex-grow: 1;
}

//.wt-omni-widget-window-footer {
//  flex: 0 0 44px;
//}
</style>
