<template>
  <div
    class="wt-omni-widget-chat-emoji"
  >
    <wt-icon-btn
      color="secondary"
      icon="emoji"
      icon-prefix="wt-omni-widget"
      size="sm"
      @click="isOpened = !isOpened"
    ></wt-icon-btn>
    <div
      v-show="isOpened"
      ref="emoji-picker-wrapper"
    ></div>
  </div>
</template>

<script>
import { Picker } from 'emoji-picker-element';

export default {
  name: 'wt-omni-widget-chat-emoji',
  data: () => ({
    picker: {},
    isOpened: false,
  }),
  mounted() {
    this.initPicker();
    this.picker.addEventListener('emoji-click', this.emitEmojiClickEvent);
  },
  destroyed() {
    this.picker.removeEventListener('emoji-click', this.emitEmojiClickEvent);
  },
  methods: {
    initPicker() {
      // https://github.com/nolanlawson/emoji-picker-element#javascript-api
      this.picker = new Picker({
        i18n: this.$i18n.messages[this.$i18n.locale].emojiPicker,
      });
      this.appendPicker();
      this.picker.classList.add('light');
    },
    appendPicker() {
      this.$refs['emoji-picker-wrapper'].appendChild(this.picker);
    },
    emitEmojiClickEvent(event) {
      const { unicode } = event.detail;
      this.$emit('insert-emoji', unicode);
      this.closePicker();
    },
    closePicker() {
      this.isOpened = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget .wt-omni-widget-chat-emoji {
  position: relative;
  display: block;

  ::v-deep emoji-picker {
    @extend %wt-scrollbar;
    @extend %typo-body-md;

    /*
      I needed to center emoji-picker, but it is absolutely positioned relatively
      to emoji-picker icon, that isn't centered, and i cannot use portal-vue
      because then emoji-picker loses its reference and cannot initialize iteself
      so i copied sizing computations from wt-omni-widget-window.vue and adjusted
      "left" property to fit correctly in window wrapper
     */
    width: calc(100vw - var(--chat-offset) * 2);
    max-width: 390px;
    left: -58px;

    position: absolute;
    z-index: 1;
    bottom: calc(100% + 10px);
    max-height: 285px;
    overflow-y: scroll;
    border-radius: var(--border-radius--square);

    --border-color: transparent;
    --outline-color: var(--contrast-color);
    --outline-size: 1px;
    --indicator-color: var(--wt-omni-widget__accent-color);
    --input-padding: 10px;
    --input-font-size: 12px;
    --input-line-height: 14px;
    --input-border-radius: 20px;
    --input-font-color: var(--contrast-color);
    --input-border-color: transparent;

    // https://github.com/nolanlawson/emoji-picker-element#small-screen-sizes
    @media screen and (max-width: 425px) {
      --num-columns: 7;
      --category-emoji-size: 1rem;
    }

    @media screen and (max-width: 400px) {
      --num-columns: 6;
      --category-emoji-size: 0.75rem;
    }
  }

  &.wt-omni-widget--rounded ::v-deep emoji-picker {
    border-radius: var(--border-radius--rounded);
  }
}
</style>
