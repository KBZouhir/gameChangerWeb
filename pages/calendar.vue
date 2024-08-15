<template>
    <div>
        <div class="w-full px-4 py-4 max-w-screen-md mx-auto">
            <ClientOnly>
                <VCalendar ref="calendarRef" expanded color="green" @dayclick="selectDay" @did-move="calendarSwipePage"
                    :attributes="attributes" :is-dark="$colorMode.value == 'dark' ? true : false"></VCalendar>
                <template #fallback>
                    <p>{{ $t('Loading calendar...') }}</p>
                </template>
            </ClientOnly>

            <div class="my-4">
                <h2 class="mb-4">{{ $t('Appointments for ') }}<span class="font-semibold">{{
                    $dayjs(selectedDay).format("YYYY-MM-DD") }}</span> </h2>
                <div v-if="appointments?.data?.length > 0 && !loadingAppointments"
                    class="grid md:grid-cols-2 grid-cols-1 gap-4">
                    <NuxtLink v-for="appointment in appointments?.data" :to="`/appointment/${appointment.id}`">

                        <div
                            class="p-4 px-6 ring-1 relative cursor-pointer hover:shadow-lg ease-in-out duration-150 transition-all overflow-hidden ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 rounded-xl flex flex-col space-y-6 mb-4">
                            <img src="~/assets/svg/vectors/pattern-rectangle.svg" class="w-12 absolute top-0 right-0"
                                alt="" srcset="">
                            <div class="flex items-start justify-between mt-1">
                                <div class="flex items-center space-x-4">
                                    <nuxt-link :to="`profile/${appointment.user.id}`">
                                        <UAvatar :src="(appointment.user.id == user.id) ? appointment.requester.image_url  : appointment.user.image_url" :alt="(appointment.user.id == user.id)  ? appointment.requester.full_name : appointment.user.full_name"
                                            size="md" />
                                    </nuxt-link>

                                    <div class="flex flex-col">
                                        <h4 class="font-bold mb-0">{{ (appointment.user.id == user.id) ? appointment.requester.full_name : appointment.user.full_name}}</h4>
                                        <span class="text-xs -mt-[0.5px]">
                                            {{ convertTo12HourFormat(appointment.begin_at) }} - {{
                                                convertTo12HourFormat(appointment.end_at) }}
                                        </span>
                                    </div>
                                </div>
                                <span :class="badgeType(appointmentStatus(appointment))"
                                    class="inline-flex items-center rounded-md capitalize  px-2 py-1 text-xs font-medium  ring-1 ring-inset ">
                                    {{ appointmentStatus(appointment) }}
                                </span>

                            </div>

                            <div class="">
                                {{ appointment.description }}
                            </div>
                        </div>
                    </NuxtLink>
                    <div class="col-span-2 text-center">
                        <InfiniteLoading @infinite="fetchMoreAppointments">
                            <template #spinner>
                                <div class="flex justify-center w-full">
                                    <LoadingIcon />
                                </div>
                            </template>
                            <template v-if="appointments?.data.length > 0" #complete>
                                <span></span>
                            </template>
                        </InfiniteLoading>
                    </div>
                </div>

                <div v-if="appointments?.data?.length == 0 && !loadingAppointments"
                    class="flex flex-1 flex-col items-center justify-center py-4">
                    <img class="flex dark:hidden mx-auto" src="~/assets/svg/vectors/empty.svg" draggable="false" alt=""
                        srcset="">
                    <img class="hidden dark:flex mx-auto" src="~/assets/svg/vectors/empty-white.svg" draggable="false"
                        alt="" srcset="">
                    <h2 class="font-semibold text-2xl">{{ $t('No Appointments for this date') }}</h2>
                </div>
            </div>

            <div v-if="loadingAppointments" class="my-4">
                <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
                    <div v-for="i in 4"
                        class="p-4 px-6 ring-1 relative hover:shadow-lg ease-in-out duration-150 transition-all overflow-hidden ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 rounded-xl flex flex-col space-y-6 mb-4">
                        <img src="~/assets/svg/vectors/pattern-rectangle.svg" class="w-12 absolute top-0 right-0" alt=""
                            srcset="">
                        <div class="flex items-start justify-between mt-1">
                            <div class="flex items-center space-x-4">
                                <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />

                                <div class="flex flex-col">
                                    <USkeleton class="h-4 w-[100px] mb-4" />
                                    <span class="flex space-x-2 text-xs -mt-[0.5px]">
                                        <USkeleton class="h-2 w-[80px]" />
                                    </span>
                                </div>
                            </div>
                            <USkeleton class="h-6 w-[70px]" />
                        </div>

                        <div class="">
                            <USkeleton class="h-4 w-full mb-2" />
                            <USkeleton class="h-4 w-2/3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { calendar, getAppointments } from '~/composables/store/useAppointment'
