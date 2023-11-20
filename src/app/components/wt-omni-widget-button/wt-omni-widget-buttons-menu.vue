<template>
  <div
    :class="{ 'wt-omni-widget-buttons-menu--expanded': isExpanded }"
    class="wt-omni-widget-buttons-menu"
  >
    <transition-expand>
      <div
        v-if="buttons && isExpanded"
        class="wt-omni-widget-buttons-menu__hidden-buttons-wrapper"
      >
        <wt-omni-widget-button
          v-for="(button, key) of expandedButtons"
          :key="key"
          :type="button.type"
          :url="button.url"
          @click="handleBtnClick"
        ></wt-omni-widget-button>
      </div>
    </transition-expand>
    <wt-omni-widget-button
      :type="visibleBtn.type"
      @click="handleBtnClick"
    ></wt-omni-widget-button>
  </div>
</template>

<script>
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import { TransitionExpand } from 'vue-transition-expand';
import AlternativeChannel from '../../enums/AlternativeChannel.enum';
import WidgetChannel from '../../enums/WidgetChannel.enum';
import WtOmniWidgetButton from './wt-omni-widget-button.vue';

const ServiceButtons = {
  OPEN: 'open', // ui service btn
  CLOSE: 'close', // ui service btn
};

const ButtonMenuType = Object.freeze({
  ...ServiceButtons,
  ...AlternativeChannel,
  ...WidgetChannel,
});

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
      const alternativeChannels = Object.values(AlternativeChannel);
      const alternativeChannelButtons = isEmpty(this.config.alternativeChannels)
        ? []
        : Object.entries(this.config.alternativeChannels)
        .reduce((channels, [channelName, channelUrl]) => {
          if (!alternativeChannels.includes(channelName)) return channels;

          let url = channelUrl;

          switch (channelName) {
            case AlternativeChannel.EMAIL: {
              url = /^mailto:/.test(url) ? url : 'mailto:'.concat(url);
              break;
            }
            case AlternativeChannel.VIBER: {
              break;
            }
            default: {
              url = /^(http(s?)):/.test(url) ? url : 'https://'.concat(url);
            }
          }

          return [
            ...channels, {
              type: Object.values(ButtonMenuType).find((type) => type === channelName),
              url,
            },
          ];
        }, []);

      const chatBtn = this.config.chat ? [
        {
          type: ButtonMenuType.CHAT,
        },
      ] : [];

      const appointmentBtn = this.config.appointment ? [
        {
          type: ButtonMenuType.APPOINTMENT,
        },
      ] : [];

      const callBtn = this.config.call ? [
        {
          type: ButtonMenuType.CALL,
        },
      ] : [];

      const buttons = [
        ...chatBtn,
        ...appointmentBtn,
        ...callBtn,
        ...alternativeChannelButtons,
      ];

      if (buttons.length > 1) {
        const openBtn = {
          type: this.isExpanded ? ButtonMenuType.CLOSE : ButtonMenuType.OPEN,
        };
        buttons.unshift(openBtn);
      }

      return buttons;
    },
    visibleBtn() {
      return this.buttons.at(0);
    },
    expandedButtons() {
      return this.buttons.slice(1).reverse();
    },
  },
  methods: {
    handleBtnClick(type) {
      if (type === ButtonMenuType.OPEN) this.isExpanded = true;
      else if (type === ButtonMenuType.CLOSE) this.isExpanded = false;
      else {
        const channel = Object.values(WidgetChannel).find((channel) => channel === type);
        this.open({ channel });
      }
    },
    open({ channel }) {
      this.$emit('open', { channel, options: {} });
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
    width: fit-content;

    padding: var(--buttons-menu-padding);
    transition: var(--transition);
    pointer-events: none; // apply hover styles only on child hover
    opacity: var(--wt-omni-widget__buttons-menu-opacity); // configured style
    border-radius: var(--border-radius--square);
    background: var(--main-color);

    // https://stackoverflow.com/a/30104683
    --menu-buttons-gap: 10px;

    &, &__hidden-buttons-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--menu-buttons-gap);
    }

    &--expanded {
      pointer-events: auto;
    }

    &:hover {
      opacity: 1;
      box-shadow: var(--morf-style-up-100);
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
