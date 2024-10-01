<template>
  <form
    class="wt-omni-widget-chat-input"
    @submit.prevent="sendDraft"
  >
    <div class="wt-omni-widget-chat-input__textarea-wrapper">
      <textarea
        id="wt-omni-widget-chat-input"
        :placeholder="$t('chat.inputPlaceholder')"
        :value="draft"
        class="wt-omni-widget-chat-input__textarea"
        @input="handleInput($event.target.value)"
        @keypress.enter="handleEnter"
      ></textarea>
    </div>
    <chat-footer-actions
      :namespace="namespace"
      @emoji="insertEmoji"
    ></chat-footer-actions>
  </form>
</template>

<script>
import autosize from 'autosize';
import dompurify from 'dompurify';
import insertTextAtCursor from 'insert-text-at-cursor';
import { mapActions, mapState } from 'vuex';
import ChatFooterActions from './chat-footer-actions.vue';

export default {
  name: 'chat-input',
  components: { ChatFooterActions },
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
      sendDraft(dispatch, payload) {
        return dispatch(`${this.namespace}/SEND_DRAFT`, payload);
      },
      setDraft(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_DRAFT`, payload);
      },
    }),
    handleInput(value) {
      const purifiedValue = dompurify.sanitize(value);
      this.setDraft(purifiedValue);
    },
    handleEnter(event) {
      if (!event.shiftKey && !event.ctrlKey) {
        event.preventDefault();
        this.sendDraft(event);
      }
    },
    insertEmoji(unicode) {
      // view-source:https://bl.ocks.org/nolanlawson/raw/4f13bc639cdb3483efca8b657f30a1e0/
      const textarea = document.getElementById('wt-omni-widget-chat-input');
      insertTextAtCursor(textarea, unicode);
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
  .wt-omni-widget-chat-input__textarea-wrapper {
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
