import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

let whframe = JSON.parse(window.localStorage.getItem('whframe') || '{}')
// let depId = window.localStorage.getItem('depId')
store.commit('SET_WHFRAME', whframe)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
