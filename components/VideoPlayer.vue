<template>
    <div>
        <video ref="videoPlayer" class="video-js vjs-default-skin" controls preload="auto" :poster="poster">
            <source :src="videoSrc" type="video/mp4" />
        </video>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { get } from "~/composables/store/useMedia"
import { useNuxtApp } from '#app'

const props = defineProps({
    videoSrc: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        default: ''
    }
})

const videoPlayer = ref(null)
const videoSrc = ref()
const { $videojs } = useNuxtApp()

onMounted(async () => {
    const player = $videojs(videoPlayer.value, {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true
    })
})

onBeforeUnmount(() => {
    if (player) {
        player.dispose()
    }
})
</script>

<style scoped>
.video-js {
    width: 100%;
    height: 100%;
}
</style>