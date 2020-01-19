import Vue from 'vue'
import VueRouter from 'vue-router'
import Water from '../views/Water.vue'
import User from '../views/User.vue'
import Platform from '../views/Platform.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Error_404 from '../views/Error_404.vue'
import Index from '../components/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/water',
    meta: { title: '首页' },
    children: [
      {
        path: 'water',
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
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
    ]
  },
  {
    path: '*',
    name: '404',
    component: Error_404
  }
]

const router = new VueRouter({
  routes
})

export default router
