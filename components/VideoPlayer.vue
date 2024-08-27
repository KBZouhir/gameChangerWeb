<template>
  <div :class="id ? 'w-72 h-auto' : ''">
    <video ref="videoPlayer" class="video-js vjs-default-skin w-full h-full" controls preload="auto" :poster="poster">
      <source :src="videoSrc" type="video/mp4" />
    </video>
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const userAccessToken = useCookie('user_access_token')

const props = defineProps({
  videoSrc: { type: String, required: false },
  poster: { type: String, default: '' },
  id: { type: String, default: '' }
})

const videoPlayer = ref(null)
const { $videojs } = useNuxtApp()
const poster = ref()

const fetchPosterAsBlob = async (posterUrl) => {
  if (!posterUrl) return ''

  try {
    const response = await fetch(posterUrl, {
      headers: {
        Authorization: `Bearer ${userAccessToken.value}`
      }
    })
    if (!response.ok) {
      console.error('Failed to fetch poster image')
      return ''
    }
    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error fetching poster image:', error)
    return ''
  }
}

onMounted(async () => {
  if (!userAccessToken.value) {
    console.error('Missing user access token for video playback.')
    return
  }


  const posterBlobUrl = await fetchPosterAsBlob(props.poster)
  poster.value = posterBlobUrl

  const player = $videojs(videoPlayer.value, {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true
  })


  player.ready(() => {
    // Ensure VHS is available
    const vhsOptions = player.tech()?.vhs || player.tech()?.hls;

    if (vhsOptions) {
      vhsOptions.xhr.beforeRequest = (options) => {
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${userAccessToken.value}`
        return options
      }
    } else {
      console.error('VHS or HLS is not properly initialized.')
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
