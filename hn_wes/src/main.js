import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ECharts from 'vue-echarts'
// import 'animate.css'

// import 'echarts/map/js/china.js'

Vue.component('e-charts', ECharts)
Vue.config.productionTip = false
let stocklist = JSON.parse(window.localStorage.getItem('stocklist') || '[]')
let topic = window.localStorage.getItem('topic')
let showWaitTime = window.localStorage.getItem('showWaitTime')
let checkWages = JSON.parse(window.localStorage.getItem('checkWages'))
let depId = window.localStorage.getItem('depId')
let workshopId = window.localStorage.getItem('workshopId')
let whId = window.localStorage.getItem('whId')
let stepId = window.localStorage.getItem('stepId')
let flowCode = window.localStorage.getItem('flowCode')

store.commit('SET_STOCKLIST', stocklist)
store.commit('SET_TOPIC', topic)
store.commit('SET_SHOWWAITTIME', showWaitTime)
store.commit('SET_CHECKWAGES', checkWages)
store.commit('SET_DEPID', depId)
store.commit('SET_WORKSHOPID', workshopId)
store.commit('SET_WHID', whId)
store.commit('SET_STEPID', stepId)
store.commit('SET_FLOWCODE', flowCode)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
