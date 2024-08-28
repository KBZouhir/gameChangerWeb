<template>
  <main class="wrapper">
    <div class="home" v-if="status === 'home'">
      <form @submit="submitJoinRoom">
        <label for="room">Daily Room URL</label>
        <input id="room" type="text" placeholder="Enter room URL..." v-model="roomUrl"
          pattern="^(https:\/\/)?[\w.-]+(\.(daily\.(co)))+[\/\/]+[\w.-]+$" @input="validateInput" />
        <input type="submit" value="Join room" :disabled="!validRoomURL" />
      </form>
      <!-- Daily room URL is entered here -->
    </div>

    <div class="call-container" :class="{ hidden: status === 'home' }">
      <!-- The Daily Prebuilt iframe is embedded in the div below using the ref -->
      <div id="call" ref="callRef"></div>
      <!-- Only show the control panel if a call is live -->

    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import DailyIframe from "@daily-co/daily-js";

const IFRAME_OPTIONS = {
  height: "auto",
  width: "100%",
  aspectRatio: 16 / 9,
  minWidth: "400px",
  maxWidth: "920px",
  border: "1px solid var(--grey)",
  borderRadius: "4px",
};

// Reactive state
const roomUrl = ref("");
const status = ref("home");
const callFrame = ref(null);
const validRoomURL = ref(false);
const roomError = ref(false);

// Computed property
const runningLocally = computed(() => window?.location?.origin.includes("localhost"));

// Methods
const joinRoom = (url) => {
  if (callFrame.value) {
    callFrame.value.destroy();
  }

  // Daily event callbacks
  const logEvent = (ev) => console.log(ev);
  const goToLobby = () => (status.value = "lobby");
  const goToCall = () => (status.value = "call");
  const leaveCall = () => {
    if (callFrame.value) {
      status.value = "home";
      callFrame.value.destroy();
    }
  };

  // DailyIframe container element
  const callWrapper = document.getElementById('callRef');

  // Create Daily call
  const frame = DailyIframe.createFrame(callWrapper, {
    iframeStyle: IFRAME_OPTIONS,
    showLeaveButton: true,
  });
  callFrame.value = frame;

  // Add event listeners and join call
  frame
    .on("loaded", logEvent)
    .on("started-camera", logEvent)
    .on("camera-error", logEvent)
    .on("joining-meeting", goToLobby)
    .on("joined-meeting", goToCall)
    .on("left-meeting", leaveCall);

  frame.join({ url, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvIjpmYWxzZSwiciI6Ikh2cjJ4TEx5Q244eTNCcm9RY29YIiwiZXhwIjoxNzI0Nzk0MTA1LCJ1IjoiTGluYSBLcm91c2UiLCJ1ZCI6MSwic3MiOmZhbHNlLCJ2byI6dHJ1ZSwiYW8iOnRydWUsInAiOnsiY3MiOmZhbHNlfSwiZCI6ImRiNjViYzUzLTQ3NzAtNGM3YS05NDE4LTUzYmQ1NzA4YTNkMiIsImlhdCI6MTcyNDc5MjMwNX0.UzUWa4ptzM7usiGJwwcQEjkExXASm7sEQZVbEFFUulQ', showFullscreenButton: true });
};

const submitJoinRoom = (e) => {
  e.preventDefault();
  joinRoom(roomUrl.value);
};

const validateInput = (e) => {
  validRoomURL.value = !!roomUrl.value && e.target.checkValidity();
};
</script>

<style scoped>
.wrapper {
  background-color: var(--grey-lightest);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
}

.home {
  flex: 1;
}

.error {
  color: var(--red-dark);
}

.call-container {
  display: flex;
  max-width: 1200px;
  margin: auto;
  flex: 1;
  flex-wrap: wrap;
}

.call-container.hidden {
  flex: 0;
}

#call {
  flex: 1;
  margin-top: 24px;
}

.start-call-container {
  display: flex;
  flex-direction: column;
  max-width: 200px;
  margin: auto;
}

.start-call-container .subtext {
  margin: 8px 0 0;
}

.start-call-container input {
  margin-top: 8px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--grey);
  padding: 0 16px;
}

.start-call-container button {
  color: var(--dark-blue);
  background: var(--teal);
  border: 1px solid transparent;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
}

.start-call-container input[type="submit"] {
  color: var(--dark-blue);
  background: var(--teal);
  border: 1px solid transparent;
  padding: 6px 16px 8px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
}

button:disabled,
.start-call-container input[type="submit"]:disabled {
  cursor: not-allowed;
  background: var(--white);
  border: 1px solid var(--grey);
}

label {
  opacity: 0;
  font-size: 1px;
}
</style>