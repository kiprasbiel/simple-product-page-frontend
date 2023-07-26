<script setup lang="ts">

import {useRoute} from "vue-router";
import axios from "axios";
import {ref} from "vue";
import Select from "@/components/Select.vue";

interface productResponse {
  id: Number,
  SKU: String,
  size: String,
  photo_url: String,
  created_at: String
  content: {
    description: String
  }
  tags: [String],
  stocks: {
    stock: Number,
    location: String
  }
}

const route = useRoute();

const product = ref();

axios.get('http://localhost/api/product/' + route.params.id, {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("kinfirm-token")
  }
})
    .then((response: axios.AxiosResponse<productResponse>) => {
      product.value = response.data;
      console.log(product.value);
    });

</script>

<template>

  <template v-if="product">
    <div class="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      <div>
        <img class="w-full" alt="image of a girl posing" :src="product.photo_url" />
      </div>
      <div class="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div class="pb-6">
          <h1 class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">{{ product.SKU }}</h1>
        </div>
        <div>
          <p>{{ product.content.description }}</p>
        </div>
        <div>
          Size: {{ product.size }}
        </div>
        <div>
          <Select v-model="product.stocks"/>
        </div>
      </div>
    </div>
  </template>

</template>

<style scoped>

</style>