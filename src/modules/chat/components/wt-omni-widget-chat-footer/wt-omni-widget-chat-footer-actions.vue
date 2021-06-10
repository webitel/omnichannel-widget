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
        type="file"
        multiple
        @change="handleAttachments"
      >
    </wt-icon-btn>
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
.wt-omni-widget-chat-footer-actions {
  padding: 5px 10px;
  margin-top: 10px;
}

.wt-omni-widget-chat-footer-actions__attach__input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}
</style>
