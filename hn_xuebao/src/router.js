import Vue from 'vue'
import Router from 'vue-router'
import OutinStoreView from './views/OutinStoreView'
import OutinDetailView from './views/OutinDetailView'
Vue.use(Router)
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: {
        name: 'OutinStoreView'
      }
    },
    {
      path: '/outinstore',
      name: 'OutinStoreView',
      component: OutinStoreView
    },
    {
      path: '/outindetail',
      name: 'OutinDetailView',
      component: OutinDetailView
    }
  ]
})

export default router