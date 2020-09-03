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
  let user = JSON.parse(window.localStorage.getItem('user') || '{}')
  let agencyId = window.localStorage.getItem('agencyId')
  let menus = JSON.parse(window.localStorage.getItem('menus') || '{}')
  let token = JSON.parse(window.localStorage.getItem('token') || null)

  store.commit('SET_TOKEN', token)
  store.commit('SET_MENUS', menus)
  store.commit('SET_USER', user)
  store.commit('SET_AGENCYID', agencyId)
}

sync(store, router)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
