import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'
Vue.use(VueRouter)

import 'animate.css'
import './styles/store.scss'

import ECharts from 'vue-echarts'
import 'echarts'

Vue.component('ECharts', ECharts)

Vue.config.productionTip = false

import MaterialStoreView from '@/views/MaterialStoreView'
import ProductStoreView from '@/views/ProductStoreView'
import MaterialTempView from './views/MaterialTempView'
import ProductTempView from './views/ProductTempView'
import JlwKanbanView from './views/JlwKanbanView'

const routes = [
  { path: '/', redirect: '/material' },
  { path: '/material', component: MaterialStoreView },
  { path: '/product', component: ProductStoreView },
  { path: '/jlwkanban', component: JlwKanbanView },
  { path: '/material-temp', component: MaterialTempView },
  { path: '/product-temp', component: ProductTempView },
]
const router = new VueRouter({
  routes,
  mode: 'hash',
})

let flowline = JSON.parse(window.localStorage.getItem('flowline') || '{}')
store.commit('jlw/SET_FLOWLINE', flowline)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
