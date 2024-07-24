<script setup>

const iconsList = ref(
    [

    ]
)


const props = defineProps({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        default: 'text'
    },
})

</script>

<template>
    <img src="/assets/svg/icons/heart.svg">
</template>