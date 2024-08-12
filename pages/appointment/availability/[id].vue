<template>
    <div class="bg-[#f1f5f9] dark:bg-[#0f172a]">
        <div class="mx-auto w-full max-w-screen-xl px-2 py-8">
            <div class="flex justify-between items-center">
                <h2>Available days</h2>
                <div>
                    <VueDatePicker v-model="date" month-picker @update:model-value="handleDate" auto-apply
                        :min-date="new Date()" :dark="color.value == 'dark' ? true : false"></VueDatePicker>
                </div>
            </div>
        </div>

        <div ref="dateContainer"
            class="flex space-x-6 items-center mx-auto w-full max-w-screen-xl overflow-auto px-4 py-4 scrollbar-thin scrollbar-h-2 scrollbar-thumb-rounded-full dark:scrollbar-thumb-slate-900 scrollbar-thumb-slate-300/80 dark:scrollbar-track-slate-800/80 scrollbar-track-slate-100">
            <div v-for="{ day, name } in daysOfMonth" :key="day">
                <button :class="dayClassCondition(day)" :disabled="day < new Date().getDate()"
                    @click="getAvailableSlots(day)"
                    class="border rounded-md p-6 flex flex-col justify-center items-center w-20 h-20 dark:text-white text-black cursor-pointer">
                    <h2 class="font-semibold text-md">{{ name }}</h2>
                    <h3 class="font-bold text-2xl">{{ day }}</h3>
                </button>
            </div>
        </div>

        <div class="flex flex-wrap justify-center my-4 p-4  mx-auto w-full max-w-screen-xl">
            <template v-if="availableSlots">
                <button v-for="(slot, index) in Object.keys(availableSlots)" :key="index"
                    :disabled="!availableSlots[slot].is_available" @click="selectAppointment(slot)" :class="{
                        'bg-emerald-400 text-white dark:border-slate-900': availableSlots[slot].is_available && appointmentDate === slot,
                        'dark:bg-slate-800 hover:cursor-not-allowed opacity-30': !availableSlots[slot].is_available,
                        'border rounded-md dark:border-slate-800 p-6 m-2 flex justify-center items-center w-20 h-20 dark:text-white text-black cursor-pointer': true
                    }" class="border rounded-md dark:border-slate-800 p-6 m-2 flex justify-center items-center w-20 h-20 dark:text-white text-black cursor-pointer">
                    {{ convertTo12HourFormat(slot) }}
                </button>
            </template>

            <USkeleton v-else v-for="i in 31" class="w-20 h-20 rounded-md m-2" />
        </div>

        <div class="w-full max-w-screen-xl mx-auto py-8">
            <UTextarea v-model="description" :rows="8" class="mb-4" />
            <div class="flex justify-end">
                <UButton label="Book now" class="dark:bg-emerald-600 disabled:bg-emerald-600 dark:hover:bg-white"
                    color="primary" size="md"></UButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment-timezone';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { getAvailableTimeSlots } from '~/composables/store/useAppointment'



const route = useRoute()
const color = useColorMode()

const { $moment } = useNuxtApp()
const id = route.params.id

const date = ref(new Date())
const daysOfMonth = ref()

const availableSlots = ref([])
const selectedDay = ref(new Date().getDate())

const dateContainer = ref()
const appointmentDate = ref()


definePageMeta({
    layout: 'auth',
    title: 'Service',
    middleware: ['auth']
})

const dayClassCondition = (day) => {
    let currentDate = true
    if (date.value?.month && date.value?.year) {
        currentDate = date.value.month + 1 == new Date().getMonth() + 1 && date.value.year == new Date().getFullYear()
    }
    if (day < new Date().getDate() && currentDate) {
        return 'opacity-50 dark:border-slate-800 hover:cursor-not-allowed'
    } else {
        if (day == selectedDay.value && currentDate) {
            return 'bg-emerald-400 text-white dark:border-slate-900'
        } else {
            return 'bg-white dark:bg-slate-800 dark:border-slate-900'
        }
    }
}


const getAvailableSlots = async (day) => {
    availableSlots.value = null
    let result = null
    selectedDay.value = day
    if (date.value?.year && date.value?.month) {
        result = await getAvailableTimeSlots(id, `${date.value.year}-${date.value.month + 1}-${day}`)
    } else {
        result = await getAvailableTimeSlots(id, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${day}`)
    }

    availableSlots.value = result
}


const handleDate = () => {
    if (date.value) {
        getDaysInMonth(date.value.month + 1, date.value.year)
    }
}


const getDaysInMonth = (month, year) => {
    const days = [];
    const date = new Date(year, month - 1, 1)

    while (date.getMonth() === month - 1) {
        const day = date.getDate();
        const dayName = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase()
        days.push({ day, name: dayName });
        date.setDate(day + 1)
    }

    daysOfMonth.value = days;
}


const convertTo12HourFormat = (dateTime) => {
    const timeZone = moment.tz.guess();
    return moment.tz(dateTime, timeZone).format('hh:mm A');
}

const selectAppointment = (slot) => {
    appointmentDate.value = slot
}

const getDataFromApi = async () => {
    getDaysInMonth(new Date().getMonth() + 1, new Date().getFullYear())
    getAvailableSlots(new Date().getDate())
}

watchEffect(() => {
    getDataFromApi();
});




</script>


<style>
.dp__theme_dark {
    --dp-background-color: #1e293b;
    --dp-text-color: #fff;
    --dp-hover-color: #484848;
    --dp-hover-text-color: #fff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #34d399;
    --dp-primary-disabled-color: #61a8ea;
    --dp-primary-text-color: #fff;
    --dp-secondary-color: #a9a9a9;
    --dp-border-color: #2d2d2d;
    --dp-menu-border-color: #2d2d2d;
    --dp-border-color-hover: #aaaeb7;
    --dp-border-color-focus: #aaaeb7;
    --dp-disabled-color: #232323;
    --dp-disabled-color-text: #d0d0d0;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: #00701a;
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #959595;
    --dp-danger-color: #e53935;
    --dp-marker-color: #e53935;
    --dp-tooltip-color: #3e3e3e;
    --dp-highlight-color: rgb(0 92 178 / 20%);
    --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
    --dp-range-between-border-color: var(--dp-hover-color, #fff);
}

.dp__theme_light {
    --dp-background-color: #fff;
    --dp-text-color: #212121;
    --dp-hover-color: #f3f3f3;
    --dp-hover-text-color: #212121;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #34d399;
    --dp-primary-disabled-color: #6bacea;
    --dp-primary-text-color: #f8f5f5;
    --dp-secondary-color: #c0c4cc;
    --dp-border-color: #ddd;
    --dp-menu-border-color: #ddd;
    --dp-border-color-hover: #aaaeb7;
    --dp-border-color-focus: #aaaeb7;
    --dp-disabled-color: #f6f6f6;
    --dp-scroll-bar-background: #f3f3f3;
    --dp-scroll-bar-color: #959595;
    --dp-success-color: #76d275;
    --dp-success-color-disabled: #a3d9b1;
    --dp-icon-color: #959595;
    --dp-danger-color: #ff6f60;
    --dp-marker-color: #ff6f60;
    --dp-tooltip-color: #fafafa;
    --dp-disabled-color-text: #8e8e8e;
    --dp-highlight-color: rgb(25 118 210 / 10%);
    --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
    --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}
</style>