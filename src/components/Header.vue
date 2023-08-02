<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
        </a>
      </div>
      <template v-if="route.meta.requiresAuth">
        <PopoverGroup class="hidden lg:flex lg:gap-x-12">
          <RouterLink class="text-sm font-semibold leading-6 text-gray-900" to="/products">Products</RouterLink>
        </PopoverGroup>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <div @click="logout()" class="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">Log out<span aria-hidden="true">&rarr;</span></div>
        </div>
      </template>

      <div v-else-if="route.name === 'Login'" class="hidden lg:flex lg:flex-1 lg:justify-end">
      <RouterLink class="text-sm font-semibold leading-6 text-gray-900" to="/register">Register <span aria-hidden="true">&rarr;</span></RouterLink>
    </div>
      <div v-else-if="!route.meta.requiresAuth" class="hidden lg:flex lg:flex-1 lg:justify-end">
        <RouterLink class="text-sm font-semibold leading-6 text-gray-900" to="/login">Log in <span aria-hidden="true">&rarr;</span></RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import {RouteLocationNormalized, RouterLink, useRoute, useRouter} from 'vue-router'
import { PopoverGroup } from '@headlessui/vue'
import axios from "axios";

interface routeMeta extends RouteLocationNormalized {
  meta: { requiresAuth: boolean }
}

const route = <routeMeta> useRoute();
const router = useRouter();

function logout() {
  axios.post(import.meta.env.VITE_API_ENDPOINT + 'logout', {}, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("kinfirm-token")
    }
  }).then(() => {

    router.push('login');
  });
}

</script>

<style scoped>

</style>