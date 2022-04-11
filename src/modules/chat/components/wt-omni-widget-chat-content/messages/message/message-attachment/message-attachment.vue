<template>
  <article
    class="wt-omni-widget-chat-message-attachment"
    @click="downloadDocument"
  >
    <div class="wt-omni-widget-chat-message-attachment__icon">
        <wt-icon
          icon="attach"
          size="sm"
          color="contrast"
          icon-prefix="wt-omni-widget"
        ></wt-icon>
      </div>
    <div class="wt-omni-widget-chat-message-attachment-info">
      <strong class="wt-omni-widget-chat-message-nfo__name">{{ file.name }}</strong>
      <span class="wt-omni-widget-chat-message-info__size">{{ fileSize }}</span>
    </div>
  </article>
</template>

<script>
import prettifyFileSize from '@webitel/ui-sdk/src/scripts/prettifyFileSize';

export default {
  name: 'message-attachment',
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  computed: {
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
#wt-omni-widget {
  .wt-omni-widget-chat-message-attachment {
    display: flex;
    cursor: pointer;

    &__icon {
      flex: 0 0 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--wt-omni-widget__accent-color);
      border-radius: var(--border-radius--square);}
  }

  .wt-omni-widget-chat-message-attachment-info {
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

  &.wt-omni-widget--rounded {
    .wt-omni-widget-chat-message-attachment__icon {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
