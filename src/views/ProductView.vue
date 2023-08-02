<script setup lang="ts">

import ProductCard from "@/components/ProductCard.vue";
import Pagination from "@/components/Pagination.vue";
import {usePaginationStore} from "@/stores/PaginationStore";

const paginationStore = usePaginationStore();
paginationStore.getProducts();

</script>

<template>
  <div class="grid grid-cols-4 justify-items-center">
    <template v-for="product in paginationStore.products">
      <ProductCard :SKU="product.SKU" :id="product.id" :photo_url="product.photo_url" :size="product.size"/>
    </template>
  </div>
  <div>
    <Pagination :paginations="paginationStore.paginations"/>
  </div>
</template>

<style scoped>

</style>