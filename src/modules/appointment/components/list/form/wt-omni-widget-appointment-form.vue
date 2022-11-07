<template>
  <form class="wt-omni-widget-appointment-form">
    <div class="wt-omni-widget-appointment-form__title">
      {{ $t('appointment.form.title') }}
    </div>
    <wt-input
      :label="$t('appointment.form.name')"
      :value="value.name"
      :v="v.draft.name"
      required
      @input="handleInput({ prop: 'name', value: $event })"
    ></wt-input>
    <tel-input
      :label="$t('appointment.form.destination')"
      :value="value.destination"
      :v="v.draft.destination"
      required
      @input="handleInput({ prop: 'destination', value: $event })"
    ></tel-input>
    <wt-input
      v-if="showEmail"
      :label="$t('appointment.form.email')"
      :value="value.email"
      @input="handleInput({ prop: 'email', value: $event })"
    ></wt-input>
    <wt-textarea
      v-if="showMessage"
      :label="$t('appointment.form.message')"
      :value="value.message"
      stretched
      @input="handleInput({ prop: 'message', value: $event })"
    ></wt-textarea>
  </form>
</template>

<script>
import TelInput from './wt-tel-input.vue';

export default {
  name: 'wt-omni-widget-appointment-form',
  components: { TelInput },
  props: {
    value: {
      type: Object,
      required: true,
    },
    v: {
      type: Object,
    },
  },
  computed: {
    showEmail() {
      return this.config.appointment.showEmailField;
    },
    showMessage() {
      return this.config.appointment.showMessageField;
    },
  },
  methods: {
    handleInput({ prop, value }) {
      const draft = { ...this.value };
      draft[prop] = value;
      this.$emit('input', draft);
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-appointment-form {
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: var(--app-gap-md);
    color: var(--contrast-color);
    &__title {
      @extend %typo-body-md;
      padding: var(--main-app-padding);
      font-weight: 600;
    }
  }
}
</style>
