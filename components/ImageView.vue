<template>
    <div>
        <div class="relative rounded-lg overflow-hidden " :class="(id) ? 'w-72 h-52' : 'h-96'">
            <img v-if="imageSrc" :src="imageSrc" alt="Image" class="z-10 w-full h-full object-cover" @click="openLightboxOnSlide()">
            <div v-else class="flex justify-center items-center absolute w-full h-full top-0 left-0 bg-slate-100/70 dark:bg-slate-800/70 z-50">
                <UButton loading variant="link" :color="(colorMode.value != 'light') ? 'white' : 'primary'" class="text-white" disabled></UButton>
            </div>
        </div>
        <FsLightbox :toggler="toggler" :slide="slide" :showThumbsOnMount="true" :sources="[imageSrc]" />
    </div>
</template>

<script setup>
import FsLightbox from "fslightbox-vue/v3"
import { get, getImagebyID } from '~/composables/store/useMedia'

const colorMode = useColorMode()

const toggler = ref(false)
const slide = ref(1)

const props = defineProps({
    url: {
        type: String,
        required: false,
    },
    id: {
        type: String,
        required: false,
        default: null
    },
})

const imageSrc = ref(null)


const openLightboxOnSlide = () => {
    toggler.value = !toggler.value;
}


onMounted(async () => {
    let blob
    if (props.url) {
        blob = await get(props.url)
    } else {
        blob = await getImagebyID(props.id)
    }
    if (blob) {
        imageSrc.value = URL.createObjectURL(blob)
    }
})
</script>