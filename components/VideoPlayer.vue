<template>
  <div class="rounded-md overflow-hidden" :class="id ? 'w-72 h-auto' : ''">
    <video ref="videoPlayer" class="video-js vjs-default-skin w-full h-full" controls preload="auto" :poster="poster">
      <source :src="videoSrc" type="video/mp4" />
    </video>
  </div>
</template>

<script setup>
import { useNuxtApp, useCookie } from '#app'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const userAccessToken = useCookie('user_access_token')

const props = defineProps({
  videoSrc: { type: String, required: false },
  poster: { type: String, default: '' },
  id: { type: String, default: '' }
})

const videoPlayer = ref(null)
const { $videojs } = useNuxtApp()
const poster = ref(props.poster) 

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

const fetchAndPlayVideo = async () => {
  try {
      const response = await fetch(props.videoSrc, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userAccessToken.value}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      const videoBlob = await response.blob();
      const videoUrl = URL.createObjectURL(videoBlob);
      
      videoPlayer.value.src = videoUrl;

    } catch (error) {
      console.error('Error fetching video:', error);
    }
}

onMounted(async () => {
  if (!userAccessToken.value) {
    console.error('Missing user access token for video playback.')
    return
  }

  if (props.poster) {
    const posterBlobUrl = await fetchPosterAsBlob(props.poster)
    poster.value = posterBlobUrl
  }

  const player = $videojs(videoPlayer.value, {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true
  })

  fetchAndPlayVideo()
  // player.on('play', fetchAndPlayVideo)

  player.on('play', () => {
    const allPlayers = $videojs.getPlayers()
    for (const playerId in allPlayers) {
      if (playerId !== player.id()) {
        allPlayers[playerId].pause()
      }
    }
  })

  player.on('error', (e) => {
    console.error('Video.js error:', e)
  })

  onBeforeUnmount(() => {
    if (player) {
      player.dispose()
    }
  })
})

watchEffect(() => {
  fetchPosterAsBlob(props.poster)
});

</script>

<style scoped>
.video-js {
  width: 100%;
  height: 100%;
}
</style>
