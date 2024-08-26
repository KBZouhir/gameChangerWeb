<template>
  <main>
    <!-- loading is true when the call is in the "joining-meeting" meeting state -->
    <template v-if="loading">
      <div class="loading-spinner"><dailyLoadingTile /></div>
    </template>

    <template v-else>
      <div class="wrapper">
        <template v-if="error">
          <p class="error-text">{{ error }}</p>
          <!-- refreshing will leave the call and reset the app state -->
          <button class="error-button" @click="leaveAndCleanUp">Refresh</button>
        </template>

        <template v-if="showPermissionsError">
          <dailyPermissionsErrorMsg :reset="leaveAndCleanUp" />
        </template>

        <template v-else>
          <div :class="screen ? 'tile-container' : 'tile-container full-height'">
            <template v-if="screen">
              <dailyScreenshareTile :participant="screen" />
            </template>

            <div v-if="participants" class="participants-container">
              <template v-for="p in participants" :key="p.session_id">
                <dailyVideoTile
                  :participant="p"
                  :handle-video-click="handleVideoClick"
                  :handle-audio-click="handleAudioClick"
                  :handle-screenshare-click="handleScreenshareClick"
                  :leave-call="leaveAndCleanUp"
                  :disable-screen-share="screen && !screen?.local"
                />
              </template>

              <template v-if="count === 1">
                <dailyWaitingCard :url="roomUrl" />
              </template>
            </div>
          </div>
        </template>

        <!-- <dailyChatTile :send-message="sendMessage" :messages="messages" /> -->
      </div>
    </template>
  </main>
</template>

<script setup>
import daily from '@daily-co/daily-js';


const props = defineProps(['leaveCall', 'name', 'roomUrl', 'token']);

const callObject = ref(null);
const participants = ref(null);
const count = ref(0);
const messages = ref([]);
const error = ref(false);
const loading = ref(false);
const showPermissionsError = ref(false);
const screen = ref(null);

const updateParticipants = (e) => {
  console.log('[EVENT] ', e);
  if (!callObject.value) return;

  const p = callObject.value.participants();
  count.value = Object.values(p).length;
  participants.value = Object.values(p);

  const screenParticipant = participants.value.filter((p) => p.screenVideoTrack);
  if (screenParticipant?.length && !screen.value) {
    console.log('[SCREEN]', screenParticipant);
    screen.value = screenParticipant[0];
  } else if (!screenParticipant?.length && screen.value) {
    screen.value = null;
  }
  loading.value = false;
};

const updateMessages = (e) => {
  console.log('[MESSAGE] ', e.data);
  messages.value.push(e?.data);
};

const handleError = (e) => {
  console.log('[ERROR] ', e);
  error.value = e?.errorMsg;
  loading.value = false;
};

const handleJoiningMeeting = () => {
  loading.value = true;
};

const handleAudioClick = () => {
  const audioOn = callObject.value.localAudio();
  callObject.value.setLocalAudio(!audioOn);
};

const handleVideoClick = () => {
  const videoOn = callObject.value.localVideo();
  callObject.value.setLocalVideo(!videoOn);
};

const handleDeviceError = () => {
  showPermissionsError.value = true;
};

const handleScreenshareClick = () => {
  if (screen.value?.local) {
    callObject.value.stopScreenShare();
    screen.value = null;
  } else {
    callObject.value.startScreenShare();
  }
};

const sendMessage = (text) => {
  const local = callObject.value.participants().local;
  const message = { message: text, name: local?.user_name || 'Guest' };
  messages.value.push(message);
  callObject.value.sendAppMessage(message, '*');
};

const leaveAndCleanUp = () => {
  if (screen.value?.local) {
    callObject.value.stopScreenShare();
  }
  callObject.value.leave().then(() => {
    callObject.value.destroy();
    screen.value = null;
    props.leaveCall();
  });
};

onMounted(() => {
  const option = {
    url: props.roomUrl,
    token: props.token
  };

  const co = daily.createCallObject(option);
  callObject.value = co;

  co.join({ userName: props.name });

  co.on('joining-meeting', handleJoiningMeeting)
    .on('joined-meeting', updateParticipants)
    .on('participant-joined', updateParticipants)
    .on('participant-updated', updateParticipants)
    .on('participant-left', updateParticipants)
    .on('error', handleError)
    .on('camera-error', handleDeviceError)
    .on('app-message', updateMessages);
});

onBeforeUnmount(() => {
  if (!callObject.value) return;

  callObject.value.off('joining-meeting', handleJoiningMeeting)
    .off('joined-meeting', updateParticipants)
    .off('participant-joined', updateParticipants)
    .off('participant-updated', updateParticipants)
    .off('participant-left', updateParticipants)
    .off('error', handleError)
    .off('camera-error', handleDeviceError)
    .off('app-message', updateMessages);
});
</script>

<style scoped>

.wrapper {
  max-width: 1200px;
  margin: auto;
  padding: 0 16px;
  height: 100%;
}
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.tile-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.participants-container {
  display: flex;
  margin: 0 -20px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  background-color: #121a24;
  height: inherit;
}
p {
  color: white;
}
.error-text {
  color: #e71115;
}
.full-height {
  height: 100%;
}
.error-button {
  color: #fff;
  background-color: #121a24;
  border: none;
  font-size: 12px;
  border: 1px solid #2b3f56;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
