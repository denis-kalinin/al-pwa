import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import HomePage from '@/components/HomePage.vue';
// import LoginFormCentered from '@/components/auth/LoginFormCentered.vue';

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
    path: '/tableList',
    name: 'tableList',
    component: () => import(/* webpackChunkName: "leftmenu" */ '../views/TableListView.vue'),
  },
  /*
  {
    path: '/login',
    name: 'login',
    component: LoginFormCentered,
  },
  */
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
