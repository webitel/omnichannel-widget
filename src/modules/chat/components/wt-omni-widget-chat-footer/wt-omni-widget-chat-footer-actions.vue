<template>
  <div class="wt-omni-widget-chat-footer-actions">
    <wt-icon-btn
      class="wt-omni-widget-chat-footer-actions__attach"
      icon="attach"
      size="sm"
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
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
