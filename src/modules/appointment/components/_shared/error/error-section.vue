<template>
  <section
    v-if="showErrorSec"
    class="error-section"
  >
    <p class="error-section__text error-section__status">
      {{ statusLocale || error.status }}
    </p>
    <p
      class="error-section__text error-section__detail"
      v-show="showErrorDetail"
    >{{ error.detail }}</p>
  </section>
</template>

<script>
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import { mapState } from 'vuex';

export default {
  name: 'error-section',
  computed: {
    ...mapState('appointment', {
      error: (state) => state.error,
    }),
    showErrorSec() {
      return !isEmpty(this.error);
    },
    statusLocale() {
      const path = 'appointment.error.'.concat(this.error.status.replaceAll('.', '_'));
      return this.$te(path) ? this.$t(path) : false;
    },
    showErrorDetail() {
      return !this.statusLocale || this.error.status === 'store.sql_member.appointment.widget.app_error';
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .error-section {
    padding: var(--gap-md);
    background: var(--main-color);
    border-radius: var(--border-radius--square);
    width: 100%;
  }

  .error-section__text {
    @extend %typo-body-md;
    text-align: center;
    max-width: 60%;
    margin: auto;
    color: var(--negative-color);

    @media (max-width: $breakpoint-xs) {
      max-width: 100%;
    }
  }

  &.wt-omni-widget--rounded {
    .error-section {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
