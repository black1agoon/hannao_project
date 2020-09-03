import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import IframeView from '@/views/IframeView.vue';
import ContainerView from '@/views/ContainerView.vue';
import { appRoutes } from '@/router/routes';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: ContainerView,
    children: [{
      path: '',
      name: 'HomeView',
      component: HomeView,
    }, {
      path: 'classic',
      name: 'IframeView',
      component: IframeView,
    },
      ...appRoutes],
    // Add dynamic module routes here
  },
  {
    path: '/about',
    name: 'AboutView',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '*',
    name: 'NotFoundView',
    component: NotFoundView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
