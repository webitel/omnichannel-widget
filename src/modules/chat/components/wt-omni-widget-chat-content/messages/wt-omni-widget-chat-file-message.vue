<template>
  <div
    class="wt-omni-widget-chat-message wt-omni-widget-chat-message--file"
    :class="{ 'wt-omni-widget-chat-message--my': my }"
    @click="downloadDocument"
  >
    <div class="wt-omni-widget-chat-message--file__icon__wrapper">
      <wt-icon
        icon="attach"
        size="sm"
        color="contrast"
      ></wt-icon>
    </div>
    <div class="wt-omni-widget-chat-message--file__info__wrapper">
      <strong class="wt-omni-widget-chat-message--file__info__name">{{ file.name }}</strong>
      <span class="wt-omni-widget-chat-message--file__info__size">{{ fileSize }}</span>
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
  align-items: center;
  cursor: pointer;

  &__icon__wrapper {
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

  &__info {
    &__wrapper {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
    }

    &__name {
      @extend %typo-strong-md;

      margin-bottom: 5px;
    }

    &__size {
      @extend %typo-body-md;
    }
  }
}
</style>
