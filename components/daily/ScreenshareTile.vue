<template>
  <div class="screen-share-tile">
    <video autoPlay muted playsInline :srcObject="videoSource"></video>
  </div>
</template>

<script setup>
const props = defineProps({
  participant: Object
});

const videoSource = ref(null);

const handleVideo = (participant) => {
  if (!participant?.screen) return;
  const videoTrack = participant?.screenVideoTrack;
  const source = new MediaStream([videoTrack]);
  videoSource.value = source;
};

// Watch for changes in participant and update video source
watch(() => props.participant, (newParticipant) => {
  handleVideo(newParticipant);
}, { immediate: true });
</script>

<style scoped>
.screen-share-tile {
  margin: 10px 20px;
  position: relative;
  max-width: 670px;
}
video {
  width: 100%;
  border-radius: 16px;
}
</style>
