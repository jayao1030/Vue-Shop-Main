import Vue from 'vue';
import { $, jQuery } from 'jquery';
import VueFirestore from 'vue-firestore';
import Swal from 'sweetalert2';
import { auth } from './firebase/config';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import store from './store';

require('firebase/firestore');

Vue.use(VueFirestore, {
  key: 'id',
  enumerable: true,
});

Vue.config.productionTip = false;

window.$ = $;
window.jQuery = jQuery;

window.Swal = Swal;

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

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showCancelButton: false,
  timer: 3000,
});

window.Toast = Toast;
