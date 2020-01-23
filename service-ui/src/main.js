import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'; // 导入iview库
import 'iview/dist/styles/iview.css'; // 导入iview样式
import axios from 'axios' // 导入axios
import Qs from 'qs'

Vue.config.productionTip = false
Vue.use(iView);
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;
axios.defaults.withCredentials = true // 允许axios跨域请求带cookie

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}