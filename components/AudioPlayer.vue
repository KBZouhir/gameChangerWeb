<template>
    <div class="flex items-center space-x-2 dark:bg-gray-800 bg-gray-100 py-3 px-4 rounded-full h-[50px] w-[300px]">
        <div>
            <UButton v-if="!isPlaying && !loading" @click="playAudio()" icon="i-heroicons-play" size="sm" color="white"
                square variant="link" />
            <svg v-if="loading" aria-hidden="true"
                class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
            </svg>
            <UButton v-if="isPlaying" @click="stopAudio()" icon="i-heroicons-pause" size="sm" color="white" square
                variant="link" />
        </div>
        <div class="flex-1">
            <div class="flex -space-x-2 overflow-hidden items-center">
                <div class="w-full" ref="waveFormRef"></div>
                <img v-if="!audio" v-for="i in 100" :src="equalizer" draggable="false" class="h-full dark:hidden flex"
                    style="height: 50px;" alt="" srcset="">
                <img v-if="!audio" v-for="i in 100" :src="equalizerWhite" draggable="false"
                    class="h-full dark:flex hidden" style="height: 50px;" alt="" srcset="">
            </div>
        </div>
        <div>
            <span class="text-sm">{{ duration }}</span>
        </div>
    </div>


</template>

<script setup>
import WaveSurfer from 'wavesurfer.js'
import { getAudioByID } from '~/composables/store/useMedia'

import equalizer from '~/assets/svg/particules/equalizer.svg'
import equalizerWhite from '~/assets/svg/particules/equalizer-white.svg'

const colorMode = useColorMode()


const waveSurferInstance = ref(null);
const waveFormRef = ref(null);
const duration = ref(null);
const isPlaying = ref(false);
const loading = ref(false);
const audio = ref(null);

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const fetchAudio = async () => {
    loading.value = true
    const result = await getAudioByID(props.id)
    if (result) {
        audio.value = new Audio()
        audio.value.controls = true
        audio.value.src = URL.createObjectURL(result)

        audio.value.addEventListener('loadedmetadata', () => {
            const minutes = Math.floor(audio.value.duration / 60);
            const seconds = Math.floor(audio.value.duration % 60);
            duration.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        });

        initWaveSurfer()
    }
    loading.value = false
}

const initWaveSurfer = () => {
    waveSurferInstance.value = WaveSurfer.create({
        container: waveFormRef.value,
        height: 30,
        waveColor: '#A9A9A9',
        progressColor: colorMode.value == 'dark' ? '#FFFFFF' : '#000000',
        barWidth: 5,
        barRadius: 10,
        barGap: 2,
        media: audio.value,
        duration: 22,
    })


    waveSurferInstance.value.on('interaction', () => {
        isPlaying.value = true;
        waveSurferInstance.value.play()
    })

    waveSurferInstance.value.on('finish', () => {
        isPlaying.value = false;
        waveSurferInstance.value.setTime(0)
    })

}


const playAudio = async () => {
    if (!audio.value) {
        await fetchAudio()
    }
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