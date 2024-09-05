<template>
  <div class="relative  bg-[#f1f5f9] dark:bg-[#0f172a]">
    <!-- <img class="absolute top-0 left-0 z-10" :src="greenBlurEffect" alt="" srcset=""> -->
    <NuxtLoadingIndicator />
    <NuxtSnackbar />

    <div class="flex flex-col min-h-screen">
      <partialsValidationNavbar />

      <div class="flex flex-1 items-center justify-center w-full max-w-[1065px] mx-auto p-4 md:p-0">
        <NuxtPage />
      </div>
    </div>
<PartialsFooter/>




  </div>
</template>


<script setup>
import greenBlurEffect from '~/assets/img/green-blur-effect.png'
import yellowBlurEffect from '~/assets/img/yellow-blur-effect.png'

</script>

<style></style>
