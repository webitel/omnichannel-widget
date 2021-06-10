<template>
  <section class="wt-omni-widget-window">
    <wt-omni-widget-header
      @close="$emit('close')"
    ></wt-omni-widget-header>
    <wt-omni-widget-content-wrapper>
      <component
        :is="`${type}-content`"
        :namespace="namespace"
      ></component>
    </wt-omni-widget-content-wrapper>
    <wt-omni-widget-footer-wrapper>
      <component
        :is="`${type}-footer`"
        :namespace="namespace"
      ></component>
    </wt-omni-widget-footer-wrapper>
  </section>
</template>

<script>
import ChatContent
  from '../../../modules/chat/components/wt-omni-widget-chat-content/wt-omni-widget-window-content.vue';
import ChatFooter from '../../../modules/chat/components/wt-omni-widget-chat-footer/wt-omni-widget-window-footer.vue';
import Type from '../../enum/Type.enum';
import WtOmniWidgetContentWrapper
  from './wt-omni-widget-window-content-wrapper/wt-omni-widget-window-content-wrapper.vue';
import WtOmniWidgetFooterWrapper from './wt-omni-widget-window-footer-wrapper/wt-omni-widget-window-footer-wrapper.vue';
import WtOmniWidgetHeader from './wt-omni-widget-window-header/wt-omni-widget-window-header.vue';

export default {
  name: 'wt-omni-widget-window',
  components: {
    WtOmniWidgetHeader,
    WtOmniWidgetContentWrapper,
    WtOmniWidgetFooterWrapper,

    ChatContent,
    ChatFooter,
  },
  data: () => ({
    type: Type.CHAT,
  }),
  computed: {
    namespace() {
      // we place namespacing in container file cause we should pass it to many components with same namespace: content, footer
      switch (this.type) {
        case Type.CHAT:
          return 'chat';
        default:
          return '';
      }
    },
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
  padding: 15px;
  border-radius: var(--border-radius--circular);
  box-shadow: var(--morf-style-font);
}

.wt-omni-widget-window-content-wrapper {
  flex-grow: 1;
  min-height: 0;
}
</style>
