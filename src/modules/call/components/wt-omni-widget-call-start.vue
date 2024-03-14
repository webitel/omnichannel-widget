<template>
  <section class="wt-omni-widget-call-start">
    <div class="wt-omni-widget-call-start-pic">
      <img
        alt="start call preview"
        src="../assets/call-dummy.svg"
      >
    </div>
    <call-title-wrapper>
      {{ $t('call.startView.title') }}
      <template #description>
        {{ $t('call.startView.description') }}
      </template>
    </call-title-wrapper>
    <call-actions-wrapper>
      <wt-icon-btn
        :icon="initWithMuted ? 'mic-off' : 'mic'"
        icon-size="sm"
        @click="initWithMuted = !initWithMuted"
      ></wt-icon-btn>
      <wt-icon-btn
        icon="call"
        icon-size="sm"
        color="success"
        @click="call"
      ></wt-icon-btn>
    </call-actions-wrapper>
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import reCAPTCHify from '../../reCAPTCHA-verification/scripts/reCAPTCHify';
import CallActionsWrapper from './utils/wt-omni-widget-call-actions-wrapper.vue';
import CallTitleWrapper from './utils/wt-omni-widget-call-title-wrapper.vue';

export default {
  name: 'wt-omni-widget-call-start',
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
  data: () => ({
    initWithMuted: false,
  }),
  computed: {
    ...mapState({
      isMuted(state) {
        return getNamespacedState(state, this.namespace).sessionMute;
      },
    }),
  },
  methods: {
    ...mapActions({
      makeCall(dispatch, payload) {
        return dispatch(`${this.namespace}/MAKE_CALL`, payload);
      },
    }),
    async call() {
      try {
        await reCAPTCHify(() => {
          this.makeCall({ initWithMuted: this.initWithMuted });
        });
      } catch (err) {
        eventBus.$emit('snack', {
          type: 'error',
          text: this.$t('captcha.error.text'),
        });
        throw err;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-call-start {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    height: 100%;
  }
}
</style>
