<template>
    <div class="bg-[#f1f5f9] dark:bg-[#0f172a] h-full mx-auto">
        <div class="flex flex-col justify-center items-center max-w-screen-md h-full mx-auto py-4">
            <h2 class="text-2xl font-semibold text-center mb-6">
                {{ $dayjs(appointment?.begin_at).format('dddd, MMMM D') }}
            </h2>

            <div
                class="w-full p-4 px-6 ring-1 relative hover:shadow-lg ease-in-out duration-150 transition-all overflow-hidden ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 rounded-xl flex flex-col space-y-6 mb-4">
                <img src="~/assets/svg/vectors/pattern-rectangle.svg" class="w-12 absolute top-0 right-0" alt=""
                    srcset="">
                <div class="flex items-start justify-between mt-1">
                    <div v-if="appointment?.is_requested_by_me" class="flex flex-col items-center mx-auto">
                        <UAvatar class="mb-2" :src="appointment?.user.image_url" :alt="appointment?.user.full_name"
                            size="3xl" />

                        <div class="flex flex-col">
                            <h4 class="font-bold mb-0">{{ appointment?.user.full_name }}</h4>
                        </div>
                    </div>

                    <div v-else class="flex flex-col items-center mx-auto">
                        <UAvatar class="mb-2" :src="appointment?.requester.image_url"
                            :alt="appointment?.requester.full_name" size="3xl" />

                        <div class="flex flex-col">
                            <h4 class="font-bold mb-0">{{ appointment?.requester.full_name }}</h4>
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

                <div v-if="appointmentStatus(appointment) == 'waiting' && !readyTojoin"
                    class="grid grid-cols-4 gap-6 mb-4">
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

                <div v-if="appointmentStatus(appointment) == 'expired'"
                    class="rounded-md dark:bg-red-600 border border-red-800 bg-red-100 p-4">
                    <div class="flex items-center dark:text-white text-red-800">
                        <Icon name="tabler:info-circle" />
                        <div class="ml-3">
                            <h3 class="text-sm font-medium ">
                                {{ $t('You missed this appointment') }}
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
                <div v-if="appointmentStatus(appointment) == 'Pending' && user.id != appointment.requester.id"
                    class="grid grid-cols-2 space-x-2">
                    <UButton @click="rejectAppointmentModal = true" block label="Reject" color="red" size="lg" />
                    <UButton @click="acceptAppointmentFun" block label="Accept" color="green" size="lg" />
                </div>

                <!-- Cancel before start -->
                <div v-if="appointmentStatus(appointment) == 'waiting' && !readyTojoin"
                    class="grid grid-cols-1 space-x-2">
                    <UButton @click="cancelAppointmentModal = true" block label="Cancel" color="red" size="lg" />
                </div>

                <!-- Start or cancel -->
                <div v-if="appointmentStatus(appointment) == 'waiting' && !appointment.is_requested_by_me && readyTojoin && !readyTojoinLive"
                    class="grid grid-cols-2 space-x-2">
                    <UButton @click="cancelAppointmentModal = true" block label="Cancel" color="red" size="lg" />
                    <UButton @click="startAppointmentFun" :loading="joinLoading" block label="Start" color="green"
                        size="lg" />
                </div>

                <!-- requster join or cancel -->
                <div v-if="appointmentStatus(appointment) == 'waiting' && appointment.is_requested_by_me && readyTojoin"
                    class="grid grid-cols-2 space-x-2">
                    <UButton @click="cancelAppointmentModal = true" block label="Cancel" color="red" size="lg" />
                    <UButton @click="acceptAppointmentFun" block label="Start" color="green" size="lg" />
                </div>

                <!-- Room Started -->
                <div v-if="readyTojoinLive" class="grid grid-cols-1 space-x-2">
                    <UButton @click="startAppointmentFun" :loading="joinLoading" block label="Start" color="green"
                        size="lg" />
                </div>

            </div>

            <nuxt-link to="/calendar">
                <span class="text-center hover:underline text-gray-400">
                    {{ $t('Go back to calendar') }}
                </span>
            </nuxt-link>

        </div>

        <!-- Reject Appointment Modal -->
        <UModal v-model="rejectAppointmentModal">
            <div>
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <h4 class="font-semibold">{{ $t('Are you sure you want to reject this appointment ?') }}</h4>
                    </template>

                    <div class="flex flex-col space-y-2">
                        <label for="reject_reason">Reject reason</label>
                        <UTextarea id="reject_reason" :rows="8" v-model="rejected_reason" />
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
        </UModal>

        <!-- Cancel Appointment Modal -->
        <UModal v-model="cancelAppointmentModal">
            <div>
                <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <h4 class="font-semibold">{{ $t('Are you sure you want to cancel this appointment ?') }}</h4>
                    </template>

                    <div class="flex flex-col space-y-2">
                        <label for="reject_reason">Cancel reason</label>
                        <UTextarea id="reject_reason"
                            :placeholder="`Tell Big ben why you want to cancel this appointment`" :rows="8"
                            v-model="cancel_reason" />
                    </div>

                    <template #footer>
                        <div class="grid grid-cols-2 space-x-2">
                            <UButton @click="cancelAppointmentModal = false" variant="link" block label="Cancel"
                                :color="$colorMode.value == 'dark' ? 'green' : 'primary'" size="lg" />
                            <UButton @click="cancelAppointmentFun" :loading="isLoading" block label="Confirm" color="red" size="lg" />
                        </div>
                    </template>
                </UCard>
            </div>
        </UModal>
    </div>
</template>

<script setup>
import { getAppointment, acceptAppointment, rejectAppointment, cancelAppointment, startAppointment } from '~/composables/store/useAppointment'
import { handleApiError } from '~/composables/useApiError'
import { useAuthStore } from "~/stores/authStore"

