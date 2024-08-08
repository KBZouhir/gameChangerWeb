<template>
    <div>
        <client-only>
            <VueTimepicker format="HH:mm" hour-label=" " minute-label=" " :minute-interval="15" v-model="yourTimeValue">
                <template v-slot:icon>
                    <Icon name="tabler:clock" size="20" />
                </template>
            </VueTimepicker>
        </client-only>
    </div>
</template>


<script setup>
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'

const yourTimeValue = ref()

definePageMeta({
    layout: 'auth',
    title: 'Forgot password',
    middleware: ['auth']
})

</script>

<style>
.vue__time-picker input.vue__time-picker-input {
    border: none !important;
    width: 100% !important;
}

.vue__time-picker .dropdown,.vue__time-picker, .vue__time-picker .dropdown .select-list {
    width: 100% !important;
}

.dark .vue__time-picker .dropdown,.vue__time-picker {
    background-color: #1e293b !important;
}

.dark .vue__time-picker .dropdown ul li{
    color: #FFF !important;
}
.dark .vue__time-picker .dropdown ul.minutes{
    border-left: 1px solid #000 !important;
}
</style>