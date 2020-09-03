import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ProductLoadingView from './views/ProductLoadingView'
import MaterialLoadingView from './views/MaterialLoadingView'
import '@x22/kiraui/dist/kiraui.css'
import './styles/store-loading.scss'
import './styles/material.scss'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/material' },
    { path: '/product', name: 'ProductLoadingView', component: ProductLoadingView },
    { path: '/material', name: 'MaterialLoadingView', component: MaterialLoadingView },
  ],
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
