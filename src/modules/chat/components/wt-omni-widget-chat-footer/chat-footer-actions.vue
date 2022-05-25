<template>
  <div class="wt-omni-widget-chat-footer-actions">
    <file-upload
      @send="sendFiles"
    ></file-upload>
    <chat-emoji
      @insert-emoji="$emit('emoji', $event)"
    ></chat-emoji>
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
import ChatEmoji from './wt-omni-widget-chat-emoji/wt-omni-widget-chat-emoji.vue';
import FileUpload from './wt-omni-widget-file-upload/wt-omni-widget-file-upload.vue';

export default {
  name: 'chat-footer-actions',
  components: {
    ChatEmoji,
    FileUpload,
  },
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
      sendFiles(dispatch, payload) {
        return dispatch(`${this.namespace}/SEND_FILES`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-chat-footer-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: var(--footer-padding);
    margin-top: 10px;

    .wt-omni-widget-chat-footer-actions__send-btn { // bump specificity
      margin-left: auto;
      background: var(--wt-omni-widget__accent-color);
    }
  }
}
</style>
