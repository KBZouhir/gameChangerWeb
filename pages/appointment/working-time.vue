<template>
    <div class="bg-[#f1f5f9] dark:bg-[#0f172a]">
        <div class="mx-auto w-full max-w-screen-xl px-2 py-8">
            <UButton size="lg" @click="isOpen = true"
                class="dark:bg-green-600 disabled:dark:bg-green-300 dark:hover:bg-green-500">Open</UButton>

            <USlideover v-model="isOpen" prevent-close>
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
                            <div v-for="(day, index) in daysOfWeek"
                                class="border dark:border-slate-800 rounded-lg p-4 over"
                                :class="(day.active) ? `` : `opacity-80`">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="font-semibold">{{ day.name }}</h3>
                                    <UToggle color="green" v-model="day.active" size="sm" />
                                </div>
                                <div class="flex flex-col space-y-4">
                                    <div class="flex flex-col space-y-2" v-for="(range, rangeIndex) in day.timeRanges">
                                        <div class="flex justify-between items-center space-x-4">
                                            <div class="flex-1 text-sm flex justify-between border rounded-lg p-4"
                                                :class="(range.error ? 'border-red-600 dark:border-red-600' : 'dark:border-slate-800')">
                                                <div>
                                                    <span class="mb-2 mr-2">From :</span>
                                                    <input type="time" step="900" :disabled="!day.active"
                                                        v-model="range.from" class="bg-transparent"
                                                        @input="validateTimeRange(index, rangeIndex)" :padded="false"
                                                        variant="none" />
                                                </div>
                                                <div class="border dark:border-slate-800"></div>
                                                <div>
                                                    <span class="mb-2 mr-2">To :</span>
                                                    <input type="time" step="900" :disabled="!day.active"
                                                        :min="range.from" v-model="range.to" class="bg-transparent"
                                                        @input="validateTimeRange(index, rangeIndex)" :padded="false"
                                                        variant="none" />
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
                        <UButton @click="onSubmit"
                            class="dark:bg-green-600 disabled:dark:bg-green-300 dark:hover:bg-green-500"
                            :disabled="allow || !allRangesValid" block size="lg">Submit</UButton>
                    </div>
                </div>
            </USlideover>
        </div>
    </div>
</template>

<script setup>
import { storeOpeningHours, getUserOpeningHours } from '~/composables/store/useAppointment'
import { useAuthStore } from '~/stores/authStore'


const isOpen = ref(false)
const meetDuration = ref(15)

const authStore = useAuthStore();


const user = computed(() => authStore.getAuthUser);

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


const addRange = (dayIndex) => {
    daysOfWeek.value[dayIndex].timeRanges.push({ from: '', to: '', error: '' });
}

const removeRange = (dayIndex, rangeIndex) => {
    daysOfWeek.value[dayIndex].timeRanges.splice(rangeIndex, 1);
    validateTimeRange(dayIndex, rangeIndex)
}

const validateTimeRange = (dayIndex, rangeIndex) => {
    const range = daysOfWeek.value[dayIndex].timeRanges[rangeIndex];
    const minSlotTime = 30

    if (range?.from && range?.to) {
        if (range.from >= range.to) {
            range.error = '"From" time must be before "To" time'
        } else {
            const fromTime = parseTime(range.from)
            const toTime = parseTime(range.to)
            const duration = (toTime - fromTime) / (1000 * 60)

            if (duration < meetDuration.value) {
                range.error = `The duration must be at least ${meetDuration.value} minutes`
            } else {
                const previousRange = daysOfWeek.value[dayIndex].timeRanges[rangeIndex - 1]
                const nextRange = daysOfWeek.value[dayIndex].timeRanges[rangeIndex + 1]

                let consecutiveError = false;
                if (previousRange && previousRange.to) {
                    const prevToTime = parseTime(previousRange.to)
                    const timeDiff = (fromTime - prevToTime) / (1000 * 60)
                    if (timeDiff < minSlotTime) {
                        consecutiveError = true
                    }
                }
                if (nextRange && nextRange.from) {
                    const nextFromTime = parseTime(nextRange.from);
                    const timeDiff = (nextFromTime - toTime) / (1000 * 60)
                    if (timeDiff < minSlotTime) {
                        consecutiveError = true;
                    }
                }

                if (consecutiveError) {
                    range.error = `The periods must be consecutive with at least ${minSlotTime} minutes in between`
                } else {
                    range.error = ''
                }
            }
        }
    } else {
        range.error = '';
    }
}

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
            });
            if (periods.length > 0) {
                opening_hours.push({
                    day: dayIndex,
                    periods: periods
                });
            }
        }
    });
    if (opening_hours.length > 0) {
        let payload = { opening_hours: opening_hours }
        const result = await storeOpeningHours(payload)

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
};

const getData = async () => {
    const result = await getUserOpeningHours(user.value.id)
    daysOfWeek.value = groupByDayWithNames(result.data) 
}

watchEffect(() => {
    getData();
});


</script>