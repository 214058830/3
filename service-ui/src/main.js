import Vue from 'vue'
import App from './Home.vue'
import router from './router'
import store from './store'
import iView from 'iview'; // 导入组件库
import 'iview/dist/styles/iview.css'; // 导入样式

Vue.config.productionTip = false
Vue.use(iView);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
