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
      @keypress.enter.prevent="handleEnter"
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
    handleEnter(event) {
      if (event.shiftKey || event.ctrlKey) this.setDraft(this.draft.concat('\n'));
      else this.sendMessage(event);
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
#wt-omni-widget {
  .wt-omni-widget-chat-input {
    padding: var(--message-input-padding);
    background: var(--main-color);
    border-radius: var(--border-radius--square);
    box-shadow: var(--morf-style-down-50);
    transition: var(--transition);
    cursor: text;
    line-height: 0; // remove extra height from wrapper

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
    resize: none !important; // !important prevents autosize "horizontal" in el style

    &:focus {
      outline: none;
    }
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-chat-input {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
