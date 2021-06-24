<template>
  <div
    class="wt-omni-widget-chat-message wt-omni-widget-chat-message--file"
    :class="{ 'wt-omni-widget-chat-message--my': my }"
    @click="downloadDocument"
  >
    <div v-if="isImage" class="wt-omni-widget-chat-message__image">
      <img
        class="wt-omni-widget-chat-message__image__img"
        :src="file.url"
        :alt="file.name">
    </div>
    <div class="wt-omni-widget-chat-message__file-wrapper">
      <div class="wt-omni-widget-chat-message__icon">
        <wt-icon
          icon="attach"
          size="sm"
          color="contrast"
        ></wt-icon>
      </div>
      <div class="wt-omni-widget-chat-message__info">
        <strong class="wt-omni-widget-chat-message__info__name">{{ file.name }}</strong>
        <span class="wt-omni-widget-chat-message__info__size">{{ fileSize }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import prettifyFileSize from '../../../../../app/webitel-ui/scripts/prettifyFileSize';
import chatMessageMixin from '../../../mixins/chatMessageMixin';

export default {
  name: 'wt-omni-widget-chat-file-message',
  mixins: [chatMessageMixin],
  computed: {
    file() {
      return this.message.file;
    },
    isImage() {
      return this.file.mime.includes('image');
    },
    fileSize() {
      return prettifyFileSize(this.file.size);
    },
  },
  methods: {
    downloadDocument() {
      const a = document.createElement('a');
      a.href = this.file.url;
      a.target = '_blank';
      a.download = this.file.name;
      a.click();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../css/wt-omni-widget-chat-message';

.wt-omni-widget-chat-message--file {
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
}

.wt-omni-widget-chat-message__image {
  max-width: 100%;
  margin-bottom: 10px;

  &__img {
    width: 100%;
  }
}

.wt-omni-widget-chat-message__file-wrapper {
  display: flex;
  align-items: center;
}

.wt-omni-widget-chat-message__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--accent-color);
  border-radius: var(--border-radius--square);

  .wt-omni-widget--rounded & {
    border-radius: var(--border-radius--rounded);
  }
}

.wt-omni-widget-chat-message__info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  &__name {
    @extend %typo-strong-md;

    margin-bottom: 5px;
  }

  &__size {
    @extend %typo-body-md;
  }
}
</style>
