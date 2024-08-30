<template>
    <div v-if="ogData" class="flex space-x-4 border rounded-md overflow-hidden bg-white dark:border-gray-900 dark:bg-slate-800 mt-4">
        <div class="w-40 h-40 ">
            <img :src="ogData['og:image']" class="w-full h-full object-cover" alt="" srcset="">
        </div>
        <div class="flex flex-col p-2">
            <div class="flex flex-1 flex-col">
                <h2 class="font-bold text-lg line-clamp-2 mb-2">{{ ogData['og:title'] }}</h2>
                <p class="line-clamp-4 text-xs text-gray-400">
                    {{ ogData['og:description'] }}
                </p>
            </div>
            <nuxt-link target="_blank" class="text-sm text-gray-400" :to="ogData['og:url']">{{ ogData['og:url'] }}</nuxt-link>
        </div>
    </div>
    <div class="flex space-x-4 border rounded-md overflow-hidden bg-white dark:border-gray-900 dark:bg-[#0f172a] " v-else>
        <div class="w-40 h-40 ">
            <USkeleton class="w-full h-full" />
        </div>
        <div class="flex flex-col p-2 py-4">
            <div class="flex flex-1 flex-col space-y-2">
                <USkeleton class="w-48 h-4 mb-2" />
                
                <div class="flex flex-col space-y-2">
                    <USkeleton class="w-full h-2" />
                    <USkeleton class="w-full h-2" />
                    <USkeleton class="w-1/3 h-2" />
                </div>
            </div>
            <USkeleton class="w-full h-2" />
        </div>
    </div>
</template>

<script setup>

const ogData = ref(null);
const loading = ref(false);
const error = ref('');


const props = defineProps({
    url: { type: String },
})

console.log(props.url);


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

onMounted(async () => {
    await fetchOgData()
})
</script>
