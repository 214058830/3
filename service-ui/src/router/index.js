import Vue from 'vue'
import VueRouter from 'vue-router'
import Water from '../views/Water.vue'
import User from '../views/User.vue'
import Platform from '../views/Platform.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'water',
    component: Water
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/platform',
    name: 'platform',
    component: Platform
  }
]

const router = new VueRouter({
  routes
})

export default router
