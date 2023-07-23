<script setup lang="ts">
defineProps<{
  modelValue: String;
  id?: String;
  name: String;
  type: String;
  required?: Boolean;
}>();

defineEmits(['update:modelValue'])

</script>

<template>
  <div>
    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
      <slot name="title"></slot>
    </label>
    <div class="mt-2">
      <input
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :id="id" :name="name" :type="type" :autocomplete="name" :required="required" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    </div>
  </div>
</template>

<style scoped>

</style>