import { getPaginationsComments } from '~/composables/store/usePost'
import { useAuthStore } from "~/stores/authStore"
import InfiniteLoading from "v3-infinite-loading"
import "v3-infinite-loading/lib/style.css"

const selectedDay = ref(new Date())
const appointments = ref([])
const authStore = useAuthStore()



const maxDate = computed(() => {
    const dayjs = useDayjs()
    return dayjs().add(3, 'month').format('YYYY-MM-DD');
})

const user = computed(() => authStore.getAuthUser);

const calendarLoading = ref(false)
const loadingAppointments = ref(false)
const calendarRef = ref()

const attributes = ref([
    {
        highlight: true,
        dates: new Date(),
    },
])

definePageMeta({
    layout: 'auth',
    title: 'Service',
    middleware: ['auth']
})

const calendarSwipePage = async (e) => {
    getDataFromApi(e[0].id);
}

const appointmentStatus = (object) => {
    const dayjs = useDayjs();
    const { status: jsonStatus, begin_at, end_at, room_opened_at, room_closed_at, is_requested_by_me } = object;

    const beginAt = dayjs(begin_at);
    const endAt = dayjs(end_at);
    const roomOpenedAt = room_opened_at ? dayjs(room_opened_at) : null;
    const roomClosedAt = room_closed_at ? dayjs(room_closed_at) : null;

    const appointmentStatusEnumMap = ["Accepted", "Pending", "Refused", "Canceled_before", "Canceled"];
    let status = appointmentStatusEnumMap[jsonStatus - 1];

    const duration = 15;
    const now = dayjs();

    if (status === "Accepted") {
        const timeToBegin = beginAt.diff(now, 'minute');
        const timeToEnd = endAt.diff(now, 'minute');

        if (timeToBegin < duration) {
            if (timeToEnd < duration) {
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
    } else if (status === "Pending" && beginAt.diff(now, 'minute') < duration) {
        status = "expired";
    }

    return status;
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

const getAppointmentByDate = async (date) => {
    loadingAppointments.value = true
    const result = await getAppointments(date)
    appointments.value = result
    loadingAppointments.value = false
}

const selectDay = async (e) => {
    selectedDay.value = e.startDate
    attributes.value[0].dates = selectedDay.value
    await getAppointmentByDate(e.id)
}


const publishcalendarData = (data) => {
    attributes.value = [
        {
            highlight: true,
            dates: selectedDay.value,
            popover: true,
        },
    ]


    if (data) {
        Object.keys(data).forEach(key => {
            const {
                accepted_appointments_count,
                canceled_appointments_count,
                canceled_before_accepted_appointments_count,
                confirmed_appointments_count,
                pending_appointments_count,
                rejected_appointments_count
            } = data[key];

            if (accepted_appointments_count > 0 || confirmed_appointments_count > 0) {
                attributes.value.push({ dot: 'green', dates: key })
            }

            if (pending_appointments_count > 0) {
                attributes.value.push({ dot: 'yellow', dates: key })
            }

            if (canceled_appointments_count > 0 || canceled_before_accepted_appointments_count > 0 || rejected_appointments_count > 0) {
                attributes.value.push({ dot: 'red', dates: key })
            }

        })
    }

}

const getDataFromApi = async (date) => {
    calendarLoading.value = true
    attributes.value = []

    const result = await calendar(date)
    await publishcalendarData(result)
    calendarLoading.value = false
}

const convertTo12HourFormat = (dateTime) => {
    const dayjs = useDayjs();
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return dayjs.utc(dateTime).tz(localTimezone).format('hh:mm A')
}

const fetchMoreAppointments = async $state => {

    if (appointments.value.links.next == null) { $state.complete(); return }
    try {
        const result = await getPaginationsComments(appointments.value.links.next)
        appointments.value.data.push(...result.data)
        appointments.value.links = result.links
        if (result.data.length < 10) $state.complete()

    } catch (error) {
        $state.error()
    }
}

if (calendarRef.value) {
    await calendarRef.value?.move({ month: new Date().getMonth() + 1, year: new Date().getFullYear() })
}

onMounted(async () => {
    const dayjs = useDayjs()
    await calendarRef.value?.move({ month: new Date().getMonth() + 1, year: new Date().getFullYear() })
    await getAppointmentByDate(dayjs().format('YYYY-MM-DD'))
})

watchEffect(() => {
    let currentDate = new Date().toISOString().slice(0, 7)
    getDataFromApi(currentDate);
});

</script>


<style>
.vc-week {
    padding: 16px 0;
}

.vc-day-layer.vc-day-box-center-bottom {
    padding-top: 2.5rem !important;
}
</style>