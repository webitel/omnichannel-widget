<template>
  <aside
    class="wt-snack-bar"
  >
    <transition-group name="snack-pop-up">
      <article
        class="wt-snack-bar-item"
        v-for="({ type, text, id }) of stack"
        :key="id"
        :class="`wt-snack-bar-item--${type}`"
      >
        <p
          class="wt-snack-bar-item-text"
        >
          {{ text || type }}
        </p>
        <wt-icon-btn
          icon="close"
          size="sm"
          @click="close(id)"
        ></wt-icon-btn>
      </article>
    </transition-group>
  </aside>
</template>

<script>
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import { v4 as uuid } from 'uuid';

export default {
  name: 'wt-snack-bar',
  data: () => ({
    stack: [],
  }),
  methods: {
    close(id) {
      const newStack = [...this.stack];
      const index = newStack.findIndex((item) => item.id === id);
      newStack.splice(index, 1);
      this.stack = newStack;
    },

    addSnack({
               type,
               title,
               text,
             }) {
      const newItem = {
        id: uuid(),
        type,
        title,
        text,
      };

      this.stack.push(newItem);

      setTimeout(() => {
        this.close(newItem.id);
      }, 3000);
    },
  },
  mounted() {
    eventBus.$on('snack', this.addSnack);
  },
  destroyed() {
    eventBus.$off('snack', this.addSnack);
  },
};
</script>

<style scoped lang="scss">
#wt-omni-widget {
  .wt-snack-bar {
    position: absolute;
    z-index: 1111;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .wt-snack-bar-item {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-content: center;
    justify-content: space-between;
    gap: 5px;
    padding: 15px;
    border-radius: 0 0 var(--border-radius--square) var(--border-radius--square);
    background: var(--negative-color);

    &--error {
      background: var(--negative-color);
    }
  }

  .wt-snack-bar-item-text {
    @extend %typo-body-md;
    color: var(--main-color);
  }

  .wt-snack-bar-item {
    &--error {
      .wt-snack-bar-item-header {
        color: var(--main-color);
      }

      .wt-snack-bar-item-text {
        color: var(--main-color);
      }
    }
  }

  &.wt-omni-widget--rounded {
    .wt-snack-bar-item {
      border-radius: 0 0 var(--border-radius--rounded) var(--border-radius--rounded);
    }
  }

  .snack-pop-up-enter-active,
  .snack-pop-up-leave-active {
    transition: all 0.2s ease;
  }

  .snack-pop-up-enter,
  .snack-pop-up-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

  .snack-pop-up-enter-to,
  .snack-pop-up-leave {
    transform: translateY(0);
    opacity: 1;
  }

}
</style>
