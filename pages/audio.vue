<template>
    <div class="flex items-center space-x-6 dark:bg-gray-800 bg-gray-100 py-3 px-4 rounded-full h-[50px]">
        <div>
            <UButton v-if="!isPlaying" @click="playAudio()" icon="i-heroicons-play" size="sm" color="white" square variant="link" />
            <UButton v-if="isPlaying" @click="stopAudio()" icon="i-heroicons-pause" size="sm" color="white" square variant="link" />
        </div>
        <div class="flex-1">
            <div class="flex -space-x-2 overflow-hidden items-center">
                <div class="w-full" ref="waveFormRef"></div>
                <img v-for="i in 100" :src="equalizer" draggable="false" class="h-full" style="height: 50px;" alt="" srcset="">
            </div>
        </div>
        <div>
            <span class="text-sm">{{duration}}</span>
        </div>
    </div>


</template>

<script setup>
import WaveSurfer from 'wavesurfer.js'
import { getAudioByID } from '~/composables/store/useMedia'

import equalizer from '~/assets/svg/particules/equalizer.svg'

const waveSurferInstance = ref(null);
const waveFormRef = ref(null);
const duration = ref(0);
const isPlaying = ref(false);
const audio = ref(null);


const initWaveSurfer = () => {
    const audio = new Audio();
    audio.controls = true
    audio.src = '/sounds/radiant-surge-237026.mp3'

    audio.addEventListener('loadedmetadata', () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        duration.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    });
    

    waveSurferInstance.value = WaveSurfer.create({
        container: waveFormRef.value,
        height: 30,
        waveColor: '#A9A9A9',
        progressColor: '#FFD700',
        barWidth: 5,
        barRadius: 10,
        barGap: 2,
        media: audio,
        duration: 22,
    })

}


const playAudio = () => {
    isPlaying.value = true;
    waveSurferInstance.value.play()
};

const stopAudio = () => {
    isPlaying.value = false;
    waveSurferInstance.value.pause()
};



onMounted(() => {
    // initWaveSurfer();
})


</script>

<style scoped>
.audio-component {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>