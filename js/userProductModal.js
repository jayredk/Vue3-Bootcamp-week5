export default {
  template: '#userProductModal',
  props:['product'],
  data() {
    return {
      modal: '',
      qty: 1,
    }
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    }
  },
  watch: {
    qty() {
      if (typeof(this.qty) !== 'number') {
        this.qty = 1;
      }
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  }
}