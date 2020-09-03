import Vue from 'vue'
import axios from 'axios'
import KaoqinView from './views/KaoqinView'
import './styles/kaoqin.scss'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios

new Vue({
  render: h => h(KaoqinView),
}).$mount('#app')
