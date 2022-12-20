<template>
  <div
    class="wt-textarea"
    :class="{
      'wt-textarea--disabled': disabled,
      'wt-textarea--stretched': stretched,
    }"
  >
    <wt-label
      :for="name"
      :disabled="disabled"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ requiredLabel }}</slot>
    </wt-label>
    <div class="wt-textarea__wrapper">
      <textarea
        :id="name"
        ref="wt-textarea"
        class="wt-textarea__textarea"
        :value="value"
        :placeholder="placeholder || label"
        :disabled="disabled"
        v-on="listeners"
      ></textarea>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wt-textarea',
    props: {
      /**
       * Current textarea value (`v-model`)
       */
      value: {
        type: String,
        default: '',
      },
      /**
       * textarea label
       */
      label: {
        type: String,
        default: '',
      },
      /**
       * textarea placeholder
       */
      placeholder: {
        type: String,
      },
      /**
       * Native textarea disabled attribute
       */
      disabled: {
        type: Boolean,
        default: false,
        description: 'Native textarea disabled attribute',
      },
      /**
       * textarea name
       */
      name: {
        type: String,
        default: '',
      },
      labelProps: {
        type: Object,
        description: 'Object with props, passed down to wt-label as props',
      },
      stretched: {
        type: Boolean,
        default: false,
        description: 'component takes not fixed but all available height',
      },
    },

    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: (event) => this.$emit('input', event.target.value),
          keypress: (event) => this.handleKeypress(event),
        };
      },

      requiredLabel() {
        return this.required ? `${this.label}*` : this.label;
      },
    },

    methods: {
      handleKeypress(event) {
        if (!this.chatMode) return;
        if (event.key === 'Enter' && !event.shiftKey) {
          this.$emit('enter');
          event.preventDefault();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
#wt-omni-widget {
  .wt-textarea {
    cursor: text;
  }

  .wt-label {
    margin-left: 15px;
    margin-bottom: 5px;
  }

  .wt-textarea__wrapper {
    position: relative;
  }

  .wt-textarea__textarea {
    @extend %typo-body-md;
    @include wt-placeholder;

    display: block;
    width: 100%;
    min-height: 64px;
    box-sizing: border-box;
    padding: 10px 15px;
    color: var(--contrast-color);
    border-radius: var(--border-radius--square);
    box-shadow: var(--morf-style-down-50);
    border: none;
    outline: none;
    resize: none;
  }

  .wt-textarea--stretched {
    display: flex;
    flex-direction: column;

    .wt-textarea__wrapper {
        flex-grow: 1;
    }

    .wt-textarea__textarea {
        height: 100%;
    }
  }

  &.wt-omni-widget--rounded {
    .wt-textarea__textarea {
      border-radius: var(--border-radius--rounded);
    }
  }
}
</style>
