import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'; // 导入iview库
import 'iview/dist/styles/iview.css'; // 导入iview样式
import axios from 'axios' // 导入axios
import Qs from 'qs'
import ViewUI from 'view-design'; // 修改主题颜色
import '../my_theme/index.less'; // 修改主题颜色
import mavonEditor from 'mavon-editor' // 编辑器
import 'mavon-editor/dist/css/index.css' // 编辑器

Vue.config.productionTip = false
Vue.use(ViewUI); // 修改主题颜色
Vue.use(iView);
Vue.prototype.axios = axios; // axios
Vue.prototype.qs = Qs;
Vue.use(mavonEditor); // 编辑器
axios.defaults.withCredentials = true // 允许axios跨域请求带cookie

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 解决Vue-router在3.1之后把$router.push()方法改为了Promise，假如没有回调函数，错误信息就会交给全局的路由错误处理，因此就会报错NavigationDuplicated
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}