import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ECharts from 'vue-echarts'
import 'echarts/map/js/china.js'
// import 'animate.css'

Vue.component('e-charts', ECharts)

Vue.config.productionTip = false
// let companyId = window.localStorage.getItem('companyId')
// let companyName = window.localStorage.getItem('companyName')
// store.commit('SET_COMPANYID', companyId)
// store.commit('SET_COMPANYNAME', companyName)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
