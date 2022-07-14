<template>
  <div class="wt-omni-widget-file-upload">
    <wt-icon-btn
      class="wt-omni-widget-file-upload__action"
      icon="attach"
      size="sm"
      @click="openFileSelect"
    >
      <input
        ref="attachment-input"
        class="wt-omni-widget-file-upload__input"
        multiple
        type="file"
        @change="handleAttachments"
      >
    </wt-icon-btn>
    <preview-popup
      v-if="isPreviewPopup"
      :files="files"
      @close="isPreviewPopup = false"
      @remove="removeFile"
      @send="sendFiles"
    ></preview-popup>
  </div>
</template>

<script>
import PreviewPopup from './wt-omni-widget-file-upload-preview-popup.vue';

export default {
  name: 'wt-omni-widget-file-upload',
  components: { PreviewPopup },
  data: () => ({
    files: [],
    isPreviewPopup: false,
  }),
  methods: {
    openFileSelect() {
      this.$refs['attachment-input'].click();
    },

    processAttachmentImg(file) {
      return new Promise((resolve) => {
        if (!file.type.includes('image')) resolve(file);
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          // eslint-disable-next-line no-param-reassign
          file.url = event.target.result;
          resolve(file);
        };
        fileReader.readAsDataURL(file);
      });
    },

    async processAttachments(files) {
      const _files = await Promise.allSettled(
        Array.from(files)
        .map((file) => this.processAttachmentImg(file)),
      );
      return _files.map(({ value }) => value);
    },

    async handleAttachments(event) {
      this.files = await this.processAttachments(event.target.files);

      this.isPreviewPopup = true;
      this.$refs['attachment-input'].value = '';
    },

    sendFiles(files) {
      this.isPreviewPopup = false;
      this.$emit('send', files);
    },

    removeFile({ index }) {
      this.files.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-file-upload__action {
    width: 24px; // prevent mobile overflow from input https://my.webitel.com/browse/WTEL-2755
  }
  .wt-omni-widget-file-upload__input {
    width: 0;
    height: 0;
    pointer-events: none;
    opacity: 0;
  }
}
</style>
