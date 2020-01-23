import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import HomePage from '@/components/HomePage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/fetchExample',
    name: 'fetchExample',
    component: () => import(/* webpackChunkName: "fetchExample" */ '../views/FetchExample.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
