<template>
    
    <div class="relative flex flex-col min-h-screen bg-[#f1f5f9] dark:bg-[#0f172a]">
        <img class="absolute top-0 left-0 z-10" :src="greenBlurEffect" alt="" srcset="">
        <NuxtLoadingIndicator />
        <PartialsAuthNavbar />

        <div class="relative flex-1 z-50">
            
            <div class="relative" >
                <NuxtPage />
            </div>
        </div>

        <img class="absolute top-0 right-0 z-10" :src="yellowBlurEffect" alt="" srcset="">

    </div>
</template>

<script setup>
import greenBlurEffect from '~/assets/img/green-blur-effect.png'
import yellowBlurEffect from '~/assets/img/yellow-blur-effect.png'
</script>