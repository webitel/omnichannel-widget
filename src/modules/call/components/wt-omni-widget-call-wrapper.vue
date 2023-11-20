<template>
<!--
why there's d: contents; and this weird wrapper?
 see  https://my.webitel.com/browse/WTEL-4027
-->
  <div style="display: contents;">
    <content-wrapper>
      <component
        :is="callView"
        :namespace="namespace"
      ></component>
    </content-wrapper>
    <footer-wrapper>
    </footer-wrapper>
  </div>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapState, mapActions } from 'vuex';
import SessionState from '../enums/SessionState.enum';
import ContentWrapper
  from '../../../app/components/wt-omni-widget-window/wt-omni-widget-window-content-wrapper/wt-omni-widget-window-content-wrapper.vue';
import FooterWrapper
  from '../../../app/components/wt-omni-widget-window/wt-omni-widget-window-footer-wrapper/wt-omni-widget-window-footer-wrapper.vue';
import CallStart from './wt-omni-widget-call-start.vue';
import CallRinging from './wt-omni-widget-call-ringing.vue';
import CallActive from './wt-omni-widget-call-active.vue';
import CallOffline from './wt-omni-widget-call-offline.vue';

export default {
  name: 'wt-omni-widget-call-wrapper',
  components: {
    ContentWrapper,
    FooterWrapper,
    CallStart,
    CallRinging,
    CallActive,
    CallOffline,
  },
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      offline: (state) => state.offline,
      sessionState(state) {
        return getNamespacedState(state, this.namespace).sessionState;
      },
    }),
    callView() {
      if (this.offline) {
        return 'call-offline';
      }

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
  methods: {
    ...mapActions({
      hangup(dispatch, payload) {
        return dispatch(`${this.namespace}/HANGUP`, payload);
      },
    }),
  },
  watch: {
    offline(value) {
      if (value && this.sessionState !== SessionState.IDLE) {
        this.hangup();
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
