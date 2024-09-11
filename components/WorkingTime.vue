<template>
    <div class="mx-auto w-full max-w-screen-xl px-2 py-8">
        <UAlert variant="subtle" color="green" title="Setup working Time" icon="i-heroicons-clock">
            <template #title="{ title }">
                <span v-html="title" />
            </template>

            <template #description>
                You can config your working time <UButton variant="link" color="green" size="xs" @click="isOpen = true">
                    Set Working Time
                </UButton>
            </template>
        </UAlert>


        <USlideover v-model="isOpen">
            <div class="flex-1 overflow-y-auto">
                <div
                    class="flex sticky top-0 items-center justify-between bg-white dark:bg-gray-900 dark:border-b-gray-800 border-b z-50 p-4">
                    <h3 class="text-base font-bold leading-6 text-gray-900 dark:text-white">
                        Working hours
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="isOpen = false" />
                </div>
                <div class="flex-1 p-4 overscroll-y-auto">

                    <div class="flex items-center justify-between mb-2">
                        <div class="flex flex-col mb-4">
                            <h4 class="font-semibold text-xl">Allow appointment</h4>
                            <p class="text-slate-400 text-sm">By allow will be able to recive ppointments </p>
                        </div>
                        <UToggle v-model="allowAppointment" color="green" />
                    </div>

                    <div class="flex flex-col mb-4">
                        <h4 class="font-semibold text-xl">Duration</h4>
                        <p class="text-slate-400 text-sm">Setup the meeting duration , max duration is 60 min </p>
                    </div>
                    <div class="flex space-x-4 items-center mb-4">
                        <URange @change="changeDuration" color="green" class="flex-1" :max="60" :step="15"
                            v-model="meetDuration" />
                        <span>{{ meetDuration }}/60</span>
                    </div>

                    <div class="flex flex-col space-y-4 flex-1">
                        <div v-for="(day, index) in daysOfWeek" class="border dark:border-slate-800 rounded-lg p-4 over"
                            :class="(day.active) ? `` : `opacity-80`">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="font-semibold">{{ day.name }}</h3>
                                <!-- <UToggle color="green" v-model="day.active" size="sm" /> -->
                            </div>
                            <div class="flex flex-col space-y-4">
                                <div class="flex flex-col space-y-2" v-for="(range, rangeIndex) in day.timeRanges">
                                    <div class="flex justify-between items-center space-x-4">
                                        <div class="flex-1 text-sm flex justify-between border rounded-lg p-4"
                                            :class="(range.error ? 'border-red-600 dark:border-red-600' : 'dark:border-slate-800')">
                                            <div>
                                                <span class="mb-2 mr-2">From :</span>
                                                <client-only>
                                                    <VueTimepicker v-model="range.from" :disabled="!day.active"
                                                        format="HH:mm" auto-scroll
                                                        @change="validateTimeRange(index, rangeIndex)" hour-label=" "
                                                        close-on-complete minute-label=" " :minute-interval="15">
                                                        <template v-slot:icon>
                                                            <Icon name="tabler:clock" size="20" />
                                                        </template>
                                                    </VueTimepicker>
                                                </client-only>
                                                <!-- <input type="time" step="900" :disabled="!day.active"
                                                        v-model="range.from" class="bg-transparent"
                                                        @input="validateTimeRange(index, rangeIndex)" :padded="false"
                                                        variant="none" /> -->
                                            </div>
                                            <div class="border dark:border-slate-800 mx-4"></div>
                                            <div>
                                                <span class="mb-2 mr-2">To :</span>
                                                <client-only>
                                                    <VueTimepicker format="HH:mm" auto-scroll :disabled="!day.active"
                                                        v-model="range.to"
                                                        @change="validateTimeRange(index, rangeIndex)" hour-label=" "
                                                        close-on-complete minute-label=" " :minute-interval="15">
                                                        <template v-slot:icon>
                                                            <Icon name="tabler:clock" size="20" />
                                                        </template>
                                                    </VueTimepicker>
                                                </client-only>
                                                <!-- <input type="time" step="900" :disabled="!day.active"
                                                        :min="range.from" v-model="range.to" class="bg-transparent"
                                                        @input="validateTimeRange(index, rangeIndex)" :padded="false"
                                                        variant="none" /> -->
                                            </div>
                                        </div>
                                        <UButton :disabled="!day.active" @click="removeRange(index, rangeIndex)"
                                            size="xs" square :ui="{ rounded: 'rounded-full' }"
                                            class="bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600">
                                            <template #leading>
                                                <Icon name="tabler:x" size="20" class="text-white" />
                                            </template>
                                        </UButton>

                                    </div>
                                    <p v-if="range.error" class="text-xs text-red-600">{{ range.error }}</p>
                                </div>

                                <UButton size="xs" color="white" class="hover:no-underline" @click="addRange(index)"
                                    :disabled="!day.active" block variant="link" label="Add">
                                    <template #leading>
                                        <Icon name="tabler:plus" size="18" />
                                    </template>
                                </UButton>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="sticky bottom-0 p-4 bg-white dark:bg-gray-900 border-t dark:border-t-gray-800 z-50">
                    <UButton @click="onSubmit" :loading="loadingSubmit"
                        class="dark:bg-green-600 disabled:dark:bg-green-300 dark:hover:bg-green-500"
                        :disabled="allow || !allRangesValid" block size="lg">Submit</UButton>
                </div>
            </div>
        </USlideover>
    </div>
</template>

