<template>
  <fragment>
    <content-wrapper>
      <component
        :is="callView"
        :namespace="namespace"
      ></component>
<!--      <div>State: {{ sessionState }}</div>-->
<!--      <div>Duration: {{ sessionDuration }}</div>-->
<!--      <div>Mute: {{ sessionMute }}</div>-->
<!--      <div>Hold: {{ sessionHold }}</div>-->
<!--      <div>DTMF: {{ sessionDTMF }}</div>-->
<!--      <wt-button @click="makeCall">call</wt-button>-->
<!--      <wt-button @click="hangup">hangup</wt-button>-->
<!--      <wt-button @click="toggleMute">toggle mute</wt-button>-->
<!--      <wt-button @click="toggleHold">toggle hold</wt-button>-->
<!--      <input-->
<!--          :value="sessionDTMF"-->
<!--          type="text"-->
<!--          @input="sendDTMF($event.target.value)"-->
<!--      >-->
    </content-wrapper>
    <footer-wrapper>
    </footer-wrapper>
  </fragment>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { Fragment } from 'vue-fragment';
import { mapActions, mapState } from 'vuex';
import SessionState from '../enums/SessionState.enum';
import ContentWrapper
  from '../../../app/components/wt-omni-widget-window/wt-omni-widget-window-content-wrapper/wt-omni-widget-window-content-wrapper.vue';
import FooterWrapper
  from '../../../app/components/wt-omni-widget-window/wt-omni-widget-window-footer-wrapper/wt-omni-widget-window-footer-wrapper.vue';
import CallStart from './wt-omni-widget-call-start.vue';
import CallActive from './wt-omni-widget-call-active.vue';

export default {
  name: 'wt-omni-widget-call-wrapper',
  components: {
    Fragment,
    ContentWrapper,
    FooterWrapper,
    CallStart,
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
      sessionMute(state) {
        return getNamespacedState(state, this.namespace).sessionMute;
      },
      sessionDTMF(state) {
        return getNamespacedState(state, this.namespace).sessionDTMF;
      },
    }),
    callView() {
      switch (this.sessionState) {
        case SessionState.RINGING:
          return 'call-ringing';
        case SessionState.ACTIVE:
          return 'call-active';
        default:
          return 'call-active';
      }
    },
    sessionDuration() {
      return this.$store.getters[`${this.namespace}/SESSION_DURATION`];
    },
    sessionHold() {
      return this.$store.getters[`${this.namespace}/SESSION_HOLD`];
    },
  },
  methods: {
    ...mapActions({
      makeCall(dispatch, payload) {
        return dispatch(`${this.namespace}/MAKE_CALL`, payload);
      },
      hangup(dispatch, payload) {
        return dispatch(`${this.namespace}/HANGUP`, payload);
      },
      toggleMute(dispatch, payload) {
        return dispatch(`${this.namespace}/TOGGLE_MUTE`, payload);
      },
      toggleHold(dispatch, payload) {
        return dispatch(`${this.namespace}/TOGGLE_HOLD`, payload);
      },
      sendDTMF(dispatch, payload) {
        return dispatch(`${this.namespace}/SEND_DTMF`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
