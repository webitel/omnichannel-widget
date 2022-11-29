<template>
  <li class="wt-omni-widget-file-upload-preview-popup-file">
    <div class="wt-omni-widget-file-upload-preview-pic">
      <img
        class="wt-omni-widget-file-upload-preview-pic__img"
        v-if="isImg"
        :src="file.url"
        alt="file preview"
      >
      <div v-else class="wt-omni-widget-file-upload-preview-pic__attachment-wrapper">
        <wt-icon
          icon="attach"
          icon-prefix="wt-omni-widget"
          size="sm"
          color="contrast"
        ></wt-icon>
      </div>
    </div>
    <div class="wt-omni-widget-file-upload-preview-info">
      <p class="wt-omni-widget-file-upload-preview-info__name">
        {{ file.name }}
      </p>
      <p class="wt-omni-widget-file-upload-preview-info__size">
        {{ size }}
      </p>
    </div>
    <div class="wt-omni-widget-file-upload-preview-remove-action">
      <wt-icon
        icon="close"
        icon-prefix="wt-omni-widget"
        size="sm"
        @click="$emit('remove', file)"
      ></wt-icon>
    </div>
  </li>
</template>

<script>
import prettifyFileSize from '@webitel/ui-sdk/src/scripts/prettifyFileSize';

export default {
  name: 'wt-omni-widget-file-upload-preview-popup-file',
  props: {
    file: {
      type: File,
      required: true,
    },
  },
  computed: {
    isImg() {
      return this.file.type.includes('image');
    },
    size() {
      return prettifyFileSize(this.file.size);
    },
  },
};
</script>

<style lang="scss" scoped>
  #wt-omni-widget {
    .wt-omni-widget-file-upload-preview-popup-file {
      display: flex;
      gap: 15px;

      .wt-omni-widget-file-upload-preview-pic {
        border-radius: var(--border-radius--square);
        flex: 0 0 40px;
        height: 40px;
        overflow: hidden;

        &__img {
          width: 100%;
          height: 100%;
        }

        &__attachment-wrapper {
          line-height: 0;
          padding: 14px;
          background: var(--wt-omni-widget__accent-color);
        }
      }

      .wt-omni-widget-file-upload-preview-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 5px;
        overflow-wrap: anywhere;

        .wt-omni-widget-file-upload-preview-info__name {
          @extend %typo-heading-md;
        }

        .wt-omni-widget-file-upload-preview-info__size {
          @extend %typo-body-md;
        }
      }

      .wt-omni-widget-file-upload-preview-remove-action {
        flex: 0 0 12px;

        .wt-icon {
          cursor: pointer;
        }
      }
    }

    &.wt-omni-widget--rounded {
      .wt-omni-widget-file-upload-preview-pic {
        border-radius: var(--border-radius--rounded);
      }
    }
  }
</style>
