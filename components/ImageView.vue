<template>
    <div>
        <img src="" alt="">
    </div>
</template>

<script setup>
import { get } from "~/composables/store/useMedia"
const props = defineProps({
    image: {
        type: String,
        required: true
    },
})

const data = ref()


onMounted(async () => {
    await get(props.image);
})


</script>