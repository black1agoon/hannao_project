import Vue from 'vue'
import Router from 'vue-router'
import HomeView from './views/HomeView'
// import config from '@/config'
import DashView from './views/DashView'
import MainView from './views/MainView'
Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.NODE_ENV === 'production' ? config.prev : process.env.BASE_URL,
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {
        name: 'mainView'
      }
    }, {
      path: '/homeview',
      name: 'homeview',
      component: HomeView
    }, {
      path: '/dashview',
      name: 'dashview',
      component: DashView
    }, {
      path: '/mainView',
      name: 'mainView',
      component: MainView
    }
  ]
})
