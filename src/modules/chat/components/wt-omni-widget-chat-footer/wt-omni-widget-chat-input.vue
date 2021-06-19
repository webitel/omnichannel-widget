<template>
  <form
    class="wt-omni-widget-chat-input"
    @submit.prevent="sendMessage"
  >
    <textarea
      id="wt-omni-widget-chat-input"
      class="wt-omni-widget-chat-input__textarea"
      :value="draft"
      :placeholder="$t('chat.inputPlaceholder')"
      @input="setDraft($event.target.value)"
      @keypress.enter.prevent="sendMessage"
    ></textarea>
  </form>
</template>

<script>
import autosize from 'autosize';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'wt-omni-widget-chat-input',
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState('chat', {
      draft: (state) => state.draft,
    }),
  },
  methods: {
    ...mapActions({
      sendMessage(dispatch, payload) {
        return dispatch(`${this.namespace}/SEND_MESSAGE`, payload);
      },
      setDraft(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_DRAFT`, payload);
      },
    }),
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
.wt-omni-widget-chat-input {
  padding: var(--message-input-padding);
  background: var(--main-color);
  border-radius: var(--border-radius--square);
  box-shadow: var(--morf-style-down-50);
  transition: var(--transition);
  cursor: text;
  line-height: 0; // remove extra height from wrapper

  .wt-omni-widget--rounded & {
    border-radius: var(--border-radius--rounded);
  }

  &:hover, &:focus-within, &:active {
    box-shadow: var(--morf-style-down-100);
  }
}

.wt-omni-widget-chat-input__textarea {
  @extend %typo-body-md;

  box-sizing: border-box;
  @extend %wt-scrollbar;
  min-height: 52px;
  max-height: 120px;
  width: 100%;
  overflow-y: scroll;
  border: none;
  resize: none;

  &:focus {
    outline: none;
  }
}
</style>
