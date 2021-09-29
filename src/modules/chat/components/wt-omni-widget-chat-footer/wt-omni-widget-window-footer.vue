<template>
  <footer class="wt-omni-widget-window-footer">
    <div v-if="!isConnectionClosed">
      <wt-omni-widget-chat-input
        :namespace="namespace"
      ></wt-omni-widget-chat-input>
      <wt-omni-widget-chat-footer-actions
        :namespace="namespace"
      ></wt-omni-widget-chat-footer-actions>
    </div>
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
import getNamespacedState from '../../../../app/webitel-ui/store/helpers/getNamespacedState';
import WtOmniWidgetChatInput from './wt-omni-widget-chat-input.vue';
import WtOmniWidgetChatFooterActions from './wt-omni-widget-chat-footer-actions.vue';

export default {
  name: 'wt-omni-widget-window-footer',
  components: { WtOmniWidgetChatInput, WtOmniWidgetChatFooterActions },
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
