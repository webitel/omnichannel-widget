<template>
  <div
    :class="{
      'wt-input--invalid': invalid,
    }"
    class="wt-input"
  >
    <wt-label
      v-if="hasLabel"
      :for="name"
      :invalid="invalid"
      :outline="outline"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ requiredLabel }}</slot>
    </wt-label>
    <div class="wt-input__wrapper">
      <input
        :id="name"
        ref="wt-input"
        :max="numberMax"
        :min="numberMin"
        :placeholder="placeholder || label"
        :value="value"
        class="wt-input__input"
        v-on="listeners"
      >
    </div>
  </div>
</template>

<script>
import validationMixin from '../../mixins/validationMixin/validationMixin';

export default {
  name: 'wt-input',
  mixins: [validationMixin],
  props: {
    /**
     * Current input value (`v-model`)
     */
    value: {
      type: [String, Number],
      default: '',
    },
    /**
     * Form input label
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * Form input placeholder
     */
    placeholder: {
      type: String,
    },
    /**
     * Form input name
     */
    name: {
      type: String,
      default: '',
    },
    /**
     * Form input type
     */
    type: {
      type: String,
      default: 'text',
    },
    /**
     * Native input required attribute
     */
    required: {
      type: Boolean,
      default: false,
      description: 'Native input required attribute',
    },

    /**
     * Native number input restrictions
     */
    numberMin: {
      type: Number,
      default: 0,
    },

    /**
     * Native number input restrictions
     */
    numberMax: {
      type: Number,
    },

    outline: {
      type: Boolean,
      default: false,
    },

    labelProps: {
      type: Object,
      description: 'Object with props, passed down to wt-label as props',
    },
  },

  computed: {
    hasLabel() {
      return !!(this.label || this.$slots.label);
    },

    requiredLabel() {
      return this.required ? `${this.label}*` : this.label;
    },

    listeners() {
      return {
        ...this.$listeners,
        input: this.inputHandler,
      };
    },
  },
  methods: {
    inputHandler(event) {
      const value = this.name !== 'name' ? event.target.value.trim() : event.target.value.trimStart().replace(/\s{2,}/g, ' '); // leave last space if it`s name input
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../css/styleguide/wt-input/wt-input';
</style>
