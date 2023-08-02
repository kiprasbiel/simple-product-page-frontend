import {createRouter, createWebHistory} from 'vue-router'
import type {RouteLocationNormalized} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import axios from "axios";
import RegisterView from "@/views/RegisterView.vue";
import ProductView from "@/views/ProductView.vue";
import SingleProductView from "@/views/SingleProductView.vue";

interface ToInterface extends RouteLocationNormalized {
    meta: { requiresAuth: boolean }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    {
      path: '/products',
      name: 'Products',
      component: ProductView,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/:id',
      name: 'Product',
      component: SingleProductView,
      meta: { requiresAuth: true }
    }
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
