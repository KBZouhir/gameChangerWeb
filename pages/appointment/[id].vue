<template>
    <div class="bg-[#f1f5f9] dark:bg-[#0f172a] h-full">
        <div class="flex flex-col justify-center items-center max-w-screen-md h-full mx-auto py-4">
            <h2 class="text-2xl font-semibold text-center mb-6">
                {{ $dayjs(appointment?.begin_at).format('dddd, MMMM D') }}
            </h2>
            {{ appointment?.room_link }}
            <div
                class="w-full p-4 px-6 ring-1 relative hover:shadow-lg ease-in-out duration-150 transition-all overflow-hidden ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 rounded-xl flex flex-col space-y-6 mb-4">
                <img src="~/assets/svg/vectors/pattern-rectangle.svg" class="w-12 absolute top-0 right-0" alt=""
                    srcset="">
                <div class="flex items-start justify-between mt-1">
                    <div class="flex flex-col items-center mx-auto">
                        <UAvatar class="mb-2" :src="appointment?.user.image_url" :alt="appointment?.user.full_name"
                            size="3xl" />

                        <div class="flex flex-col">
                            <h4 class="font-bold mb-0">{{ appointment?.user.full_name }}</h4>
                        </div>
                    </div>

                </div>

                <dl
                    class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                    <div class="flex flex-col bg-gray-400/5 p-8">
                        <dt class="text-sm font-semibold leading-6 dark:text-gray-400 text-gray-600">{{ $t('date') }}
                        </dt>
                        <dd class="text-xl font-semibold tracking-tight dark:text-white text-gray-900">{{
                            $dayjs(appointment?.begin_at).format('DD-MM-YYYY') }}</dd>
                    </div>
                    <div class="flex flex-col bg-gray-400/5 p-8">
                        <dt class="text-sm font-semibold leading-6 dark:text-gray-400 text-gray-600">{{ $t('Start at')
                            }}
                        </dt>
                        <dd class="text-xl font-semibold tracking-tight dark:text-white text-gray-900">{{
                            convertTo12HourFormat(appointment?.begin_at, 'hh:mm A') }}</dd>
                    </div>
                    <div class="flex flex-col bg-gray-400/5 p-8">
                        <dt class="text-sm font-semibold leading-6 dark:text-gray-400 text-gray-600">{{ $t('End at') }}
                        </dt>
                        <dd class="text-xl font-semibold tracking-tight dark:text-white text-gray-900">{{
                            convertTo12HourFormat(appointment?.end_at, 'hh:mm A') }}</dd>
                    </div>
                    <div class="flex flex-col bg-gray-400/5 p-8">
                        <dt class="text-sm font-semibold leading-6 dark:text-gray-400 text-gray-600">{{ $t('Status') }}
                        </dt>
                        <dd class="text-xl font-semibold  tracking-tight dark:text-white text-gray-900">
                            <span :class="badgeType(appointmentStatus(appointment))"
                                class="inline-flex items-center rounded-md capitalize px-2 py-1 text-xs font-medium  ring-1 ring-inset ">
                                {{ appointmentStatus(appointment) }}
                            </span>
                        </dd>
                    </div>
                </dl>

                <div v-if="appointmentStatus(appointment) == 'waiting'" class="grid grid-cols-4 gap-6 mb-4">
                    <div class="flex flex-col">
                        <span
                            class="p-1 bg-green-400 text-primary text-sm text-center font-semibold rounded-md rounded-b-none">DAYS</span>
                        <div
                            class="flex justify-center items-center py-4 p-6 shadow border dark:border-slate-800 border-t-0 rounded-t-none rounded-md">
                            <h3 class="text-2xl font-bold">{{ days }}</h3>
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <span
                            class="p-1 bg-green-400 text-primary text-sm text-center font-semibold rounded-md rounded-b-none">HOURS</span>
                        <div
                            class="flex justify-center items-center py-4 p-6 shadow border dark:border-slate-800 border-t-0 rounded-t-none rounded-md">
                            <h3 class="text-2xl font-bold">{{ hours }}</h3>
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <span
                            class="p-1 bg-green-400 text-primary text-sm text-center font-semibold rounded-md rounded-b-none">MINS</span>
                        <div
                            class="flex justify-center items-center py-4 p-6 shadow border dark:border-slate-800 border-t-0 rounded-t-none rounded-md">
                            <h3 class="text-2xl font-bold">{{ minutes }}</h3>
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <span
                            class="p-1 bg-green-400 text-primary text-sm text-center font-semibold rounded-md rounded-b-none">SECS</span>
                        <div
                            class="flex justify-center items-center py-4 p-6 shadow border dark:border-slate-800 border-t-0 rounded-t-none rounded-md">
                            <h3 class="text-2xl font-bold">{{ seconds }}</h3>
                        </div>
                    </div>
                </div>

                <div v-if="appointment?.rejected_at"
                    class="rounded-md dark:bg-red-600 border border-red-800 bg-red-100 p-4">
                    <div class="flex items-center dark:text-white text-red-800">
                        <Icon name="tabler:clock" />
                        <div class="ml-3">
                            <h3 class="text-sm font-medium ">
                                {{ $t('This appointment is rejected') }}
                            </h3>
                        </div>
                    </div>
                </div>

                <div v-if="appointment?.rejected_at" class="text-red-600">
                    <label class="font-semibold">Rejection reason</label>
                    <p>{{ appointment?.rejected_reason }}</p>
                </div>

                <div class="">
                    <label class="font-semibold">Description</label>
                    <p>{{ appointment?.description }}</p>
                </div>


                <UDivider label="" />
                <!-- Accept or reject -->
                <div v-if="appointmentStatus(appointment) == 'Pending'" class="grid grid-cols-2 space-x-2">
                    <UButton @click="rejectAppointmentModal = true" block label="Reject" color="red" size="lg" />
                    <UButton @click="acceptAppointmentFun" block label="Accept" color="green" size="lg" />
                </div>

            </div>

            <nuxt-link to="/calendar">
                <span class="text-center hover:underline text-gray-400">
                    {{ $t('Go back to calendar') }}
                </span>
            </nuxt-link>

        </div>
        <div>
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <h4 class="font-semibold">{{ $t('Are you sure you want to reject this appointment ?') }}</h4>
                    </template>

                    <div class="flex flex-col space-y-2">
                        <label for="reject_reason">Reject reason</label>
                        <UTextarea id="reject_reason" :rows="8" v-model="state.rejected_reason" />
                    </div>

                    <template #footer>
                        <div v-if="appointmentStatus(appointment) == 'Pending'" class="grid grid-cols-2 space-x-2">
                            <UButton @click="rejectAppointmentModal = false" variant="link" block label="Cancel"
                                :color="$colorMode.value == 'dark' ? 'green' : 'primary'" size="lg" />
                            <UButton @click="rejectAppointmentFun" block label="Confirm" color="red" size="lg" />
                        </div>
                    </template>
                </UCard>
            </div>
        <!-- Reject Appointment Modal -->
        <!-- <UModal v-model="rejectAppointmentModal">
            
        </UModal> -->
    </div>
