<template>
  <div class="wt-omni-widget-chat-footer-actions">
    <wt-icon-btn
      v-if="false"
      class="wt-omni-widget-chat-footer-actions__attach"
      icon="attach"
      size="sm"
      @click="openFileSelect"
    >
      <input
        ref="attachment-input"
        class="wt-omni-widget-chat-footer-actions__attach__input"
        type="file"
        multiple
        @change="handleAttachments"
      >
    </wt-icon-btn>
    <wt-icon-btn
      class="wt-omni-widget-chat-footer-actions__send-btn"
      icon="send-arrow"
      size="md"
      icon-size="sm"
      color="contrast"
      :permanent-shadow="false"
      @click="sendMessage"
    ></wt-icon-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'wt-omni-widget-chat-footer-actions',
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      sendMessage(dispatch, payload) {
        return dispatch(`${this.namespace}/SEND_MESSAGE`, payload);
      },
      sendFile(dispatch, payload) {
        return dispatch(`${this.namespace}/SEND_FILE`, payload);
      },
    }),
    openFileSelect() {
      this.$refs['attachment-input'].click();
    },
    async handleAttachments(event) {
      const files = Array.from(event.target.files);
      await this.sendFile(files);
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-chat-footer-actions {
    display: flex;
    align-items: center;
    padding: var(--footer-padding);
    margin-top: 10px;

    .wt-omni-widget-chat-footer-actions__send-btn { // bump specificity
      margin-left: auto;
      background: var(--wt-omni-widget__accent-color);
    }
  }

  .wt-omni-widget-chat-footer-actions__attach__input {
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }
}
</style>
