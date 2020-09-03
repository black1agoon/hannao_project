import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
import api from '@/api'
// Routing logic
Vue.use(VueRouter)
let router = new VueRouter({
  routes: routes,
  mode: 'history',
  base: process.env.BASE_URL
})
router.beforeEach((to, from, next) => {
    let tabs = store.state.tabs
    if (to.meta.tab !== false) {
      if (!tabs.find(tab => tab.path === to.path)) {
        store.commit('ADD_TAB', {
          ...to,
          title: to.meta.title || to.name,
          keep: to.meta.keep || false
        })
      }
    }
    if (to.path !== '/login') {
      if (store.state.token) {
        next()
      } else if (to.name === 'light-map' && to.query.id) {
        api.public.login({
          from: '0',
          agencyId: 1,
          username: 'admin',
          password: '666777'
        }).then((data) => {
          let token = data.token
          let menus = data['permissionList']
          store.commit('SET_USER', {
            name: data.userName,
            id: data.userId
          })
          store.commit('SET_TOKEN', token)
          store.commit('SET_MENUS', menus)
          store.commit('SET_SYSTYPE', 'pac')
          store.commit('SET_AGENCYID', data.agencyId)
          let system = JSON.parse(window.localStorage.getItem('system')) || {}
          system['pac'] = {
            token: token,
            menus: menus,
            username: data.userName
          }
          window.localStorage.setItem('system', JSON.stringify(system))
          window.sessionStorage.setItem('systype', 'pac') // session中保存当前 系统
          window.localStorage.setItem('agencyId', data.agencyId)
          window.localStorage.setItem('user', JSON.stringify({
            name: data.userName,
            id: data.userId
          }))
          next()
        }).catch(() => {
        })
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
