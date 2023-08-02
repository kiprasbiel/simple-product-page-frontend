<script setup lang="ts">
import {Ref, ref} from "vue";
import axios from "axios";
import ErrorMessage from "@/components/errorMessage.vue";
import router from "@/router";
import Input from "@/components/Input.vue";

  const email: Ref<string> = ref('');
  const password: Ref<string> = ref('');
  const message: Ref<string> = ref('');

  function login() {
    axios.post(import.meta.env.VITE_API_ENDPOINT + 'login', {
      email: email.value,
      password: password.value
    }).then((response) => {
      if(response.data.token){
        localStorage.setItem("kinfirm-token", response.data.token);
        router.go(0);
      }
      else {
        message.value = response.data.message;
      }
    })
  }
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>


    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <ErrorMessage v-if="message" :message="message"/>
      <form class="space-y-6">

        <Input v-model="email" id="email" name="email" type="email" required="true">
          <template v-slot:title>Email</template>
        </Input>

        <Input v-model="password" id="password" name="password" type="password" required="true">
          <template v-slot:title>Password</template>
        </Input>

        <div>
          <button @click="login()" type="button" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</template>


<style scoped>

</style>