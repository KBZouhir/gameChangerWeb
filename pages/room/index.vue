<template>
    <div>
        <dailyCallTile name="charafe" :leaveCall="leaveCall" :roomUrl="'https://test-informatikab.daily.co/Xks0CmU2ggF1lUPy7hfp'"/>
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