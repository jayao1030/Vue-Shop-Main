import Vue from 'vue';
import { $, jQuery } from 'jquery';
import VueFirestore from 'vue-firestore';
import Swal from 'sweetalert2';
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
