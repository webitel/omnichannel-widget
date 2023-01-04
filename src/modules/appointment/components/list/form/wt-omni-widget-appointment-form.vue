<template>
  <form class="wt-omni-widget-appointment-form">
    <div class="wt-omni-widget-appointment-form__title">
      {{ $t('appointment.form.title') }}
    </div>
    <wt-input
      :label="$t('appointment.form.name.label')"
      :placeholder="$t('appointment.form.name.placeholder')"
      :value="value.name"
      :v="v.draft.name"
      required
      @input="handleInput({ prop: 'name', value: $event })"
    ></wt-input>
    <tel-input
      :label="$t('appointment.form.destination.label')"
      :placeholder="$t('appointment.form.destination.placeholder')"
      :value="value.destination"
      :v="v.draft.destination"
      required
      @input="handleInput({ prop: 'destination', value: $event })"
    ></tel-input>
    <wt-input
      v-if="showEmail"
      :label="$t('appointment.form.email.label')"
      :placeholder="$t('appointment.form.email.placeholder')"
      :value="value.email"
      @input="handleInput({ prop: 'email', value: $event })"
    ></wt-input>
    <wt-textarea
      v-if="showMessage"
      :label="$t('appointment.form.message.label')"
      :placeholder="$t('appointment.form.message.placeholder')"
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
      draft[prop] = prop !== 'name' ? value.trim() : value.trimStart().replace(/\s{2,}/g, ' '); // leave last space if it`s name input;
      this.$emit('input', draft);
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-omni-widget-appointment-form {
    flex: 0 0 250px;
    display: flex;
    flex-direction: column;
    gap: var(--gap-md);
    color: var(--contrast-color);

    @media (max-width: $breakpoint-lg) {
      flex: 0 0 200px;
    }

    @media (max-width: $breakpoint-xs) {
      flex: 0 0 fit-content;
    }

    &__title {
      @extend %typo-heading-md;
      padding: var(--main-app-padding);

      @media (max-width: $breakpoint-xs) {
        text-align: center;
      }
    }

    .wt-textarea {
      flex-grow: 1;

      @media (max-width: $breakpoint-xs) {
        flex-grow: initial;
      }
    }
  }
}
</style>
