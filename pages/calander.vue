<template>
    <div>
        <client-only>
            <VDatePicker v-model="date" mode="time" is24hr hide-time-header/>
            {{ date }}
        </client-only>
    </div>
</template>


<script setup>
const date = ref(new Date())

definePageMeta({
    layout: 'auth',
    title: 'Forgot password',
    middleware: ['auth']
})

</script>