import { createRouter, createWebHistory } from 'vue-router'

// 🔓 Pages publiques
import Login from '@/views/Login.vue'

// 👤 USER
import UserDashboard from '@/views/user/Dashboard.vue'
import QuizPlay from '@/views/user/QuizPlay.vue'

// 👨‍💼 ADMIN (lazy loading recommandé)
const AdminDashboard = () => import('@/views/admin/Dashboard.vue')
const AdminQuiz = () => import('@/views/admin/AdminQuiz.vue')
const CreateQuiz = () => import('@/views/admin/CreateQuiz.vue')
const EditQuiz = () => import('@/views/admin/EditQuiz.vue')

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
      component: UserDashboard,
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
      component: () => import('@/views/admin/Dashboard.vue'),
      meta: { requiresAuth: true, adminOnly: true },
    },
    {
      path: '/admin/quiz',
      component: AdminQuiz,
      meta: { requiresAuth: true, adminOnly: true },
    },
    {
      path: '/admin/create',
      component: CreateQuiz,
      meta: { requiresAuth: true, adminOnly: true },
    },
    {
      path: '/admin/edit/:id',
      component: EditQuiz,
      meta: { requiresAuth: true, adminOnly: true },
    },
  ],
})

/**
 * 🔐 NAVIGATION GUARD GLOBAL
 */


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  let user = null
  try {
    const storedUser = localStorage.getItem('user')
    user = storedUser ? JSON.parse(storedUser) : null
  } catch {
    localStorage.removeItem('user')
  }

  // 🔒 1. Route protégée → login si pas connecté
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  // 👨‍💼 2. Route admin → bloquer si pas admin
  if (to.meta.adminOnly && user?.role !== 'admin') {
    return next('/dashboard')
  }

  // ✅ 3. Tout le reste passe
  next()
})
export default router