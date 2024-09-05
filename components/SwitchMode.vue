<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

defineProps({
  label: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md'
  }
})

</script>
<template>
  <ClientOnly>
    <button @click="isDark = !isDark" :class="label ? 'flex justify-between items-center w-full' : ''">
      <span v-if="label" class="truncate">{{label}}</span>

      <UIcon :name="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" class="text-[#676f7d]" />
      
    </button>
    
    <template #fallback>
      <div class="w-8 h-8"></div>
    </template>
  </ClientOnly>
</template>