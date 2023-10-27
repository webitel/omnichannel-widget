<template>
  <fragment>
    <content-wrapper>
      <div>State: {{ sessionState }}</div>
        <div>Duration: {{ sessionDuration }}</div>
        <div>Mute: {{ sessionMute }}</div>
        <div>Hold: {{ sessionHold }}</div>
        <div>DTMF: {{ sessionDTMF }}</div>
      <wt-button @click="makeCall">call</wt-button>
      <wt-button @click="hangup">hangup</wt-button>
      <wt-button @click="toggleMute">toggle mute</wt-button>
      <wt-button @click="toggleHold">toggle hold</wt-button>
      <input
          type="text"
          :value="sessionDTMF"
          @input="sendDTMF($event.target.value)"
      >
    </content-wrapper>
    <footer-wrapper>
    </footer-wrapper>
  </fragment>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { Fragment } from 'vue-fragment';
import { mapState, mapActions } from 'vuex';
import ContentWrapper
  from '../../../app/components/wt-omni-widget-window/wt-omni-widget-window-content-wrapper/wt-omni-widget-window-content-wrapper.vue';
import FooterWrapper
  from '../../../app/components/wt-omni-widget-window/wt-omni-widget-window-footer-wrapper/wt-omni-widget-window-footer-wrapper.vue';

export default {
  name: 'wt-omni-widget-call-wrapper',
  components: {
    Fragment,
    ContentWrapper,
    FooterWrapper,
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
    sessionDuration() {
      return this.$store.getters[this.namespace].SESSION_DURATION;
    },
    sessionHold() {
      return this.$store.getters[this.namespace].SESSION_HOLD;
    },
  },
  methods: {
    ...mapActions({
      makeCall: `${this.namespace}/MAKE_CALL`,
      hangup: `${this.namespace}/HANGUP`,
      toggleMute: `${this.namespace}/TOGGLE_MUTE`,
      toggleHold: `${this.namespace}/TOGGLE_HOLD`,
      sendDTMF: `${this.namespace}/SEND_DTMF`,
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
