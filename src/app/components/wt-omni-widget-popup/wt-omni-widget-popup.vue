<template>
  <aside class="wt-omni-widget-popup">
    <section class="wt-omni-widget-popup__popup">
      <wt-omni-widget-header
        @close="$emit('close')"
      ></wt-omni-widget-header>
      <article class="wt-omni-widget-popup__main">
        <slot name="main">
          <the-appointment></the-appointment>
        </slot>
      </article>
    </section>
  </aside>
</template>

<script>
import TheAppointment from '../../../modules/appointment/components/wt-omni-widget-appointment.vue';
import WtOmniWidgetHeader from '../wt-omni-widget-window/wt-omni-widget-window-header/wt-omni-widget-window-header.vue';

export default {
  name: 'wt-omni-widget-popup',
  components: {
    WtOmniWidgetHeader,
    TheAppointment,
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-popup {
    position: fixed;
    z-index: 1111;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: hsla(0, 0%, 20%, 0.8); // copy-pasted --contrast-color without opacity
  }

  .wt-omni-widget-popup__popup {
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 1024px;
    height: 608px;
    max-height: 100%;
    margin: var(--main-app-padding);
    padding: var(--main-app-padding);
    border-radius: var(--border-radius--square);
    background: var(--background-color);
    gap: var(--gap-md);

    @media (max-width: $breakpoint-lg) {
      width: 800px;
      height: 538px;
    }

    @media (max-width: $breakpoint-md) {
      width: 648px;
      height: 484px;
    }

    @media (max-width: $breakpoint-sm) {
      width: 540px;
      height: 484px;
    }

    @media (max-width: $breakpoint-xs) {
      width: calc(100% - 2 * var(--main-app-padding)); // - 2 margins
      height: calc(100% - 2 * var(--main-app-padding)); // - 2 margins
    }
  }

  .wt-omni-widget-popup__main {
    @extend %wt-scrollbar;
    @extend %typo-body-md;
    flex-grow: 1;
    min-height: 0;
    overflow-y: auto;
    padding-right: var(--gap-sm);
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-popup__popup {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
