<template>
  <form class="wt-omni-widget-appointment-form">
    <wt-input
      :label="$t('appointment.form.name')"
      :value="value.name"
      @input="handleInput({ prop: 'name', value: $event })"
    ></wt-input>
    <tel-input
      :label="$t('appointment.form.destination')"
      :value="value.destination"
      @input="handleInput({ prop: 'destination', value: $event })"
    ></tel-input>
    <wt-input
      v-if="showEmail"
      :label="$t('appointment.form.email')"
      :value="value.email"
      @input="handleInput({ prop: 'email', value: $event })"
    ></wt-input>
    <wt-input
      v-if="showMessage"
      :label="$t('appointment.form.message')"
      :value="value.message"
      @input="handleInput({ prop: 'message', value: $event })"
    ></wt-input>
  </form>
</template>

<script>
import TelInput from './tel-input.vue';
export default {
  name: 'wt-omni-widget-appointment-form',
  components: { TelInput },
  props: {
    value: {
      type: Object,
      required: true,
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
    gap: 8px;
  }
}
</style>
