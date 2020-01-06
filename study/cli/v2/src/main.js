import Vue from 'vue'
import App from './App.vue'
// 注册全局组件
// 1. 引入组件
import User from './components/User'
// 2. 注册全局组件
Vue.component("user", User);
// 3. 可以在任何地方使用了
// 使用方式 <user/>
Vue.config.productionTip = false

// 产生一个app的实例化对象
new Vue({
  render: h => h(App),
}).$mount('#app')
