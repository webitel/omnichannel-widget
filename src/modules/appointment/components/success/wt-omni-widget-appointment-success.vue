<template>
  <section class="wt-omni-widget-appointment-success">
    <p class="wt-omni-widget-appointment-success__title">
      {{ $t('appointment.success.congratulations') }}
      <br>
      {{ $t('appointment.success.title') }}
    </p>
    <div class="wt-omni-widget-appointment-success__time-wrapper">
      <div class="wt-omni-widget-appointment-success__info-wrapper wt-omni-widget-appointment-success__info-wrapper--time">
        <img alt="canedar" src="../../assets/appointment-success-calendar.svg">
        {{ new Date(appointment.scheduleDate).toLocaleDateString() }}
      </div>
      <div class="wt-omni-widget-appointment-success__info-wrapper wt-omni-widget-appointment-success__info-wrapper--time">
        <img alt="clock" src="../../assets/appointment-success-clock.svg">
        {{ appointment.scheduleTime }}
      </div>
    </div>
    <div class="wt-omni-widget-appointment-success__info-wrapper wt-omni-widget-appointment-success__info-wrapper--info">
      <p class="wt-omni-widget-appointment-success__info-line">
        <span class="wt-omni-widget-appointment-success__info-line-title">
          {{ $t('appointment.form.name.label') }}:</span> {{ appointment.name }}
      </p>
      <p class="wt-omni-widget-appointment-success__info-line">
        <span class="wt-omni-widget-appointment-success__info-line-title">
          {{ $t('appointment.form.destination.label') }}:</span> {{ appointment.destination }}
      </p>
      <p v-if="showEmail" class="wt-omni-widget-appointment-success__info-line">
        <span class="wt-omni-widget-appointment-success__info-line-title">
          {{ $t('appointment.form.email.label') }}:</span> {{ appointment.variables.email }}
      </p>
      <p v-if="showMessage" class="wt-omni-widget-appointment-success__info-line">
        <span class="wt-omni-widget-appointment-success__info-line-title">
          {{ $t('appointment.form.message.label') }}:</span> {{ appointment.variables.message }}
      </p>
    </div>
    <error-section />
    <div class="wt-omni-widget-appointment-success__actions">
      <wt-button
        color="danger"
        @click="removeAppointment"
      >{{ $t('appointment.success.cancel') }}
      </wt-button>
      <wt-button
        @click="close"
      >{{ $t('reusable.ok') }}
      </wt-button>
    </div>
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import ErrorSection from '../_shared/error/error-section.vue';

export default {
  name: 'wt-omni-widget-appointment-success',
  components: {
    ErrorSection,
  },
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      appointment(state) {
        return getNamespacedState(state, this.namespace).appointmentState.appointment || {};
      },
    }),
    showEmail() {
      return this.appointment.variables?.email;
    },
    showMessage() {
      return this.appointment.variables?.message;
    },
  },
  methods: {
    ...mapActions({
      removeAppointment(dispatch, payload) {
        return dispatch(`${this.namespace}/REMOVE_APPOINTMENT`, payload);
      },
    }),
    close() {
      this.$eventBus.$emit('close-popup');
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-appointment-success {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    min-height: 100%;
    padding: 32px;
    gap: 32px;
  }

  .wt-omni-widget-appointment-success__title {
    @extend %typo-heading-lg;
    text-align: center;
  }

  .wt-omni-widget-appointment-success__info-wrapper {
    @extend %typo-heading-md;
    padding: 16px;
    border-radius: var(--border-radius--square);
    background: var(--main-color);

    &--time {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    &--info {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      width: 100%;
      gap: 8px;
    }
  }

  .wt-omni-widget-appointment-success__time-wrapper {
    display: grid;
    width: 100%;
    gap: 32px;
    grid-template-columns: 1fr 1fr;

    @media (max-width: $breakpoint-xs) {
      grid-template-columns: 1fr;
    }
  }

  .wt-omni-widget-appointment-success__info-line {
    @extend %typo-body-md;
  }

  .wt-omni-widget-appointment-success__info-line-title {
    @extend %typo-heading-md;
  }

  .wt-omni-widget-appointment-success__actions {
    display: flex;
    justify-content: center;
    gap: var(--gap-md);

    .wt-button {
      min-width: 200px;
    }

    @media (max-width: $breakpoint-xs) {
      flex-direction: column-reverse;
    }
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-appointment-success__info-wrapper {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
