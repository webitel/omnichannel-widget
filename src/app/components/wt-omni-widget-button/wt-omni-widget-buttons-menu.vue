<template>
  <div
    :class="{ 'wt-omni-widget-buttons-menu--expanded': isExpanded }"
    class="wt-omni-widget-buttons-menu"
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <transition-expand>
      <div
        v-if="isExpanded"
        class="wt-omni-widget-buttons-menu__hidden-buttons-wrapper"
      >
        <wt-omni-widget-button
          v-for="(button, key) of buttons"
          :key="key"
          :type="button.type"
          @click="$emit('click', 'chat')"
        ></wt-omni-widget-button>
      </div>
    </transition-expand>
    <wt-omni-widget-button
      type="chat"
      @click="$emit('click', 'chat')"
    ></wt-omni-widget-button>
  </div>
</template>

<script>
import { TransitionExpand } from 'vue-transition-expand';
import WtOmniWidgetButton from './wt-omni-widget-button.vue';

export default {
  name: 'wt-omni-widget-buttons-menu',
  components: {
    WtOmniWidgetButton,
    TransitionExpand,
  },
  data: () => ({
    isExpanded: false,
  }),
  computed: {
    buttons() {
      return Object.entries(this.config.alternativeChannels)
        .reduce((channels, [channelName, channelUrl]) => ([...channels, {
          type: channelName,
          url: channelUrl,
        }]), []);
    },
  },
};
</script>

<style lang="scss">
#wt-omni-widget {
  @import '~vue-transition-expand/dist/vue-transition-expand';
  // override 1s vue-transition-expand duration
  .expand-enter-active, .expand-leave-active {
    transition-duration: 0.2s;
  }

  .wt-omni-widget-buttons-menu {
    --menu-buttons-gap: 10px;

    width: fit-content;
    padding: var(--buttons-menu-padding);
    border-radius: var(--border-radius--square);
    background: var(--main-color);
    opacity: var(--wt-omni-widget__buttons-menu-opacity); // configured style
    transition: var(--transition);

    // https://stackoverflow.com/a/30104683
    pointer-events: none; // apply hover styles only on child hover

    &, &__hidden-buttons-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--menu-buttons-gap);
    }

    &--expanded {
      pointer-events: auto;
    }

    &:hover {
      box-shadow: var(--morf-style-up-100);
      opacity: 1;
    }

    /*
     cause .wt-omni-widget-btn overrides p-events: none on buttons-menu (see line-30 stackoverflow link).
     so that, on hidden state, we should set p-events: none to widget-btn manually
     */
    &.hidden .wt-omni-widget-btn {
      pointer-events: none;
    }
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-buttons-menu {
      border-radius: var(--border-radius--rounded-btn);
    }
  }
}
</style>
