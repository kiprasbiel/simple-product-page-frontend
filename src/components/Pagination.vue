<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div v-if="paginationStore.paginations" class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ paginationStore.paginations.from }}</span>
          to
          <span class="font-medium">{{ paginationStore.paginations.to }}</span>
          of
          <span class="font-medium">{{ paginationStore.paginations.total }}</span>
          results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <template v-for="(link, index) in paginationStore.paginations.links" :key="link.label">
            <template v-if="index === 0">
              <button :disabled="!link.url" @click="paginationStore.updatePage(getPageNumber(link.url))" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </template>
            <template v-else-if="index === paginationStore.paginations.links.length - 1">
              <button :disabled="!link.url" @click="paginationStore.updatePage(getPageNumber(link.url))" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </template>
            <template v-else-if="link.active">
              <a aria-current="page" class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ link.label }}</a>
            </template>
            <template v-else>
              <button @click="paginationStore.updatePage(getPageNumber(link.url))" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{{ link.label }}</button>
            </template>
          </template>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import {usePaginationStore} from "@/stores/PaginationStore";

const paginationStore = usePaginationStore();

function getPageNumber(url){
  return new URL(url).searchParams.get('page');
}
</script>