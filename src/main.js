import Vue from 'vue';
import jQuery from 'jquery';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

window.$ = jQuery;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
