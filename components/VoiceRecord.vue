<template>
    <div class="flex items-center">
        <div class="left-0 absolute flex items-center h-full bg-white dark:bg-[#0d131f] px-4">
            <!-- <div class="flex items-center  border border-dashed rounded-md">
                <audio :src="audioUrl" controls></audio>
                <UButton @click="uploadAudio" icon="i-tabler-upload" size="sm" color="white" square variant="link" />
                <UButton @click="uploadAudio" icon="i-tabler-trash" size="sm" color="red" square variant="link" />
            </div> -->
            <div class="w-[400px]" ref="waveFormRef"></div>
        </div>
        <div class="">
            <UButton v-if="!isRecording" @click="startRecording" icon="i-heroicons-microphone" size="sm" color="white"
                square variant="link" />
            <UButton v-else @click="stopRecording" icon="i-heroicons-microphone" size="sm" color="green" square
                variant="link" />
        </div>
    </div>
</template>

<script setup>
import WaveSurfer from 'wavesurfer.js'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'

const isRecording = ref(false)
const wavesurferInstence = ref(null)
const waveFormRef = ref(null)
const record = ref(null)

const createWaveSurfer = () => {

  if (wavesurferInstence.value) {
    wavesurferInstence.value.destroy()
  }
  wavesurferInstence.value = WaveSurfer.create({
    container: waveFormRef.value,
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
  })

  record.value = wavesurferInstence.value.registerPlugin(RecordPlugin.create({ renderRecordedAudio: false }))

  record.value.on('record-end', (blob) => {
    const url = URL.createObjectURL(blob)
    console.log(url);
    
  })

  record.value.on('record-progress', (time) => {
    console.log(time);
    
  })
}

const startRecording = () => {
    createWaveSurfer()
    isRecording.value = true
}

const stopRecording = () => {
    console.log('isRecording',record.value.isRecording());
    console.log('isPaused',record.value.isPaused());
    
    // if (record.value.isRecording() || record.value.isPaused()) {
    //     record.value.stopRecording()
    //     isRecording.value = false
    // }
        
}



</script>

<style scoped>

</style>