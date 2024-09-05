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
      <UButton :size="size"
        class="text-primary hover:bg-slate-100 dark:hover:bg-white/5 dark:bg-slate-700 bg-slate-50 hover:bg-transparent"
        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray" variant="ghost"
        aria-label="Theme" />

    </button>
    <template #fallback>
      <div class="w-8 h-8"></div>
    </template>
  </ClientOnly>
</template>