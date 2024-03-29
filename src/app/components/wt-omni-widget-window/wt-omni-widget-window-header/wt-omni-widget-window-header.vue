<template>
  <header class="wt-omni-widget-window-header">
    <div class="logo">
      <img
        :src="logoUrl"
        alt="Webitel logo"
        @dblclick="showVersionInfo"
      >
    </div>
    <div
      v-if="isBuildInfo"
      class="version-info"
    >v{{ buildInfo.release }}--{{ buildInfo.build }}
    </div>
    <wt-icon-btn
      v-show="!hideCloseBtn"
      icon="close"
      size="sm"
      @click="$emit('close')"
    ></wt-icon-btn>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import SessionState from '../../../../modules/call/enums/SessionState.enum';
import WebitelLogo from '../../../assets/img/logo.svg';
import WidgetChannel from '../../../enums/WidgetChannel.enum';

export default {
  name: 'wt-omni-widget-window-header',
  data: () => ({
    isBuildInfo: false,
    buildInfo: {
      release: process.env.VUE_APP_PACKAGE_VERSION,
      build: process.env.VUE_APP_BUILD_NUMBER,
    },
  }),
  props: {
    channel: {
      type: String, // WidgetChannel.enum
      required: true,
    },
  },
  computed: {
    ...mapState('call', {
      callSessionState: (state) => state.sessionState,
    }),
    logoUrl() {
      const { logoUrl } = this.config.view;
      return logoUrl || WebitelLogo;
    },
    hideCloseBtn() {
      // https://my.webitel.com/browse/WTEL-4027
      return this.channel === WidgetChannel.CALL && this.callSessionState !== SessionState.IDLE;
    },
  },
  methods: {
    showVersionInfo() {
      this.isBuildInfo = true;
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-window-header {
    position: relative; // reset styles
    min-height: auto; // reset styles
    height: auto; // reset
    min-width: auto; // reset
    width: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--header-padding);
    background: var(--wt-omni-widget__accent-color);
    border-radius: var(--border-radius--square);

    .logo {
      width: 24px;
      height: 24px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-window-header {
      border-radius: var(--border-radius--rounded);
    }
  }

  .version-info {
    @extend %typo-body-md;
    color: var(--main-color);
  }
}
</style>
