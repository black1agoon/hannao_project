import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CheckView from '../views/CheckView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/checkview',
    name: 'CheckView',
    component: CheckView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
