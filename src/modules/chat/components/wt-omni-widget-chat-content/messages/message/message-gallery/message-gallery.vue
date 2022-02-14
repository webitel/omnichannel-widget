<template>
  <article class="wt-omni-widget-chat-message-section--gallery">
    <img
      class="wt-omni-widget-chat-message-gallery__img"
      :src="file.url"
      :alt="file.name"
    >
  </article>
</template>

<script>
export default {
  name: 'message-attachment',
  props: {
    file: {
      type: Object,
      default: () => ({}),
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
  .wt-omni-widget-chat-message-gallery {
    max-width: 100%;
    margin-bottom: 10px;

    &__img {
      width: 100%;
    }
  }
}
</style>
