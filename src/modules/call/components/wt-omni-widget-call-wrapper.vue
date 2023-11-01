<template>
  <fragment>
    <content-wrapper>
      <component
        :is="callView"
        :namespace="namespace"
      ></component>
    </content-wrapper>
    <footer-wrapper>
    </footer-wrapper>
  </fragment>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { Fragment } from 'vue-fragment';
import { mapState } from 'vuex';
import SessionState from '../enums/SessionState.enum';
import ContentWrapper
  from '../../../app/components/wt-omni-widget-window/wt-omni-widget-window-content-wrapper/wt-omni-widget-window-content-wrapper.vue';
import FooterWrapper
  from '../../../app/components/wt-omni-widget-window/wt-omni-widget-window-footer-wrapper/wt-omni-widget-window-footer-wrapper.vue';
import CallStart from './wt-omni-widget-call-start.vue';
import CallRinging from './wt-omni-widget-call-ringing.vue';
import CallActive from './wt-omni-widget-call-active.vue';

export default {
  name: 'wt-omni-widget-call-wrapper',
  components: {
    Fragment,
    ContentWrapper,
    FooterWrapper,
    CallStart,
    CallRinging,
    CallActive,
  },
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      sessionState(state) {
        return getNamespacedState(state, this.namespace).sessionState;
      },
    }),
    callView() {
      switch (this.sessionState) {
        case SessionState.RINGING:
          return 'call-ringing';
        case SessionState.ACTIVE:
          return 'call-active';
        default:
          return 'call-start';
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
