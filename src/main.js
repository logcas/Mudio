import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import FastClick from 'fastclick';
FastClick.attach(document.body);

import '@/assets/style/common.scss';
import '@/assets/js/rem.js';
import '@/assets/js/iconfont.js';

import apis from '@/http/api';
Vue.prototype.$http = apis;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
