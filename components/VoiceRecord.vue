<template>
  <div class="flex items-center">
    <div v-show="isRecording"
      class="left-0 absolute flex items-center space-x-4 w-full h-full bg-white dark:bg-[#111827] px-4 z-50">
      <span class="text-sm">{{ duration }}</span>
      <div class="flex-1" ref="waveFormRef"></div>

      <div class="flex space-x-1 items-center">
        <UButton @click="stopRecording()" size="md" color="red" square>
          <template #trailing>
            <Icon name="tabler:player-stop" />
          </template>
        </UButton>
        <UButton @click="toggleRecord()" size="md" color="white" square>
          <template #trailing>
            <Icon :name="`tabler:player-${(pauseRecord) ? 'play' : 'pause'}`" />
          </template>
        </UButton>
      </div>
    </div>

    <div v-show="audio"
      class="left-0 absolute flex items-center space-x-4 w-full h-full bg-white dark:bg-[#111827] px-4 z-50">

      <UButton v-if="!isPlaying" @click="playAudio()" size="md" color="white" square>
        <template #trailing>
          <Icon name="tabler:player-play" />
        </template>
      </UButton>

      <UButton v-if="isPlaying" @click="stopAudio()" size="md" color="white" square>
        <template #trailing>
          <Icon name="tabler:player-pause" />
        </template>
      </UButton>

      <div class="flex-1" ref="waveRocordRef"></div>
      <span class="text-sm">{{ duration }}</span>
      <div class="flex space-x-1 items-center">
        <UButton @click="removeRecord()" size="md" color="red" square>
          <template #trailing>
            <Icon name="tabler:trash" />
          </template>
        </UButton>
        <UButton @click="sendRocord()" size="md" color="white" square>
          <template #trailing>
            <Icon name="tabler:send" />
          </template>
        </UButton>
      </div>

    </div>

    <div class="">
      <UButton v-if="!isRecording" @click="startRecording" icon="i-heroicons-microphone" size="sm" color="white" square
        variant="link" />

    </div>
  </div>
</template>

<script setup>
import WaveSurfer from 'wavesurfer.js'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'
import { uploadVideo } from '~/composables/store/useVideo'

const isRecording = ref(false)
const scrollingWaveform = ref(true)

const isPlaying = ref(false)
const wavesurferInstence = ref(null)
const waveRocordInstence = ref(null)
const waveFormRef = ref(null)
const waveRocordRef = ref(null)
const record = ref(null)
const pauseRecord = ref(false)
const recordedBlob = ref(null)
const audio = ref(null);
const duration = ref(null)
const uploding = ref(false)


const emits = defineEmits(['sendRecordFile'])

const createWaveSurfer = () => {

  if (wavesurferInstence.value) {
    wavesurferInstence.value.destroy()
    isPlaying.value = false
  }
  wavesurferInstence.value = WaveSurfer.create({
    container: waveFormRef.value,
    waveColor: '#FFFFFF',
    height: 30,
    autoScroll: true,
    autoCenter: true,
    progressColor: 'rgb(100, 0, 100)',
    autoplay: false,
    cursorWidth: 0,
    barWidth: 10,
    barRadius: 10,
    barGap: 2,
  })

  record.value = wavesurferInstence.value.registerPlugin(RecordPlugin.create({ scrollingWaveform: scrollingWaveform.value ,renderRecordedAudio: false }))

  record.value.on('record-end', (blob) => {
    recordedBlob.value = blob;
    audio.value = new Audio();
    audio.value.controls = true;
    audio.value.src = URL.createObjectURL(blob);

    initRocordWaveSurfer();
  });

  record.value.on('record-progress', (time) => {
    updateProgress(time)
  })
}

const updateProgress = (time) => {
  const formattedTime = [
    Math.floor((time % 3600000) / 60000),
    Math.floor((time % 60000) / 1000),
  ]
    .map((v) => (v < 10 ? '0' + v : v))
    .join(':')
  duration.value = formattedTime
}

const initRocordWaveSurfer = () => {

  if (waveRocordInstence.value) {
    waveRocordInstence.value.destroy()
  }
  waveRocordInstence.value = WaveSurfer.create({
    container: waveRocordRef.value,
    waveColor: '#A9A9A9',
    height: 30,
    autoScroll: true,
    autoCenter: true,
    progressColor: '#FFFFFF',
    autoplay: false,
    cursorWidth: 0,
    barWidth: 10,
    barRadius: 10,
    barGap: 2,
    media: audio.value,
  })

}

const startRecording = () => {
  createWaveSurfer()
  record.value.startRecording().then(() => {
    console.log('Recording started')
  })
  isRecording.value = true
}

const stopRecording = () => {
  if (record.value.isRecording() || record.value.isPaused()) {
    record.value.stopRecording()
    isRecording.value = false
  }
}

const removeRecord = () => {
  audio.value = null
  waveRocordInstence.value.destroy()
}

const toggleRecord = () => {
  if (record.value.isPaused()) {
    pauseRecord.value = false
    record.value.resumeRecording()
    return
  }

  record.value.pauseRecording()
  pauseRecord.value = true
}

const sendRocord = async () => {
  let formdata = new FormData();
  formdata.append("file", recordedBlob.value);
  uploding.value = true
  const result = await uploadVideo(formdata)
  uploding.value = false
  if(result?.success){
    audio.value = null
    waveRocordInstence.value.destroy()
    wavesurferInstence.value.destroy()
    emits('sendRecordFile', result.id)
  }
  
}

const playAudio = async () => {
  isPlaying.value = true;
  waveRocordInstence.value.play()
}

const stopAudio = () => {
  isPlaying.value = false;
  waveRocordInstence.value.pause()
}

</script>

<style scoped></style>