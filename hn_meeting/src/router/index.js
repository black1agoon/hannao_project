import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
// Routing logic
Vue.use(VueRouter)
let router = new VueRouter({
  routes: routes,
  mode: 'history',
  base: process.env.BASE_URL
})
router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
      if (store.state.token) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    } else {
      next()
    }
  })

export default router
