<template>
    <div>
        {{ ogData }}
    </div>
</template>

<script setup>

const ogData = ref(null);
const loading = ref(false);
const error = ref('');


const props = defineProps({
    url: { type: String, required: false },
})


const fetchOgData = async () => {
    if (!props.url) return;

    loading.value = true;
    error.value = '';
    ogData.value = null;

    try {
        const { data, error: fetchError } = await useFetch(`/api/getOgData`, {
            params: { url: props.url },
        });

        if (fetchError.value) {
            error.value = fetchError.value.message;
        } else {
            ogData.value = data.value?.ogData || null;
        }
    } catch (err) {
        error.value = 'An error occurred while fetching the data.';
    } finally {
        loading.value = false;
    }
}

onMounted( async () => {
    await fetchOgData()
})
</script>