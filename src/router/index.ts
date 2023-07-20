import {createRouter, createWebHistory} from 'vue-router'
import type {RouteLocationNormalized} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import axios from "axios";
import RegisterView from "@/views/RegisterView.vue";

interface ToInterface extends RouteLocationNormalized {
    meta: { requiresAuth: boolean }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: { requiresAuth: false }
    },
  ]
})

router.beforeEach(async (to: ToInterface) => {
  let isLoggedIn;
  await axios.head('http://localhost/api/me', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("kinfirm-token")
    }
  }).then(() => {
    isLoggedIn = true;
  }).catch(() => {
    isLoggedIn = false;
  });

  if (to.meta.requiresAuth && !isLoggedIn) {
    router.push('/login');
  }
  else if (!to.meta.requiresAuth && isLoggedIn) {
    router.push('/about');
  }
});

export default router
