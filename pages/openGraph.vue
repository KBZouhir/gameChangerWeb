<template>
    <div>
      <input v-model="url" placeholder="Enter a URL" @keyup.enter="fetchOgData" />
      <button @click="fetchOgData">Fetch Open Graph Data</button>
  
      <div v-if="loading">Loading...</div>
  
      <div v-if="error" class="error">{{ error }}</div>
  
      <div v-if="ogData">
        <h3>Open Graph Data</h3>
        <ul>
          <li v-for="(content, property) in ogData" :key="property">
            <strong>{{ property }}:</strong> {{ content }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useFetch } from '#app';
  
  const url = ref('');
  const ogData = ref<Record<string, string> | null>(null);
  const loading = ref(false);
  const error = ref('');
  
  const fetchOgData = async () => {
    if (!url.value) return;
    
    loading.value = true;
    error.value = '';
    ogData.value = null;
  
    try {
      const { data, error: fetchError } = await useFetch(`/api/getOgData`, {
        params: { url: url.value },
      });
  
      if (fetchError.value) {
        error.value = fetchError.value.message;
      } else {
        ogData.value = data.value?.ogData || null;
      }
    } catch (err) {
      error.value = 'An error occurred while fetching the data.';
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  