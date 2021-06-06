<template>
  <button
    class="wt-omni-widget-btn"
    :class="`wt-omni-widget-btn--${type}`"
    @click.prevent="$emit('click')"
  >
    <div class="wt-omni-widget-btn__icon">
      <img
        class="wt-omni-widget-btn__icon__img"
        :src="iconSrc[type]"
        :alt="`${type} icon`"
      >
    </div>
  </button>
</template>

<script>
import chatIcon from '../../assets/icons/icon-chat--md.svg';

export default {
  name: 'wt-omni-widget-button',
  data: () => ({
    iconSrc: {
      chat: chatIcon,
    },
  }),
  props: {
    type: {
      type: String,
      required: true,
      options: ['chat'],
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-omni-widget-btn {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    box-shadow: var(--morf-style-up-50);
  }

  &--chat {
    background: var(--accent-color);
  }
}

.wt-omni-widget-btn__icon {
  width: 24px;
  height: 24px;

  &__img {
    width: 100%;
    height: 100%;
  }
}
</style>
