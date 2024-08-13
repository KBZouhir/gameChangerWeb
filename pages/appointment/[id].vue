<template>
    <div class="bg-[#f1f5f9] dark:bg-[#0f172a]">
        <div class="max-w-screen-xl mx-auto py-4">
            {{ appointment }}
        </div>
    </div>
</template>

<script setup>
import { getAppointment } from '~/composables/store/useAppointment'

const appointment = ref()

const route = useRoute()
const id = route.params.id

definePageMeta({
    layout: 'auth',
    title: 'Service',
    middleware: ['auth']
})

const getDataFromApi = async () => {
    const result = await getAppointment(id)
    if(result?.success){
        appointment.value = result?.appointment
    }
}

watchEffect(() => {
    getDataFromApi();
});
</script>