import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import QuizPlay from '@/views/admin/QuizPlay.vue'

// const Dashboard = () => import('@/views/admin/Dashboard.vue')
// const QuizPlay = () => import('@/views/user/QuizPlay.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },

    {
      path: '/login',
      component: Login,
    },

    // 👤 USER
    {
      path: '/dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/quiz/:id',
      component: QuizPlay,
      meta: { requiresAuth: true },
    },

    // 👨‍💼 ADMIN
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminQuiz.vue'),
      meta: { requiresAuth: true, adminOnly: true },
    },
    {
      path: '/admin/create',
      component: () => import('@/views/admin/CreateQuiz.vue'),
      meta: { requiresAuth: true, adminOnly: true },
    },
    {
      path: '/admin/edit/:id',
      component: () => import('@/views/admin/EditQuiz.vue'),
      meta: { requiresAuth: true, adminOnly: true },
    },
  ],
})


export default router;