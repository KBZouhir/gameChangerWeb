<template>
    <div class="audio-component">
        <audio v-if="audioUrl" controls>
            <source :src="audioUrl" type="audio/mpeg" />
        </audio>
        <p v-else>Loading audio...</p>
    </div>
</template>

<script setup>
import { getAudioByID } from '~/composables/store/useMedia'


const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const audioUrl = ref(null);

const fetchAudio = async () => {
    const result = await getAudioByID(props.id);
    if (result) {
        audioUrl.value = URL.createObjectURL(result)
    }
};

onMounted(() => {
    fetchAudio();
});

watch(() => props.id, fetchAudio);
</script>

<style scoped>
.audio-component {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>