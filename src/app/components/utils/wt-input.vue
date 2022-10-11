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
    invalid() {
      return true;
    },
  },
  methods: {
    inputHandler(event) {
      this.$emit('input', event.target.value.trim());
    },
  },
};
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-input {
    cursor: text;
  }

  .wt-input__wrapper {
    position: relative;
  }

  .wt-label {
    margin-left: 15px;
    margin-bottom: 5px;
  }

  .wt-input__input {
    @extend %typo-body-md;
    @include wt-placeholder;

    position: relative;
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 15px;
    transition: var(--transition);
    color: var(--contrast-color);
    border-radius: var(--border-radius--square);
    box-shadow: var(--morf-style-down-50);
    border: none;
    outline: none;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      border: 1px solid red;
    }
  }

  &.wt-omni-widget--rounded {
    .wt-input__input {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
