import Vue from 'vue'
import VueRouter from 'vue-router'

import Board from './Board.vue'
import Dashboard from './Dashboard'
import '@/board/static/stylus/index.styl'
import store from '../store'
Vue.use(VueRouter)
const routes = [
  {path: '/dashboard', component: Dashboard}
]
const router = new VueRouter({
  routes,
  mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash'
})

let system = JSON.parse(window.localStorage.getItem('system') || '{}')
let systype = window.sessionStorage.getItem('systype') || null
let systemLength = Object.keys(system).length
if (systemLength > 0 && !systype) {
  systype = Object.keys(system)[systemLength - 1]
}
let token = Object.keys(system).length > 0 ? system[systype].token : ''

store.commit('SET_TOKEN', token)
store.commit('SET_SYSTYPE', systype)


/* eslint-disable no-new */
new Vue({
  el: '#board',
  router,
  render: h => h(Board)
})
