<template>
  <div class="h-[400px]">
    <video ref="videoPlayer" class="video-js vjs-default-skin w-full h-full" controls preload="auto"></video>
  </div>
</template>

<script setup>
const { $videojs } = useNuxtApp()

const userAccessToken = useCookie('user_access_token')
const videoPlayer = ref(null)

const props = defineProps({
  videoSrc: { type: String, required: false },
  poster: { type: String, default: '' },
})

onMounted(() => {
  if (!props.videoSrc) {
    console.error('Video source is not provided');
    return;
  }

  console.log('Initializing video player with source:', props.videoSrc);

  const player = $videojs(videoPlayer.value, {
    sources: [{
      src: 'https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.m3u8',
    }],
    controls: true,
    preload: 'auto',
    headers: {
      Authorization: `Bearer ${userAccessToken.value}`
    }
  });

  player.on('error', () => {
    const error = player.error();
    console.error('Video player error:', error);
  });

  onBeforeUnmount(() => {
    player.dispose()
  });
});
</script>