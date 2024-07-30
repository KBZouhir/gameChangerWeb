<template>
    <div :class="(id) ? 'w-72 h-auto' : ''">
      <video ref="videoPlayer" class="video-js vjs-default-skin w-full h-full" controls preload="auto" :poster="poster">
        <source :src="videoSrc" type="video/mp4" />
      </video>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useNuxtApp } from '#app'
  const userAccessToken = useCookie("user_access_token");
  
  const props = defineProps({
    videoSrc: { type: String, required: false },
    poster: { type: String, default: '' },
    id: { type: String, default: '' }
  })
  
  const videoPlayer = ref(null)
  const { $videojs } = useNuxtApp()
  
  onMounted(async () => {


    // Check if token exists, otherwise handle error (e.g., display login message)
    if (!userAccessToken) {
      console.error("Missing user access token for video playback.");
      return;
    }
  
    const player = $videojs(videoPlayer.value, {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true
    })
  
    player.ready(() => {
      if (player.tech && player.tech.name === 'hls') {
        player.tech.hls.xhr.beforeRequest = function(options) {
          options.headers = options.headers || {};
          options.headers.Authorization = `Bearer ${userAccessToken.value}`;
          return options;
        };
      }
    });
  
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