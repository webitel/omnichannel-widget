<template>
  <section class="wt-omni-widget-window">
    <portal-target name="in-window-popup"></portal-target>
    <wt-omni-widget-header
      @close="$emit('close')"
    ></wt-omni-widget-header>
    <component
      :is="`${channel}-wrapper`"
      :namespace="namespace"
    ></component>
  </section>
</template>

<script>
import ChatWrapper from '../../../modules/chat/components/wt-omni-widget-chat-wrapper.vue';
import CallWrapper from '../../../modules/call/components/wt-omni-widget-call-wrapper.vue';
import WidgetChannel from '../../enums/WidgetChannel.enum';
import WtOmniWidgetHeader from './wt-omni-widget-window-header/wt-omni-widget-window-header.vue';

export default {
  name: 'wt-omni-widget-window',
  components: {
    WtOmniWidgetHeader,
    ChatWrapper,
    CallWrapper,
  },
  props: {
    channel: {
      type: String, // WidgetChannel.enum
      required: true,
    },
  },
  computed: {
    namespace() {
      switch (this.channel) {
        case WidgetChannel.CHAT:
          return 'chat';
        case WidgetChannel.CALL:
          return 'call';
        default:
          throw new Error(`Unknown channel: ${this.channel}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-window {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    width: calc(100vw - var(--chat-offset) * 2);
    max-width: 390px;
    height: calc(100vh - var(--chat-offset) * 2);
    max-height: 560px;
    padding: var(--main-app-padding);
    border-radius: var(--border-radius--square);
    background: var(--background-color);
    box-shadow: var(--morf-style-font);

    ::v-deep .wt-omni-widget-window-content-wrapper {
      flex-grow: 1;
      min-height: 0;
      margin-bottom: 10px;
    }
  }

  .wt-omni-widget-window-header {
    margin-bottom: 10px;
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-window {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
