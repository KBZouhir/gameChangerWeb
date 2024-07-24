<template>
    <div>
        <video ref="videoPlayer" class="video-js vjs-default-skin" controls preload="auto" :poster="poster">
            <source :src="videoSrc" type="video/mp4" />
        </video>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useNuxtApp } from '#app'


const userTokenCookie = useCookie("user_access_token");

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
const { $videojs } = useNuxtApp()

onMounted(async () => {

    const player = $videojs(videoPlayer.value, {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true
    })

    player.ready(() => {
        const tech = player.tech({ IWillNotUseThisInPlugins: true })
        if (tech && tech.constructor.name === 'Html5') {
            const xhr = tech.options_.xhr
            xhr.beforeRequest = (options) => {
                options.headers = {
                    ...options.headers,
                    'Authorization': `Bearer ${userTokenCookie.value}`
                }
                return options
            }
        }
    })

    onBeforeUnmount(() => {
        if (player) {
            player.dispose()
        }
    })
})


</script>

<style scoped>
.video-js {
    width: 100%;
    height: 100%;
}
</style>