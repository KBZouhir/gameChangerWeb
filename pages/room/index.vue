<template>
    <div>
        <dailyCallTile name="charafe" :leaveCall="leaveCall" :roomUrl="'https://test-informatikab.daily.co/TWyDRb6ty5GWxip3f3Qg'"/>
    </div>
</template>

<script setup>
import { getRoomToken } from '~/composables/store/useAppointment'


definePageMeta({
    layout: 'auth',
    title: 'Service',
    middleware: ['auth']
})

const getCurrentRoomToken = async () => {
    await getRoomToken()
}

const leaveCall = () => {
    console.log('leaveCall')
}
</script>