import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import router from './router'
import store from './store'
import '@/assets/stylus/font.styl'
import '@/assets/stylus/base.styl'
import {getCookie} from './assets/js/tools'

Vue.config.productionTip = false
Vue.use(VueRouter)

if (getCookie('id')) {
  let username = window.localStorage.getItem('username')
  store.commit('SET_USERNAME', username)
}
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
