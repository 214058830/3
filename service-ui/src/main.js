import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'; // 导入组件库
import 'iview/dist/styles/iview.css'; // 导入样式
import axios from 'axios'
import Qs from 'qs'

Vue.config.productionTip = false
Vue.use(iView);
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
