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
      component: AdminDashboard,
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
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  // 🔒 accès protégé
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  // 👨‍💼 admin uniquement
  if (to.meta.adminOnly && user?.role !== 'admin') {
    return next('/dashboard')
  }

  // 🚀 redirection automatique si déjà connecté
  if (to.path === '/login' && token) {
    if (user?.role === 'admin') {
      return next('/admin')
    } else {
      return next('/dashboard')
    }
  }

  next()
})

export default router