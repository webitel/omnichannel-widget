<template>
  <section class="wt-omni-widget-call-active">
    <img
      src="../assets/sonars/active-sonar.svg"
      alt="active call sonar"
    >
    <call-title-wrapper>
      {{ duration }}
      <template #description>
        <p class="wt-omni-widget-call-active__dtmf">
          {{ sessionDTMF }}
        </p>
      </template>
    </call-title-wrapper>
    <numpad
      @input="sendDTMF"
    ></numpad>
    <call-actions-wrapper>
      <wt-icon-btn
        :icon="isMuted ? 'mic-off' : 'mic'"
        icon-size="sm"
        @click="toggleMute"
      ></wt-icon-btn>
      <wt-icon-btn
        icon="call-decline"
        icon-size="sm"
        color="error"
        @click="hangup"
      ></wt-icon-btn>
    </call-actions-wrapper>
  </section>
</template>

<script>
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import { mapState, mapActions } from 'vuex';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import CallTitleWrapper from './utils/wt-omni-widget-call-title-wrapper.vue';
import Numpad from './utils/wt-omni-widget-numpad.vue';
import CallActionsWrapper from './utils/wt-omni-widget-call-actions-wrapper.vue';

export default {
  name: 'wt-omni-widget-call-active',
  components: {
    CallTitleWrapper,
    Numpad,
    CallActionsWrapper,
  },
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      sessionDTMF(state) {
        return getNamespacedState(state, this.namespace).sessionDTMF;
      },
      isMuted(state) {
        return getNamespacedState(state, this.namespace).sessionMute;
      },
    }),
    duration() {
      return convertDuration(this.$store.getters[`${this.namespace}/SESSION_DURATION`] / 1000);
    },
  },
  methods: {
    ...mapActions({
      toggleMute(dispatch, payload) {
        dispatch(`${this.namespace}/TOGGLE_MUTE`, payload);
      },
      hangup(dispatch, payload) {
        dispatch(`${this.namespace}/HANGUP`, payload);
      },
      sendDTMF(dispatch, payload) {
        dispatch(`${this.namespace}/SEND_DTMF`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-call-active {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
  }

  .wt-omni-widget-call-active__dtmf {
    word-break: break-all;
  }
}
</style>
