<template>
    <div class="bg-[#f1f5f9] dark:bg-[#0f172a]">
        <div class="mx-auto w-full max-w-screen-xl px-2 py-8">
            <VDatePicker v-model="date" mode="month" hide-time-header />
            <input type="month">
            {{ date }}
        </div>
    </div>
</template>

<script setup>
import { getAvailableTimeSlots } from '~/composables/store/useAppointment'

const route = useRoute()
const id = route.params.id

const date = ref()


definePageMeta({
    layout: 'auth',
    title: 'Service',
    middleware: ['auth']
})


const getData = async () => {
    const result = await getAvailableTimeSlots(id, '2024-08-11')
    console.log(result);
    
}


watchEffect(() => {
    getData();
});


</script>