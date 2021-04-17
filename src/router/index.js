import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import Products from '../views/Products.vue';
import Overview from '../views/Overview.vue';
import UserProfile from '../views/UserProfile.vue';
import Orders from '../views/Orders.vue';
import { auth, db } from '../firebase/config';

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
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'products/',
        name: 'Products',
        component: Products,
        meta: {
          // requiresAuth: true,
          requiresStaff: true,
        },
      },
      {
        path: 'overview/',
        name: 'Overview',
        component: Overview,
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
        meta: {
          // requiresAuth: true,
          requiresStaff: true,
        },
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'),
  },
  {
    path: '/products-list',
    name: 'ProductsList',
    component: () => import('../views/ProductsList.vue'),
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/Payment.vue'),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const requiresStaff = to.matched.some((x) => x.meta.requiresStaff);
  const { currentUser } = auth;
  if (requiresStaff) {
    const docRef = db.collection('profiles').doc(currentUser.uid);
    docRef.get().then((doc) => {
      const { isStaff } = doc.data();
      if (isStaff) {
        next();
      } else {
        next('/');
      }
    });
  }

  if (requiresAuth && !currentUser) {
    next('/');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