<script setup>
import { storeOpeningHours, getUserOpeningHours } from '~/composables/store/useAppointment'
import { updateSettings } from '~/composables/store/useProfile'
import { useAuthStore } from '~/stores/authStore'


import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'

const snackbar = useSnackbar();

const user = computed(() => authStore.getAuthUser);


const isOpen = ref(false)
const meetDuration = ref()
const loadingSubmit = ref(false)
const allowAppointment = ref()

const authStore = useAuthStore();



const daysOfWeek = ref(
    [
        { id: 0, name: 'Sunday', timeRanges: [], active: true },
        { id: 1, name: 'Monday', timeRanges: [], active: true },
        { id: 2, name: 'Tuesday', timeRanges: [], active: true },
        { id: 3, name: 'Wednesday', timeRanges: [], active: true },
        { id: 4, name: 'Thursday', timeRanges: [], active: true },
        { id: 5, name: 'Friday', timeRanges: [], active: true },
        { id: 6, name: 'Saturday', timeRanges: [], active: true },
    ]
)

const allow = computed(() => {

    return meetDuration.value < 15
})

const allRangesValid = computed(() => {
    return daysOfWeek.value.every(day =>
        !day.active || day.timeRanges.every(range => range.error === '')
    )
})


definePageMeta({
    layout: 'auth',
    title: 'Service',
    middleware: ['auth']
})


onMounted(() => {
    allowAppointment.value = user.value?.settings[0].value.allow
    meetDuration.value = user.value?.settings[0].value.appointment_time
})

const addRange = (dayIndex) => {
    daysOfWeek.value[dayIndex].timeRanges.push({ from: '', to: '', error: '' })
}

const removeRange = (dayIndex, rangeIndex) => {
    daysOfWeek.value[dayIndex].timeRanges.splice(rangeIndex, 1)
    validateTimeRange(dayIndex, rangeIndex)
}

const validateTimeRange = (dayIndex, rangeIndex) => {
    const timeRanges = daysOfWeek.value[dayIndex]?.timeRanges
    const range = timeRanges?.[rangeIndex]

    if (range) {

        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (range?.from && range?.to) {
            if (!timePattern.test(range.from) || !timePattern.test(range.to)) {
                range.error = 'Invalid time format. Please use HH:mm format.'
            } else if (range.from >= range.to) {
                range.error = '"From" time must be before "To" time'
            } else {

                let overlapFound = false;

                for (let i = 0; i < timeRanges.length; i++) {
                    if (i !== rangeIndex) {
                        const otherRange = timeRanges[i];
                        if (range.from < otherRange.to && range.to > otherRange.from) {
                            range.error = 'Time range overlaps with another range'
                            overlapFound = true
                            break;
                        }
                    }
                }

                if (!overlapFound) {
                    range.error = ''
                }
            }
        } else {
            range.error = ''
        }
    }
};

const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
}

const changeDuration = () => {
    daysOfWeek.value.forEach((day, dayIndex) => {
        day.timeRanges.forEach((range, rangeIndex) => {
            validateTimeRange(dayIndex, rangeIndex);
        });
    });
}

const updateProfileSettings = async () => {

    if ((allowAppointment.value != user.value.settings[0].value.allow) || (meetDuration.value != user.value.settings[0].value.appointment_time)) {
        const payload = {
            appointment_scheduling: {
                allow: allowAppointment.value,
                appointment_time: meetDuration.value
            }
        }
        const result = await updateSettings(payload)
    }

}


const onSubmit = async () => {
    let opening_hours = [];

    daysOfWeek.value.forEach((day, dayIndex) => {
        if (day.active) {
            const periods = [];
            day.timeRanges.forEach((periode) => {
                if (periode.error === '' && periode.from !== '' && periode.to !== '') {
                    periods.push({
                        from: periode.from,
                        to: periode.to
                    });
                }
            })
            if (periods.length > 0) {
                opening_hours.push({
                    day: dayIndex,
                    periods: periods
                })
            }
        }
    });
    await updateProfileSettings()
    if (opening_hours.length > 0) {
        let payload = { opening_hours: opening_hours }
        loadingSubmit.value = true
        const result = await storeOpeningHours(payload)

        if (result?.success) {
            loadingSubmit.value = false
            snackbar.add({
                type: 'success',
                text: 'Working time updated successfully'
            })
        }

    }
}

const groupByDayWithNames = (atimeRanges) => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const grouped = [];

    dayNames.forEach((name, index) => {
        grouped.push({
            day: index,
            name: name,
            timeRanges: [],
            active: true
        });
    });

    atimeRanges.forEach(({ day, from, to }) => {
        let dayGroup = grouped.find(group => group.day === day);

        if (dayGroup) {
            dayGroup.timeRanges.push({ from, to, error: '' });
        }
    });

    return grouped;
}

const getData = async () => {
    const result = await getUserOpeningHours(user.value.id)
    daysOfWeek.value = groupByDayWithNames(result.data)
}


watchEffect(() => {
    getData();
});


</script>

<style>
.vue__time-picker input.vue__time-picker-input {
    border: none !important;
    width: 100% !important;
}

.vue__time-picker .dropdown,
.vue__time-picker,
.vue__time-picker .dropdown .select-list {
    width: 100% !important;
}

.dark .vue__time-picker .dropdown,
.vue__time-picker {
    background-color: #1e293b !important;
}

.dark .vue__time-picker .dropdown ul li {
    color: #FFF !important;
}

.dark .vue__time-picker .dropdown ul.minutes {
    border-left: 1px solid #000 !important;
}

.dark .vue__time-picker input.vue__time-picker-input {
    background-color: #111827 !important;
}
</style>