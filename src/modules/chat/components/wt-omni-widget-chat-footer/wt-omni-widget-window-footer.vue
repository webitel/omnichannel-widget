<template>
  <footer class="wt-omni-widget-window-footer">
    <chat-input
      v-if="!isConnectionClosed"
      :namespace="namespace"
    ></chat-input>
    <wt-button
      v-else
      @click="openSession"
    >
      {{ $t('chat.reopenSession') }}
    </wt-button>
  </footer>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import ChatInput from './chat-input.vue';

export default {
  name: 'wt-omni-widget-window-footer',
  components: { ChatInput },
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      isConnectionClosed(state) {
        return getNamespacedState(state, this.namespace).isConnectionClosed;
      },
    }),
  },
  methods: {
    ...mapActions({
      openSession(dispatch, payload) {
        return dispatch(`${this.namespace}/OPEN_SESSION`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
  #wt-omni-widget {
    .wt-omni-widget-window-footer {
      .wt-button {
        margin: 16px auto;
      }
    }
  }
</style>
