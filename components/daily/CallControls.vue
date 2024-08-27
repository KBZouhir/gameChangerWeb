<template>
  <div class="controls">
    <div class="devices">
      <button @click="handleAudioClick">
        <template v-if="participant.audio">
          <Icon name="tabler:microphone" />
        </template>
        <template v-else>
          <Icon name="tabler:microphone-off" />
        </template>
      </button>

      <button @click="handleVideoClick">
        <template v-if="participant.video">
          <Icon name="tabler:video" />
        </template>
        <template v-else>
          <Icon name="tabler:video-off" />
        </template>
      </button>

      <template v-if="supportsScreenshare">
        <button :disabled="disableScreenShare" @click="handleScreenshareClick">
          <Icon name="tabler:screen-share" />
        </button>
      </template>
    </div>

    <button class="leave" @click="leaveCall">
      <Icon name="tabler:phone-off" />
    </button>
  </div>
</template>

<script>
import daily from "@daily-co/daily-js";


export default {
  name: "CallControls",
  props: [
    "participant",
    "handleVideoClick",
    "handleAudioClick",
    "handleScreenshareClick",
    "leaveCall",
    "disableScreenShare",
  ],
  data() {
    return {
      supportsScreenshare: false,
    };
  },
  mounted() {
    this.supportsScreenshare = daily.supportedBrowser().supportsScreenShare;
  },
};
</script>

<style scoped>
.controls {
  position: absolute;
  bottom: 12px;
  left: 8px;
  justify-content: space-between;
  display: flex;
  width: calc(100% - 16px);
}

.devices {
  border-radius: 12px;
  background-color: #121a24;
  opacity: 0.85;
  padding: 14px 10px 15px;
}
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
button:not(.leave) {
  margin: 0 4px;
  width: 36px;
  height: 26px;
}
button.leave {
  background-color: #f63135;
  opacity: 0.85;
  padding: 14px 16px 15px;
  border-radius: 12px;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}
.icon {
  height: 24px;
}
</style>
