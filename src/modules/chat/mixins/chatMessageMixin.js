export default {
  props: {
    message: {
      type: Object,
    },
    namespace: {
      type: String,
      required: true,
    },
  },
  computed: {
    my() {
      return this.$store.getters[`${this.namespace}/IS_MY_MESSAGE`](this.message);
    },
  },
};
