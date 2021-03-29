import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import Products from '../views/Products.vue';
import MyOrders from '../views/MyOrders.vue';
import UserProfile from '../views/UserProfile.vue';
import Orders from '../views/Orders.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: 'products/',
        name: 'Products',
        component: Products,
      },
      {
        path: 'my-orders/',
        name: 'MyOrders',
        component: MyOrders,
      },
      {
        path: 'profile/',
        name: 'UserProfile',
        component: UserProfile,
      },
      {
        path: 'orders/',
        name: 'Orders',
        component: Orders,
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
