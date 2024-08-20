<template>
    <div class="max-w-screen-xl mx-auto py-4">
        <nuxt-link :to="`/masterclass/create`">
            <UButton label="Create" class="dark:bg-emerald-600 disabled:bg-emerald-600 dark:hover:bg-white"
                color="primary" size="md"></UButton>
        </nuxt-link>
    </div>
</template>


<script setup>
definePageMeta({
    layout: "auth",
    title: "Notification Page",
    middleware: ['auth']
})
</script>