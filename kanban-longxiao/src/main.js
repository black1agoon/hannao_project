import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import filters from './utils/filters'

import 'animate.css'
import './styles/index.scss'
import './styles/development.scss'
import './styles/home.scss'

Vue.config.productionTip = false

Object.entries(filters).forEach(([name, fn]) => {
  Vue.filter(name, fn)
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
