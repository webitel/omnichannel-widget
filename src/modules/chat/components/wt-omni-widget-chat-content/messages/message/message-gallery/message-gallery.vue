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
  name: 'message-gallery',
  props: {
    file: {
      type: Object,
      required: true,
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
      border-radius: var(--border-radius--square);
    }
  }
}
</style>
