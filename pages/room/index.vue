<template>
    <div>
        <dailyCallTile name="charafe" :leaveCall="leaveCall" :roomUrl="'https://test-informatikab.daily.co/2RKChl83XBai6WWFK89S'"/>
    </div>
</template>

<script setup>


definePageMeta({
    layout: 'auth',
    title: 'Service',
    middleware: ['auth']
})

const leaveCall = () => {
    console.log('leaveCall')
}
</script>