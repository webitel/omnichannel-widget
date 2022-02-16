<!-- eslint-disable -->
<template>
  <i class="wt-icon">
    <svg
      class="wt-icon__icon"
      :class="`wt-icon__icon--${size}`"
      :style="iconStyle"
    >
      <use :xlink:href="iconName"></use>
    </svg>
  </i>
</template>

<script>
export default {
  name: 'wt-icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'md',
    },
    color: {
      type: String,
      default: 'main',
      options: ['main', 'contrast'],
    },
    iconPrefix: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconName() {
      let name = '#';
      if (this.iconPrefix) name += `${this.iconPrefix}-`;
      return `${name}${this.icon}`;
    },
    iconStyle() {
      return {
        '--icon-color': `var(--icon-${this.color}-color)`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: var(--transition);
  }

  /*svg instead of .icon to override styles by .icon-icon-name-size without any other selectors*/
  svg {
    display: flex;
    width: 24px;
    height: 24px;
    stroke-width: 0;
    fill: var(--icon-color);
    stroke: var(--icon-color);
    transition: var(--transition);
  }

  .wt-icon__icon {
    //&--xl {
    //  width: var(--icon-xl-size);
    //  height: var(--icon-xl-size);
    //}
    //
    //&--lg {
    //  width: var(--icon-lg-size);
    //  height: var(--icon-lg-size);
    //}

    &--md {
      width: 24px;
      height: 24px;
    }

    &--sm {
      width: 12px;
      height: 12px;
    }
  }
}
</style>
