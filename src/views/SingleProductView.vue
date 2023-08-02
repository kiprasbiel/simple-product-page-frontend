<script setup lang="ts">

import {useRoute} from "vue-router";
import axios from "axios";
import {Ref, ref} from "vue";
import Select from "@/components/Select.vue";
import ProductCard from "@/components/ProductCard.vue";

interface Product {
  id: Number,
  SKU: String,
  size: String,
  photo_url: String,
  created_at: String
}

interface ProductRelations {
  content: {
    description: String
  }
  tags: [{
    title: String
  }],
  stocks: [{
    stock: Number,
    location: String
  }]
}

type productResponse = Product & ProductRelations;

interface similarProductsResponse {
  products: [
    Product
  ],
  title: String,
  id: Number
}

const route = useRoute();

const product: Ref<productResponse> = ref({});
const similarProducts: Ref<[similarProductsResponse]> = ref({});

axios.get(import.meta.env.VITE_API_ENDPOINT + 'product/' + route.params.id, {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("kinfirm-token")
  }
}).then((response: axios.AxiosResponse<productResponse>) => {
  product.value = response.data;
  if (product.value.tags.length > 0) {
    loadSimilarProducts(product.value.id);
  }
});

function loadSimilarProducts(id) {
  axios.get(import.meta.env.VITE_API_ENDPOINT + 'product/' + id + '/similar', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("kinfirm-token")
    }
  }).then((response) => {
    similarProducts.value = response.data;
  })
}


</script>

<template>

  <div>
    <template v-if="product">
      <div class="md:flex items-start justify-center py-12 px-4">
        <div>
          <img class="w-full" alt="image of a girl posing" :src="product.photo_url"/>
        </div>
        <div class="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div class="pb-6">
            <h1 class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">{{
                product.SKU
              }}</h1>
            <div class="pt-2" v-if="product.tags">
            <span v-for="tag in product.tags"
                  class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{{
                tag.title
              }}</span>
            </div>
          </div>
          <div v-if="product.content">
            <p>{{ product.content.description }}</p>
          </div>
          <div>
            Size: {{ product.size }}
          </div>
          <div v-if="product.stocks && product.stocks.length > 0">
            <Select v-model="product.stocks"/>
          </div>
          <div v-else>
            Out of stock
          </div>
        </div>
      </div>
      <div v-if="similarProducts.length">
        <div class="text-center text-2xl">
          Similar products:
        </div>
        <div class="md:flex items-start justify-center py-5 px-4">
          <template v-for="tag in similarProducts">
            <template v-for="product in tag.products">
              <ProductCard :SKU="product.SKU" :id="product.id" :created_at="product.created_at" :photo_url="product.photo_url" :size="product.size"/>
            </template>
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <div><b>Product not found</b></div>
    </template>
  </div>
</template>

<style scoped>

</style>