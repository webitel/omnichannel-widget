<template>
  <div
    class="wt-input wt-tel-input"
    :class="{
      'wt-input--invalid': invalid,
    }"
  >
    <wt-label
      v-if="hasLabel"
      :invalid="invalid"
      for="tel"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ requiredLabel }}</slot>
    </wt-label>
    <div class="wt-input__wrapper">
      <vue-tel-input
        :input-options="{
          placeholder: placeholder || label,
          required,
        }"
        :value="value"
        class="wt-tel-input__input"
        v-on="listeners"
      ></vue-tel-input>
    </div>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
import validationMixin from '../../../../../app/mixins/validationMixin/validationMixin';

export default {
  name: 'wt-tel-input',
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
        // validate: this.handleValidate,
      };
    },
  },
  methods: {
    inputHandler(value, { number }) {
      this.$emit('input', number || '');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../app/css/styleguide/wt-input/wt-input';

#wt-omni-widget {
  .wt-tel-input__input {
    transition: var(--transition);
    color: var(--contrast-color);
    border: none;
    border-radius: var(--border-radius--square);
    outline: none;
    background: var(--main-color);
    box-shadow: var(--morf-style-down-50);

    ::v-deep {
      .vti__input {
        @extend %typo-body-md;
        @include wt-placeholder;
        padding: 10px 15px 10px 10px;
        border-radius: var(--border-radius--square);
      }

      .vti__dropdown-list {
        z-index: 2; // overlap calendar
        @media (max-width: $breakpoint-xs) {
          width: 250px !important;
        }
      }
    }
  }

  &.wt-omni-widget--rounded {
    .wt-input__wrapper {
      &:before {
        border-radius: var(--border-radius--rounded);
      }
    }

    .wt-tel-input__input {
      border-radius: var(--border-radius--rounded);

      ::v-deep {
        .vti__input {
          border-radius: var(--border-radius--rounded);
        }
      }
    }
  }
}
</style>
