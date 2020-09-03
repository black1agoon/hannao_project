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
      if (store.state.token || (window.sessionStorage.getItem('token'))) {
        next()
      } else {
        let systype = ''
        let system = JSON.parse(window.localStorage.getItem('system') || '{}')
        let systemLength = Object.keys(system).length
        if (systemLength > 0) {
          systype = Object.keys(system)[systemLength - 1]
        }
        if (systype === 'company') {
          next({
            path: '/company/login'
          })
        } else {
          next({
            path: '/login'
          })
        }
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
