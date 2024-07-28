<template>
  <div>
    <input type="file" accept="video/*" @change="handleFileChange" />
    <video id="video-player" controls></video>
    <button @click="uploadVideo">Upload Video</button>
    <p>{{ message }}</p>
    <p>{{ progress }}%</p>
  </div>
</template>

<script setup lang="ts">
import { FFmpeg } from '@ffmpeg/ffmpeg'
import type { LogEvent, ProgressEvent } from '@ffmpeg/ffmpeg/dist/esm/types'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import videojs from 'video.js'
import { ref } from 'vue'

const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm'

const message = ref('Click Start to Transcode')
const progress = ref(0)
const file = ref < File | null > (null)
const compressedVideo = ref < string | null > (null)

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  file.value = target.files ? target.files[0] : null
  if (!file.value) return

  const ffmpeg = new FFmpeg()
  message.value = 'Loading ffmpeg-core.js'
  ffmpeg.on('log', ({ message: msg }: LogEvent) => {
    message.value = msg
  })
  ffmpeg.on('progress', ({ progress: progressEvent }: ProgressEvent) => {
    console.log(Math.round(progressEvent * 100));
    progress.value = Math.round(progressEvent * 100)
  })

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript')
  })

  message.value = 'Start compressing'
  const fileName = file.value.name

  await ffmpeg.writeFile(fileName, await fetchFile(file.value))
  // await ffmpeg.exec(['-i', fileName, '-vcodec', 'libx264', '-crf', '28', 'output.mp4'])
  await ffmpeg.exec(['-i', fileName, '-vcodec', 'libx264', '-preset', 'ultrafast', '-crf', '28', 'output.mp4'])
  message.value = 'Complete compressing'
  const data = await ffmpeg.readFile('output.mp4')
  const compressedBlob = new Blob([data.buffer], { type: 'video/mp4' })
  compressedVideo.value = URL.createObjectURL(compressedBlob)
  const player = videojs('video-player')
  player.src({ type: 'video/mp4', src: compressedVideo.value })
}

const uploadVideo = () => {
  if (compressedVideo.value) {
    // Handle the upload process here
    console.log('Uploading compressed video...')
  } else {
    console.log('No compressed video available to upload.')
  }
}
</script>

<style scoped>
#video-player {
  width: 100%;
  max-width: 600px;
}
</style>