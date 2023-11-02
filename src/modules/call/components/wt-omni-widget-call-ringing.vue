<template>
  <section class="wt-omni-widget-call-ringing">
    <img
      alt="ringing call sonar"
      src="../assets/sonars/ringing-sonar.svg"
    >
    <call-title-wrapper>
      {{ $t('call.ringingView.title') }}
      <template #description>
        {{ $t('call.ringingView.description') }}
      </template>
    </call-title-wrapper>
    <call-actions-wrapper>
      <wt-icon-btn
        :icon="isMuted ? 'mic-off' : 'mic'"
        icon-size="sm"
        @click="toggleMute"
      ></wt-icon-btn>
      <wt-icon-btn
        color="error"
        icon="call-decline"
        icon-size="sm"
        @click="hangup"
      ></wt-icon-btn>
    </call-actions-wrapper>
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import CallActionsWrapper from './utils/wt-omni-widget-call-actions-wrapper.vue';
import CallTitleWrapper from './utils/wt-omni-widget-call-title-wrapper.vue';

export default {
  name: 'wt-omni-widget-call-ringing',
  components: {
    CallTitleWrapper,
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
      isMuted(state) {
        return getNamespacedState(state, this.namespace).sessionMute;
      },
    }),
  },
  methods: {
    ...mapActions({
      toggleMute(dispatch, payload) {
        dispatch(`${this.namespace}/TOGGLE_MUTE`, payload);
      },
      hangup(dispatch, payload) {
        dispatch(`${this.namespace}/HANGUP`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-call-ringing {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
  }
}
</style>
