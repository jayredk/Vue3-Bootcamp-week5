import userProductModal from './userProductModal.js';





const app = Vue.createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/',
      apiPath: 'jayredk-hex',
      products: [],
      product: {},
      cart:[],
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getProducts() {
      const loader = this.$loading.show();
      axios.get(`${this.apiUrl}api/${this.apiPath}/products`)
      .then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          loader.hide();
        } else {
          alert(res.data.message);
        }
        // this.$loading.hide();
      })
      .catch((err) => {
        console.log(err);
      });
    },
    getProduct(id) {
      this.product = this.products.filter((item) => item.id === id)[0];
      const loader = this.$loading.show();
      this.$refs.userProductModal.openModal();
      loader.hide();
    },
    getCart() {
      const loader = this.$loading.show();
      axios.get(`${this.apiUrl}api/${this.apiPath}/cart`)
      .then((res) => {
        if (res.data.success) {
          this.cart = res.data.data;
          loader.hide();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    addToCart(id, qty = 1) {
      const loader = this.$loading.show();
      axios.post(`${this.apiUrl}api/${this.apiPath}/cart`, { "data":{"product_id": id, "qty": qty} })
      .then((res) => {
        if (res.data.success) {
          this.getCart();
          this.$refs.userProductModal.closeModal();
          alert(res.data.message);
          loader.hide();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    },
    updateCart(cartId, id, qty) {
      const loader = this.$loading.show();
      axios.put(`${this.apiUrl}api/${this.apiPath}/cart/${cartId}`, { "data": {"product_id": id, "qty": qty } })
      .then((res) => {
        if (res.data.success) {
          this.getCart();
          alert(res.data.message);
          loader.hide();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    removeFromCart(id) {
      const loader = this.$loading.show();
      axios.delete(`${this.apiUrl}api/${this.apiPath}/cart/${id}`)
      .then((res) => {
        if (res.data.success) {
          this.getCart();
          alert(res.data.message);
          loader.hide();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    removeAllCart() {
      let loader = this.$loading.show();
      axios.delete(`${this.apiUrl}api/${this.apiPath}/carts`)
      .then((res) => {
        if (res.data.success) {
          this.getCart();
          alert(res.data.message);
          loader.hide();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    checkOut() {
      let loader = this.$loading.show();
      axios.post(`${this.apiUrl}api/${this.apiPath}/order`,{ data:this.form })
      .then((res) => {
        if (res.data.success) {
          this.$refs.form.resetForm();
          alert(res.data.message);
          this.getCart();
          loader.hide();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
});


VeeValidateI18n.loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});

VeeValidate.defineRule('email', VeeValidateRules['email']);
VeeValidate.defineRule('numeric', VeeValidateRules['numeric']);
VeeValidate.defineRule('required', VeeValidateRules['required']);
VeeValidate.defineRule('min', VeeValidateRules['min']);
VeeValidate.defineRule('max', VeeValidateRules['max']);


app.use(VueLoading);
app.component('userProductModal', userProductModal);

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app');