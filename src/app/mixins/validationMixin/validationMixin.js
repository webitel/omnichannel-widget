export default {
  props: {
    // validation rules
    v: {
      type: Object,
    },
    customValidators: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isValidation() {
      return !!this.v && !!Object.keys(this.v).length;
    },
    invalid() {
      return this.isValidation && this.v.$error;
    },
  },
};
