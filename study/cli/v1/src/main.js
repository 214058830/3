import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 产生一个app的实例化对象
new Vue({
  render: h => h(App),
}).$mount('#app')
