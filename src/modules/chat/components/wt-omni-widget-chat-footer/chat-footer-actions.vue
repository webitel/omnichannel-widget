<template>
  <div class="wt-omni-widget-chat-footer-actions">
    <wt-icon-btn
      class="wt-omni-widget-chat-footer-actions__attach"
      icon="attach"
      size="sm"
      @click="openFileSelect"
    >
      <input
        ref="attachment-input"
        class="wt-omni-widget-chat-footer-actions__attach__input"
        multiple
        type="file"
        @change="handleAttachments"
      >
    </wt-icon-btn>
    <wt-icon-btn
      :permanent-shadow="false"
      class="wt-omni-widget-chat-footer-actions__send-btn"
      color="contrast"
      icon="send-arrow"
      icon-size="sm"
      size="md"
      @click="sendDraft"
    ></wt-icon-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'chat-footer-actions',
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      sendDraft(dispatch, payload) {
        return dispatch(`${this.namespace}/SEND_DRAFT`, payload);
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
      this.$refs['attachment-input'].value = '';
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
