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
      icon="close"
      size="sm"
      @click="$emit('close')"
    ></wt-icon-btn>
  </header>
</template>

<script>
import WebitelLogo from '../../../assets/img/logo.svg';

export default {
  name: 'wt-omni-widget-window-header',
  data: () => ({
    isBuildInfo: false,
    buildInfo: {
      release: process.env.VUE_APP_PACKAGE_VERSION,
      build: process.env.VUE_APP_BUILD_NUMBER,
    },
  }),
  computed: {
    logoUrl() {
      const { logoUrl } = this.config.view;
      return logoUrl || WebitelLogo;
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
