import Vue from 'vue';

export default Vue.extend({
  name: 'LaBase',
  props: {
    i18n: {
      type: [String, Boolean],
      default: false,
    },
  },
  methods: {
    translate(text: string) {
      return this.$t([this.i18n, text].join('.')) as string;
    },
  },
});
