<template>
  <button class="wt-icon-btn" type="button">
    <wt-icon
      :icon="icon"
      :size="size"
      :color="color"
      @click.native="$emit('click', $event)"
    ></wt-icon>
  </button>
</template>

<script>
export default {
  name: 'wt-icon-btn',
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-icon-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--main-color);
  border-radius: var(--border-radius--circular);
  box-shadow: var(--morf-style-up-50);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--morf-style-up-100);
  }
}

.wt-icon-btn,
.wt-icon-btn__button {
  line-height: 0;
}
</style>
