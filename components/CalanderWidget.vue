<template>
    <ClientOnly>
        <VCalendar ref="calendarRef" :min-date="new Date()" :value="new Date()" view="weekly" transparent borderless expanded color="green"
            @dayclick="selectDay" :week-height="100" :show-weeks="1"
            :is-dark="$colorMode.value == 'dark' ? true : false">

        </VCalendar>
        <template #fallback>
            <p>{{ $t('Loading calendar...') }}</p>
        </template>

        <div>
            <div v-if="loadingAppointments" class="flex justify-center">
                <LoadingIcon />
            </div>
            <div v-else-if="appointments?.meta.total > 0" class="grid grid-cols-1 gap-4">
                <div>
                    <NuxtLink v-for="appointment in appointments?.data" :to="`/appointment/${appointment.id}`">
                        <div class="border border-slate-100 dark:border-gray-700 shadow-sm rounded-md px-3 py-4 mb-2">
                            <div class="flex items-start justify-between">
                                <div>
                                    <div class="flex items-start space-x-1">
                                        <span class="text-xs line-clamp-1">{{ appointment.requester.full_name }}</span>
                                    </div>
                                    <p class="line-clamp-2">
                                        {{ appointment.description }}
                                    </p>
                                </div>
                                <span :class="badgeType(appointmentStatus(appointment))"
                                    class="inline-flex items-center rounded-md capitalize  px-2 py-1 text-xs font-medium  ring-1 ring-inset ">
                                    {{ appointmentStatus(appointment) }}
                                </span>
                            </div>
                        </div>
                    </NuxtLink>
                </div>

            </div>

            <div v-else-if="appointments?.meta.total == 0" class="flex justify-center">
                <p>{{ $t('No appointments found') }}</p>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
import { getAppointments } from '~/composables/store/useAppointment'
import { useAuthStore } from "~/stores/authStore"


const loadingAppointments = ref(false)
const appointments = ref()
const selectedDay = ref()

const authStore = useAuthStore()
const user = computed(() => authStore.getAuthUser)

const attributes = ref([
    {
        highlight: true,
        dates: new Date(),
    },
])

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

const appointmentStatus = (object) => {
    const dayjs = useDayjs();

    if (object) {
        const { status: jsonStatus, begin_at, end_at, room_opened_at, room_closed_at, is_requested_by_me } = object;

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

            if (timeToBegin < 0) {
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

watchEffect(() => {
    getAppointmentByDate(new Date().toISOString().split('T')[0])
})

</script>