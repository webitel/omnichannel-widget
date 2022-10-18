<template>
  <div
    :class="{
      'wt-input--invalid': invalid,
    }"
    class="wt-input tel-input"
  >
    <wt-label
      v-if="hasLabel"
      for="tel"
      :invalid="invalid"
      :outline="outline"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ requiredLabel }}</slot>
    </wt-label>
    <div class="wt-input__wrapper">
      <vue-tel-input
        :value="value"
        class="wt-input__input"
        :input-options="{
          placeholder: placeholder || label,
          required,
        }"
        v-on="listeners"
      ></vue-tel-input>
    </div>
  </div>
</template>

<script>
// import { VueTelInput } from 'vue-tel-input';
// import 'vue-tel-input/dist/vue-tel-input.css';
import validationMixin from '../../../../../app/mixins/validationMixin/validationMixin';

const VueTelInput = () => Promise.all([
    import(/* webpackChunkName: "chunk-vue-tel-input" */ 'vue-tel-input'),
    import(/* webpackChunkName: "chunk-vue-tel-input" */ 'vue-tel-input/dist/vue-tel-input.css'),
  ]).then(([{ VueTelInput }]) => VueTelInput);

export default {
  name: 'tel-input',
  mixins: [validationMixin],
  components: { VueTelInput },
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
        validate: this.handleValidate,
      };
    },
  },
  methods: {
    inputHandler(event) {
      this.$emit('input', event.target.value.trim());
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>

</style>
