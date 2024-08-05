<template>
    <div>
        show service
    </div>
</template>

<script setup>
const route = useRoute()

console.log(route.params.id);

definePageMeta({
    layout: 'auth',
    title: 'Show Service',
    middleware: ['auth']
})

</script>