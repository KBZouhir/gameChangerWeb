<template>
    <div>
        <div class="w-full px-4 py-4 max-w-screen-lg mx-auto">
            <ClientOnly>
                <VCalendar expanded color="green" @dayclick="selectDay" @did-move="calanderSwipePage"
                    :attributes="attributes" :is-dark="$colorMode.value == 'dark' ? true : false">

                    <!-- <template #day-content="{ day, dayEvents }">
                    <USkeleton v-if="calanderLoading" class="h-8 w-8 mx-auto" :ui="{ rounded: 'rounded-full' }" />
                    <div v-else class="vc-day-content vc-focusable vc-focus vc-attr mx-auto">
                        {{ day.day }}
                    </div>
                    
                </template> -->
                </VCalendar>
                <template #fallback>
                    <p>Loading comments...</p>
                </template>
            </ClientOnly>


            {{ slecteddar }}
        </div>
    </div>
</template>

<script setup>
import { calander, getAppointments } from '~/composables/store/useAppointment'

const selectedDay = ref(new Date())

const calanderLoading = ref(false)

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


const calanderSwipePage = async (e) => {
    getDataFromApi(e[0].id);
}

const selectDay = async (e) => {
    selectedDay.value = e.startDate
    attributes.value[0].dates = selectedDay.value
    const result = await getAppointments(e.id)
}


const publishCalanderData = (data) => {
    attributes.value = [
        {
            highlight: true,
            dates: selectedDay.value,
            popover: true,
        },
    ]


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




const getDataFromApi = async (date) => {
    calanderLoading.value = true
    attributes.value = []

    const result = await calander(date)
    await publishCalanderData(result)
    calanderLoading.value = false
}

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