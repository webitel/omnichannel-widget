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
      <strong class="wt-omni-widget-chat-message-attachment-info__name">{{ file.name }}</strong>
      <span class="wt-omni-widget-chat-message-attachment-info__size">{{ fileSize }}</span>
      <div
        v-if="file.uploadProgress && file.uploadProgress < 100"
        class="wt-omni-widget-chat-message-attachment-info__upload-progress"
      >
        <progress-bar
          :value="file.uploadProgress"
        ></progress-bar>
        <wt-icon
          icon="close"
          size="sm"
          icon-prefix="wt-omni-widget"
          @click.stop="file.cancelUpload"
        ></wt-icon>
      </div>
    </div>
  </article>
</template>

<script>
import prettifyFileSize from '@webitel/ui-sdk/src/scripts/prettifyFileSize';
import ProgressBar from '../../../../../../../app/components/utils/progress-bar.vue';

export default {
  name: 'message-attachment',
  components: { ProgressBar },
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
    min-width: 150px;
    gap: 10px;

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
    flex: 1;
    gap: 5px;

    &__name {
      @extend %typo-strong-md;
    }

    &__size {
      @extend %typo-body-md;
    }

    &__upload-progress {
      display: flex;
      align-items: center;
      gap: 5px;

      .wt-omni-widget-progress-bar {
        flex-grow: 1;
      }
    }
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-chat-message-attachment__icon {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
