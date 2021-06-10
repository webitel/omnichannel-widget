<template>
  <form
    class="wt-omni-widget-chat-input"
    @submit.prevent="send"
  >
    <div class="wt-omni-widget-chat-input__textarea__wrapper">
    <textarea
      id="wt-omni-widget-chat-input"
      class="wt-omni-widget-chat-input__textarea"
      v-model="draft"
      :placeholder="$t('chat.inputPlaceholder')"
      @keypress.enter.prevent="send"
    ></textarea>
      <wt-icon-btn
        class="wt-omni-widget-chat-input__send-btn"
        icon="send-arrow"
        size="md"
        icon-size="sm"
        color="contrast"
        @click="send"
      ></wt-icon-btn>
    </div>
  </form>
</template>

<script>
import autosize from 'autosize';

export default {
  name: 'wt-omni-widget-chat-input',
  data: () => ({
    draft: '',
  }),
  methods: {
    send() {
      this.$emit('send', this.draft);
      this.draft = '';
    },
    setupAutosize() {
      autosize(document.getElementById('wt-omni-widget-chat-input'));
    },
  },
  mounted() {
    this.setupAutosize();
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-chat-input__textarea__wrapper {
 // @extend %wt-scrollbar;
  position: relative;

  .wt-omni-widget-chat-input__send-btn {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background: var(--accent-color);
  }
}

.wt-omni-widget-chat-input__textarea {
  @extend %typo-body-md;

  box-sizing: border-box;
  width: 100%;
  min-height: 32px;
  max-height: 120px;
  padding: 10px 15px;
  background: var(--main-color);
  border: none;
  border-radius: var(--border-radius--circular);
  box-shadow: var(--morf-style-down-50);
  transition: var(--transition);
  resize: none;
  overflow: auto;

  &:hover, &:focus, &:active {
    box-shadow: var(--morf-style-down-100);
  }

  &:focus {
    outline: none;
  }
}
</style>
