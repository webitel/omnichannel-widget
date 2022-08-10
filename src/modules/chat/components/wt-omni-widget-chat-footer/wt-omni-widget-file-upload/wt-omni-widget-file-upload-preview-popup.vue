<template>
  <portal to="popup">
    <div class="wt-omni-widget-file-upload-preview-popup">
      <file
        v-for="(file, index) of files"
        :key="file.name"
        :file="file"
        @remove="$emit('remove', { file, index })"
      ></file>
      <footer class="wt-omni-widget-file-upload-preview-popup__actions">
        <wt-button
          @click="$emit('send', files)"
        >{{ $t('reusable.send') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="close"
        >{{ $t('reusable.close') }}
        </wt-button>
      </footer>
    </div>
  </portal>
</template>

<script>
import File from './wt-omni-widget-file-upload-preview-popup-file.vue';

export default {
  name: 'wt-omni-widget-file-upload-preview-popup',
  components: { File },
  props: {
    files: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
  watch: {
    files(files) {
      if (!files.length) this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  $container-width: 340px;
  $container-max-height: 394px;

  .wt-omni-widget-file-upload-preview-popup {
    @extend %wt-scrollbar;
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    overflow: auto;
    flex-direction: column;
    box-sizing: border-box;
    width: $container-width;
    max-height: $container-max-height;
    padding: 15px;
    transform: translate(-50%, -50%);
    border-radius: var(--border-radius--square);
    background: var(--main-color);
    box-shadow: var(--morf-style-up-50);
    gap: 15px;
    z-index: 1;
  }

  .wt-omni-widget-file-upload-preview-popup__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-file-upload-preview-popup {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
