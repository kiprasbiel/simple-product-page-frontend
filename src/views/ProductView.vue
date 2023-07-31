<script setup lang="ts">

import ProductCard from "@/components/ProductCard.vue";
import axios from "axios";
import type {Ref} from "vue";
import {ref} from "vue";

interface productResponse {
  id: Number,
  SKU: String,
  size: String,
  photo_url: String,
  created_at: String
}

const products: Ref<[productResponse]|null> = ref(null);

axios.get('http://localhost/api/products', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("kinfirm-token")
  }
}).then((response: axios.AxiosResponse<[productResponse]>) => {
  products.value = response.data;
});

</script>

<template>
  <div class="grid grid-cols-4 justify-items-center">
    <template v-for="product in products">
      <ProductCard :SKU="product.SKU" :id="product.id" :created_at="product.created_at" :photo_url="product.photo_url" :size="product.size"/>
    </template>
  </div>
</template>

<style scoped>

</style>