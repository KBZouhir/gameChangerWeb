<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { locale, setLocale } = useI18n()
const { $moment } = useNuxtApp()
$moment.locale('fr')



</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.is-scrollbar-hidden{
  scrollbar-width: none;
}

</style>