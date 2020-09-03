import Vue from 'vue';
import Router from 'vue-router';
import CityView from '@/views/city/CityView.vue';
import BuildingView from '@/views/building/BuildingView.vue';
import DemoView from '@/views/map-demo/DemoView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/demo',
      name: 'demo-view',
      component: DemoView,
    },
    {
      path: '/',
      name: 'city-view',
      component: CityView,
    },
    {
      path: '/building/:id',
      name: 'building-view',
      component: BuildingView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
