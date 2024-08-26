<template>
    <div>
        <dailyCallTile name="charafe" :leaveCall="leaveCall" :roomUrl="roomLink" :token="token"/>
    </div>
</template>

<script setup>


const route = useRoute()

const roomLink = route.query.link
const token = route.query.token

const leaveCall = () => {
    console.log('leaveCall')
}
</script>