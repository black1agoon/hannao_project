import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

VueRouter.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

// Routing logic
let router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  }
})
// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  if (!to.path.startsWith('/mobile')) {
    let tabs = store.state.tabs
    if (to.meta.tab !== false) {
      if (!tabs.find(tab => tab.path === to.path) && (!tabs.find(tab => tab.path.startsWith('/outside')))) {
        store.commit('ADD_TAB', {
          ...to,
          title: to.meta.title || to.name,
          keep: to.meta.keep || false
        })
      }
    }
    if (to.path !== '/login' && to.path !== '/company/login' && to.path !== '/company/register') {
      if (store.state.token || (window.localStorage && window.localStorage.getItem('token'))) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
