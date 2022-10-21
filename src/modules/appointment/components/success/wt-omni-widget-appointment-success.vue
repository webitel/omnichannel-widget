<template>
  <section class="wt-omni-widget-appointment-success">
    <p class="wt-omni-widget-appointment-success__title">
      {{ $t('appointment.success.congratulations') }}
      <br>
      {{ $t('appointment.success.title') }}
    </p>
    <div class="wt-omni-widget-appointment-success__time-wrapper">
      <div class="wt-omni-widget-appointment-success__info-wrapper wt-omni-widget-appointment-success__info-wrapper--time">
        <img src="../../assets/appointment-success-calendar.svg" alt="canedar">
        {{ new Date(appointment.scheduleDate).toLocaleDateString() }}
      </div>
      <div class="wt-omni-widget-appointment-success__info-wrapper wt-omni-widget-appointment-success__info-wrapper--time">
        <img src="../../assets/appointment-success-clock.svg" alt="clock">
        {{ appointment.scheduleTime }}
      </div>
    </div>
    <div class="wt-omni-widget-appointment-success__info-wrapper wt-omni-widget-appointment-success__info-wrapper--info">
      <p class="wt-omni-widget-appointment-success__info-line">
        <b>{{ $t('appointment.form.name') }}:</b> {{ appointment.name }}
      </p>
      <p class="wt-omni-widget-appointment-success__info-line">
        <b>{{ $t('appointment.form.destination') }}:</b> {{ appointment.destination }}
      </p>
      <p class="wt-omni-widget-appointment-success__info-line" v-if="showEmail">
        <b>{{ $t('appointment.form.email') }}:</b> {{ variables.destination }}
      </p>
      <p class="wt-omni-widget-appointment-success__info-line" v-if="showMessage">
        <b>{{ $t('appointment.form.message') }}:</b> {{ variables.destination }}
      </p>
    </div>
    <wt-button
      color="danger"
      @click="removeAppointment"
    >{{ $t('appointment.success.cancel') }}
    </wt-button>
  </section>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'wt-omni-widget-appointment-success',
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
      variables(state) {
        return getNamespacedState(state, this.namespace).appointmentState.variables || {};
      },
    }),
    showEmail() {
      return this.variables.email;
    },
    showMessage() {
      return this.variables.message;
    },
  },
  methods: {
    ...mapActions({
      removeAppointment(dispatch, payload) {
        return dispatch(`${this.namespace}/REMOVE_APPOINTMENT`, payload);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-appointment-success {
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    padding: 32px;
  }
  .wt-omni-widget-appointment-success__title {
    @extend %typo-heading-lg;
    text-align: center;
  }
  .wt-omni-widget-appointment-success__info-wrapper {
    @extend %typo-strong-md;
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
      flex-grow: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
  .wt-omni-widget-appointment-success__time-wrapper {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr 1fr;
    width: 100%;
  }
  .wt-omni-widget-appointment-success__info-line {
    @extend %typo-body-md;
  }
  .wt-button {
    min-width: 168px;
  }

  &.wt-omni-widget--rounded {
    .wt-omni-widget-appointment-success__info-wrapper {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
