import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {sync} from 'vuex-router-sync'
import '@/assets/stylus/index.styl'
import '@/assets/js/rewrite'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/scss/font-awesome.scss'
Vue.config.productionTip = false

Vue.use(ElementUI)
if (window.localStorage) {
// 如果需要多次使用到的话，放入vuex(缓存中)，之后调用速度会加快，
  let system = JSON.parse(window.localStorage.getItem('system') || '{}')
  let user = JSON.parse(window.localStorage.getItem('user') || '{}')
  let agencyId = window.localStorage.getItem('agencyId')
  let systype = window.sessionStorage.getItem('systype') || null
  let systemLength = Object.keys(system).length
  if (systemLength > 0 && !systype) {
    systype = Object.keys(system)[systemLength - 1]
  }
  let localMenus = systype ? system[systype].menus : []
  let token = systype ? system[systype].token : ''

  store.commit('SET_TOKEN', token)
  store.commit('SET_MENUS', localMenus)
  store.commit('SET_SYSTYPE', systype)
  store.commit('SET_USER', user)
  store.commit('SET_AGENCYID', agencyId)
}

sync(store, router)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
