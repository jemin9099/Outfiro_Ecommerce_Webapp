import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/index.vue'
import axios from "@/axios"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta:{
        title:'Home',
        requiresAuth: false,
        isAdmin: false
      }
    },
    {
      path: '/shop/listing',
      name: 'listing',
      component: () => import('../views/shop/listing/index.vue'),
      meta:{
        title:'Listing',
        requiresAuth: false,
        isAdmin: false
      }
    },
    {
      path: '/shop/account',
      name: 'address',
      component: () => import('../views/shop/account/index.vue'),
      meta:{
        title:'Account Page',
        requiresAuth: false,
        isAdmin: false
      }
    },
    {
      path: '/shop/checkout',
      name: 'checkout',
      component: () => import('../views/shop/checkout/index.vue'),
      meta:{
        title:'Checkout Page',
        requiresAuth: false,
        isAdmin: false
      }
    },
    {
      path: '/shop/orderSuccess',
      name: 'order-success',
      component: () => import('../views/shop/orderSuccess.vue'),
      meta:{
        title:'Checkout Page',
        requiresAuth: false,
        isAdmin: false
      }
    },
    {
      path: '/shop/paymentSuccess',
      name: 'payment-success',
      component: () => import('../views/shop/paymentSuccess.vue'),
      meta:{
        title:'Payment Success Page',
        requiresAuth: false,
        isAdmin: false
      }
    },
    {
      path: '/shop/search',
      name: 'search',
      component: () => import('../views/shop/search.vue'),
      meta:{
        title:'Search Product Page',
        requiresAuth: false,
        isAdmin: false
      }
    },
    {
      path:'/admin/',
      name:'admin',
      children:[
        {
          path:'dashboard',
          name:'dashboard',
          component: () => import('../views/Admin/dashboard.vue'),
          meta:{
            title:'Dashboard',
            requiresAuth: true,
            isAdmin: true
          },
        },
        {
          path:'products',
          name:'products',
          component: () => import('../views/Admin/product/index.vue'),
          meta:{
            title:'Dashboard',
            requiresAuth: true,
            isAdmin: true
          },
        },
        {
          path:'orders',
          name:'orders',
          component: () => import('../views/Admin/orders/index.vue'),
          meta:{
            title:'Order page',
            requiresAuth: true,
            isAdmin: true
          },
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component: () => import('../views/Auth/login.vue'),
      meta:{
        title:'Login',
        layout:'auth',
      }
    },
    {
      path:'/register',
      name:'register',
      component: () => import('../views/Auth/register.vue'),
      meta:{
        title:'Register',
        layout:'auth',
      }
    }
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('userData') && localStorage.getItem('token');
  const isAdmin = isLoggedIn && JSON.parse(localStorage.getItem('userData')).role === 'admin';

  // If trying to access login/register page while already logged in
  if ((to.path === '/login' || to.path === '/register') && isLoggedIn) {
    if (isAdmin) {
      next('/admin/dashboard'); // Redirect admin to the admin dashboard
    } else {
      next('/'); // Redirect regular user to the home page
    }
  }
  // If the route requires authentication and the user is not logged in
  else if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login'); // Redirect to login page if not authenticated
  }

  else if(to.path ==='/shop/account' && !isLoggedIn){
    next('/login')
  }
  // If the route requires admin role and the user is not an admin
  else if (to.meta.isAdmin && !isAdmin) {
    next('/'); // Redirect non-admin user to homepage
  }
  // If the user is an admin and trying to access non-admin routes, allow it
  else if (isAdmin && !to.meta.isAdmin) {
    next('/admin/dashboard'); // Allow the admin to access any non-admin route
  }
  else {
    next(); // Proceed to the requested route
  }
});


export default router
