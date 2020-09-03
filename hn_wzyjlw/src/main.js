// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouterMultiView from 'vue-router-multi-view'

import VueTouch from 'vue-touch'
import ElementUI from 'element-ui'

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

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueRouterMultiView)
Vue.use(VueTouch, {name: 'v-touch'})

if (window.localStorage) {
// 如果需要多次使用到的话，放入vuex(缓存中)，之后调用速度会加快，
// 如果使用频率不高，就放在localstorage中好了
  let localMenus = JSON.parse(window.localStorage.getItem('menus') || '[]')
  let systype = window.localStorage.getItem('systype')
  let token = window.localStorage.getItem('token') || null
  store.commit('SET_TOKEN', token)
  store.commit('SET_MENUS', localMenus)
  store.commit('SET_SYSTYPE', systype)
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