</template>

<script setup>
import { getAppointment, acceptAppointment, rejectAppointment } from '~/composables/store/useAppointment'
import { handleApiError } from '~/composables/useApiError'

const appointment = ref()
const rejectAppointmentModal = ref(false)
const form = ref()
const dayjs = useDayjs()
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const now = ref();
const targetDate = ref()
let interval;

const route = useRoute()
const id = route.params.id


definePageMeta({
    layout: 'auth',
    title: 'Service',
    middleware: ['auth']
})


const state = reactive(
    {
        'rejected_reason': ''
    }
)

const calculateTimeLeft = () => {
    const totalSeconds = targetDate.value.diff(now.value, 'second');
    days.value = Math.floor(totalSeconds / (60 * 60 * 24))
    hours.value = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    minutes.value = Math.floor((totalSeconds % (60 * 60)) / 60)
    seconds.value = totalSeconds % 60
};

const getDataFromApi = async () => {
    const result = await getAppointment(id)
    if (result?.success) {
        appointment.value = result?.appointment
    }
}

const convertTo12HourFormat = (dateTime, format) => {
    const dayjs = useDayjs()
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return dayjs.utc(dateTime).tz(localTimezone).format(format)
}


const appointmentStatus = (object) => {
    const dayjs = useDayjs();

    if (object) {
        const { status: jsonStatus, begin_at, end_at, room_opened_at, room_closed_at, is_requested_by_me } = object;
       
        targetDate.value = dayjs(begin_at)
        // Convert times to UTC
        const beginAt = dayjs.utc(begin_at);
        const endAt = dayjs.utc(end_at);
        const roomOpenedAt = room_opened_at ? dayjs(room_opened_at).utc() : null;
        const roomClosedAt = room_closed_at ? dayjs(room_closed_at).utc() : null;

        

        const appointmentStatusEnumMap = ["Accepted", "Pending", "Refused", "Canceled_before", "Canceled"];
        let status = appointmentStatusEnumMap[jsonStatus - 1];

        const duration = 15;
        const now = dayjs.utc()
        
        if (status === "Accepted") {
            const timeToBegin = beginAt.diff(now, 'minute');
            const timeToEnd = endAt.diff(now, 'minute');
            
            if (timeToBegin < duration) {
                if (timeToEnd < 0) {
                    status = roomOpenedAt ? "ended" : "expired";
                } else {
                    if (!roomOpenedAt) {
                        status = "waiting";
                    } else if (!roomClosedAt) {
                        status = "started";
                    } else {
                        status = "pendingEnd";
                    }
                }
            } else if (is_requested_by_me) {
                status = "confirmed";
            }
        } else if (status === "Pending" && beginAt.diff(now, 'minute') < 0) {
            status = "expired";
        }

        return status;
    }
}

const badgeType = (status) => {
    const badgeClasses = {
        ended: 'bg-red-400/10 text-red-400 ring-red-400/20',
        expired: 'bg-red-400/10 text-red-400 ring-red-400/20',
        Refused: 'bg-red-400/10 text-red-400 ring-red-400/20',
        Canceled: 'bg-red-400/10 text-red-400 ring-red-400/20',
        confirmed: 'bg-green-400/10 text-green-400 ring-green-400/20',
        Accepted: 'bg-green-400/10 text-green-400 ring-green-400/20',
        Pending: 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20',
    };

    return badgeClasses[status] || '';
}

const acceptAppointmentFun = async () => {
    const result = await acceptAppointment(appointment.value?.id)
    console.log(result);

}

const rejectAppointmentFun = async () => {
    const result = await rejectAppointment(appointment.value?.id, state)
    if (result.success) {

    } else {
        if (result.error.statusCode == 422) {
            const error = handleApiError(result.error);
            form.value.setErrors(error.errors);
        }
    }

}

onMounted(() => {
  interval = setInterval(() => {
    now.value = dayjs();
    calculateTimeLeft();
  }, 1000);
});

watchEffect(() => {
    getDataFromApi();
});
</script>