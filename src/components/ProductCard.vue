<script setup lang="ts">

interface productResponse {
  id: Number,
  SKU: String,
  size: String,
  photo_url: String
}

defineProps<productResponse>();

</script>

<template>
  <div class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
    <a class="relative mx-3 mt-3 flex h-60 overflow-hidden justify-center" :href="'/products/' + SKU">
      <img class="object-cover" :src="photo_url" alt="product image" />
    </a>
    <div class="mt-4 px-5 pb-5">
      <a :href="'/products/' + SKU">
        <h5 class="text-xl tracking-tight text-slate-900">{{ SKU }}</h5>
      </a>
    </div>
  </div>

</template>

<style scoped>

</style>