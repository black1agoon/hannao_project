// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouterMultiView from 'vue-router-multi-view'

import VueTouch from 'vue-touch'
import ElementUI from 'element-ui'
import VueLazyLoad from 'vue-lazyload'
import {sync} from 'vuex-router-sync'
import store from './store'
import router from './router'
import AppView from './App.vue'
import PicLookingMask from '@/app/header/PicLookingMask'

// css
import './assets/stylus/index.styl'
import 'font-awesome/scss/font-awesome.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component('pic-looking-mask', PicLookingMask)

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: 'static/img/log.png',
  loading: 'static/img/avatar.png',
  attempt: 1
})
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueRouterMultiView)
Vue.use(VueTouch, {name: 'v-touch'})

if (window.localStorage) {
// 如果需要多次使用到的话，放入vuex(缓存中)，之后调用速度会加快，
// 如果使用频率不高，就放在localstorage中好了

  let rgMsg = window.localStorage.getItem('rgmsg')
  let rgformdata = JSON.parse(window.localStorage.getItem('rgformdata') || '{}')
  let system = JSON.parse(window.localStorage.getItem('system') || '{}')
  let systype = window.sessionStorage.getItem('systype') || null
  let systemLength = Object.keys(system).length
  if (systemLength > 0 && !systype) {
    systype = Object.keys(system)[systemLength - 1]
  }
  let dashboards = systype ? system[systype].dashboards : []
  let username = systype ? system[systype].username : ''
  let localMenus = systype ? system[systype].menus : []
  let token = systype ? system[systype].token : ''


  store.commit('SET_TOKEN', token)
  store.commit('SET_MENUS', localMenus)
  store.commit('SET_SYSTYPE', systype)
  store.commit('SET_DASHBOARDS', dashboards)
  store.commit('SET_USER', username)
  store.commit('SET_RGMSG', rgMsg)
  store.commit('SET_RGFORM', rgformdata)
}
sync(store, router)
// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(AppView)
})
