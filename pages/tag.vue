<template>
    <div class="col-span-4 md:col-span-2 mx-auto p-2">
      tag input
      <client-only placeholder="Loading...">
        <VueTagsInput v-model="tag" :tags="tags"/>
      </client-only>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const tag = ref()
  const tags = ref([]);
  </script>