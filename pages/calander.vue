<template>
    <div>
        <button @click="getDaysInMonth(8, 2024)">Get Days of August 2024</button>
        <ul>
            <li v-for="day in daysOfMonth" :key="day.day">
                {{ day.day }} - {{ day.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>

const daysOfMonth = ref()



</script>