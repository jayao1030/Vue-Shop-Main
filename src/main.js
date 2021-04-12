import Vue from 'vue';
import { $, jQuery } from 'jquery';
import VueFirestore from 'vue-firestore';
import Swal from 'sweetalert2';
import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import tw from 'vee-validate/dist/locale/zh_TW.json';
import store from './store';
import { auth } from './firebase/config';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import 'popper.js';

require('firebase/firestore');

Vue.use(VueFirestore, {
  key: 'id',
  enumerable: true,
});

// 設置成 false 以阻止 vue 在啟動時生成生產提示
Vue.config.productionTip = false;

window.$ = $;
window.jQuery = jQuery;

// 安裝所有 VeeValidate 規則
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize('zh_TW', tw);
// 註冊全域元件
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

let app;

auth.onAuthStateChanged((user) => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
  console.log(user);
});

// sweetalert
window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showCancelButton: false,
  timer: 3000,
});

window.Toast = Toast;