const { $messaging, $onMessage } = useNuxtApp()


const authStore = useAuthStore()
const appointment = ref()
const rejectAppointmentModal = ref(false)
const cancelAppointmentModal = ref(false)
const form = ref()
const dayjs = useDayjs()
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const now = ref();
const targetDate = ref()
const readyTojoin = ref(false)
const readyTojoinLive = ref(false)
const joinLoading = ref(false)
const isLoading = ref(false)


let interval

const route = useRoute()
const snackbar = useSnackbar();

const id = route.params.id

const user = computed(() => authStore.getAuthUser)

const duration = computed(() => {
    const beginAt = dayjs(appointment.value?.begin_at, 'YYYY-MM-DD HH:mm:ss')
    const endAt = dayjs(appointment.value?.end_at, 'YYYY-MM-DD HH:mm:ss')
    return endAt.diff(beginAt, 'minute')
})




const appointmentLive = () => {
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const endAt = dayjs.utc(appointment.value?.end_at).tz(localTimezone)
    const currentTime = dayjs().local()
    return currentTime.isBefore(endAt)
}



const canJoin = () => {

    if (appointment.value?.room_opened_at && appointment.value?.status == 1 && appointmentLive()) {
        readyTojoinLive.value = true
    }
}

definePageMeta({
    layout: 'auth',
    title: 'Service',
    middleware: ['auth']
})


const rejected_reason = ref()
const cancel_reason = ref()

const calculateTimeLeft = () => {
    if (true) {
        const totalSeconds = targetDate.value?.diff(now.value, 'second')

        if (totalSeconds < 0 && appointmentLive()) {
            roomStarted()
            readyTojoin.value = true
        } else {
            days.value = (Math.floor(totalSeconds / (60 * 60 * 24)) < 0) ? 0 : Math.floor(totalSeconds / (60 * 60 * 24))
            hours.value = (Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)) < 0) ? 0 : Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
            minutes.value = (Math.floor((totalSeconds % (60 * 60)) / 60) < 0) ? 0 : Math.floor((totalSeconds % (60 * 60)) / 60)
            seconds.value = (totalSeconds % 60 < 0) ? 0 : totalSeconds % 60
        }

    }
}

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

        const beginAt = dayjs.utc(begin_at);
        const endAt = dayjs.utc(end_at);
        const roomOpenedAt = room_opened_at ? dayjs(room_opened_at).utc() : null;
        const roomClosedAt = room_closed_at ? dayjs(room_closed_at).utc() : null;

        targetDate.value = beginAt

        const appointmentStatusEnumMap = ["Accepted", "Pending", "Refused", "Canceled_before", "Canceled"];
        let status = appointmentStatusEnumMap[jsonStatus - 1];

        const now = dayjs.utc()

        if (status === "Accepted") {
            const timeToBegin = beginAt.diff(now, 'minute');
            const timeToEnd = endAt.diff(now, 'minute');

            if (timeToBegin < duration.value) {
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

const roomStarted = () => {
    const { begin_at, end_at } = appointment?.value;
    const beginAt = dayjs.utc(begin_at);
    const endAt = dayjs.utc(end_at);

    if (endAt.diff(beginAt, 'minute') < duration.value) {
        readyTojoin.value = true
    } else {
        readyTojoin.value = false
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
    if (result?.success) {
        appointment.value = result?.appointment
    }
}

const rejectAppointmentFun = async () => {
    const data = { rejected_reason: rejected_reason.value }

    const result = await rejectAppointment(appointment.value?.id, data)
    if (result?.success) {
        appointment.value = result?.appointment
    } else {
        if (result.error.statusCode == 422) {
            const error = handleApiError(result.error);
            form.value.setErrors(error.errors);
        }
    }
}

const cancelAppointmentFun = async () => {
    const data = { rejected_reason: cancel_reason.value }
    isLoading.value = true
    const result = await cancelAppointment(appointment.value?.id, data)
    isLoading.value = false
    if (result.success) {
        appointment.value.rejected_reason = result?.appointment.rejected_reason
        appointment.value.status = result?.appointment.status
        appointment.value.room_closed_at = result?.appointment.room_closed_at
        appointment.value.room_opened_at = result?.appointment.room_opened_at
    } else {
        if (result.error.statusCode == 422) {
            const error = handleApiError(result.error);
            form.value.setErrors(error.errors);
        }
    }
}


const startAppointmentFun = async () => {
    joinLoading.value = true
    const result = await startAppointment(id)
    joinLoading.value = false
    console.log(result);

    if (result?.success) {
        await navigateTo(
            {
                path: '/room',
                query: {
                    link: appointment.value.room_link,
                    token: result?.data.token
                }
            }
        )
    } else {
        const { data } = result.data
        console.log(data.message);

        snackbar.add({
            type: 'error',
            text: data.message
        })
    }

}

onMounted(() => {
    interval = setInterval(() => {
        now.value = dayjs();
        calculateTimeLeft();
        canJoin()
    }, 1000);


    $onMessage($messaging, (payload) => {
        console.log(payload.data.notification_type);
        
        if(payload.data.notification_type == 3){
            const parsedData = JSON.parse(payload.data.data);
            console.log(parsedData.appointment);
            console.log(parsedData);
            
            appointment.value.rejected_reason = parsedData.appointment.rejected_reason
            appointment.value.status = parsedData.appointment.status
            appointment.value.room_closed_at = parsedData.appointment.room_closed_at
            appointment.value.room_opened_at = parsedData.appointment.room_opened_at
        }
    })

    console.log('appointmentLive', appointmentLive())
});

watchEffect(() => {
    getDataFromApi();
});
</script>