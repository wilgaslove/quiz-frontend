import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import QuizPlay from '@/views/QuizPlay.vue'

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
      component: () => import('@/views/AdminQuiz.vue'),
      meta: { requiresAuth: true, adminOnly: true }
    },
    {
      path: '/admin/create',
      component: () => import('@/views/CreateQuiz.vue'),
      meta: { requiresAuth: true, adminOnly: true }
    },
    {
      path: '/admin/edit/:id',
      component: () => import('@/views/EditQuiz.vue'),
      meta: { requiresAuth: true, adminOnly: true }
    },
  ],
})