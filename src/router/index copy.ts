import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import QuizPlay from '@/views/QuizPlay.vue'
import Result from '@/views/Result.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'admin/dashboard',
    },
    {
      path: '/login',
      component: Login,
    },
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

    {
  path: "/admin",
  component: () => import("@/views/AdminQuiz.vue")
},
{
  path: "/admin/create",
  component: () => import("@/views/CreateQuiz.vue")
},
{
  path: "/admin/edit/:id",
  component: () => import("@/views/EditQuiz.vue")
}

    // afichge des résultats
    // {
    //   path: '/result/:quizId',
    //   name: 'Result',
    //   component: Result,
    // },
  ],
})



router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
