<template>
  <div class="tile">
    <audio autoPlay playsInline :srcObject="audioSource">
      <track kind="captions" />
    </audio>

    <template v-if="participant.video">
      <video autoPlay muted playsInline :srcObject="videoSource"></video>
      <p class="participant-name">{{ username }}</p>
    </template>

    <template v-else>
      <dailyNoVideoTile :username="username" />
    </template>

    <template v-if="participant.local">
      <dailyCallControls
        :handle-video-click="handleVideoClick"
        :handle-audio-click="handleAudioClick"
        :handle-screenshare-click="handleScreenshareClick"
        :participant="participant"
        :leave-call="leaveCall"
        :disable-screen-share="disableScreenShare"
      />
    </template>
  </div>
</template>

<script setup>

const props = defineProps({
  participant: Object,
  handleVideoClick: Function,
  handleAudioClick: Function,
  handleScreenshareClick: Function,
  leaveCall: Function,
  disableScreenShare: Boolean
});

const videoSource = ref(null);
const audioSource = ref(null);
const username = ref('Guest');

// Watch for participant changes
watch(() => props.participant, (newParticipant) => {
  username.value = newParticipant?.user_name;
  handleVideo(newParticipant);
  handleAudio(newParticipant);
}, { immediate: true });

const handleVideo = (participant) => {
  if (!participant?.video) return;

  const track = participant.tracks.video.persistentTrack;
  const newStream = updateSource(videoSource.value, track);
  if (newStream) {
    videoSource.value = newStream;
  }
};

const handleAudio = (participant) => {
  if (!participant || participant.local || !participant.audio) return;

  const track = participant.tracks.audio.persistentTrack;
  const newStream = updateSource(audioSource.value, track);
  if (newStream) {
    audioSource.value = newStream;
  }
};

const updateSource = (stream, newTrack) => {
  const existingTracks = stream?.getTracks();
  if (!existingTracks || existingTracks.length === 0) {
    return new MediaStream([newTrack]);
  }
  if (existingTracks.length > 1) {
    console.warn(`expected 1 track, found ${existingTracks.length}. Only using the first one.`);
  }
  const existingTrack = existingTracks[0];
  if (newTrack.id !== existingTrack.id) {
    stream.removeTrack(existingTrack);
    stream.addTrack(newTrack);
  }
  return null;
};
</script>

<style scoped>
.tile {
  max-width: 50%;
  flex: 1 1 350px;
  margin: 10px 20px;
  position: relative;
}
video {
  width: 100%;
  border-radius: 16px;
}
.participant-name {
  position: absolute;
  color: #fff;
  top: 12px;
  right: 12px;
  margin: 0;
}
@media screen and (max-width: 700px) {
  .tile {
    max-width: 100%;
    margin: 10px 20px;
  }
}
</style>
