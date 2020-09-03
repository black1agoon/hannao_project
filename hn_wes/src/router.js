import Vue from 'vue'
import Router from 'vue-router'
import RankList from './views/RankList'
import StorageConsole from './views/StorageConsole'
import ProductionProgress from './views/ProductionProgress'
import StockInAgv from './views/StockInAgv'
import StockInCart from './views/StockInCart'
import Checkshop from './views/Checkshop'
import Workshop from './views/Workshop'
import Dashboard from './views/Dashboard'
import WorkEquip from './views/WorkEquip'
import MainView from './views/MainView'
import Backshop from './views/Backshop'
Router.prototype.goBack = function() {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router)
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: {
        name: 'dashboard'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/ranklist',
      name: 'rank-list',
      component: RankList
    },
    {
      path: '/storageconsole',
      name: 'storage-console',
      component: StorageConsole
    },
    {
      path: '/productionprogress',
      name: 'production-progress',
      component: ProductionProgress
    },
    {
      path: '/stockinagv',
      name: 'stockinagv',
      component: StockInAgv
    },
    {
      path: '/stockincart',
      name: 'stockincart',
      component: StockInCart
    },
    {
      path: '/checkshop',
      name: 'checkshop',
      component: Checkshop
    },
    {
      path: '/workshop',
      name: 'workshop',
      component: Workshop
    },
    {
      path: '/workequip',
      name: 'workequip',
      component: WorkEquip
    },
    {
      path: '/mainview',
      name: 'mainview',
      component: MainView
    },
    {
      path: '/backshop',
      name: 'backshop',
      component: Backshop
    }
  ]
})

export default router