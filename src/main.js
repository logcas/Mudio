import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/common.scss';
import '@/assets/js/rem.js';
import '@/assets/js/iconfont.js';
import FastClick from 'fastclick';
FastClick.attach(document.body);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
