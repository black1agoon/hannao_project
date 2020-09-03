import Vue from 'vue'
import VueRouter from 'vue-router'

import MobileView from './MobileView'
import MobileRoutes from './mobile.routes'
import store from './store'
import './static/stylus/base.styl'

const router = new VueRouter({
  routes: MobileRoutes,
  mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash'
})

let isnew = JSON.parse(window.localStorage.getItem('isnew') || 'false')
store.commit('SET_NEW', isnew)

Vue.use(VueRouter)
/* eslint-disable no-new */
new Vue({
  el: '#mobile',
  router,
  store,
  render: h => h(MobileView)
})
