import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/index.vue'

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

export default router
