<template>
    <div class="max-w-screen-xl mx-auto py-4 p-2">

        <div class="flex justify-between mb-4">
            <span>
                Total services: <span class="font-bold">{{ masterClassList?.meta?.total }}</span>
            </span>
            <nuxt-link :to="`/masterclass/create`">
                <UButton label="Create" class="dark:bg-emerald-600 disabled:bg-emerald-600 dark:hover:bg-white"
                    color="primary" size="md"></UButton>
            </nuxt-link>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 my-4">
            <nuxt-link :to="`/masterclass/${masterclass.id}`" v-for="(masterclass, index) in masterClassList?.data" :key="masterclass.id"
                :style="`background-image: url(${masterclass.image_url});`"
                class="text-white bg-cover rounded-lg overflow-hidden">

                <div class="p-8 w-full h-full flex flex-col space-y-4 bg-gradient-to-r from-primary to-transparent">
                    <div>
                        <div class="flex items-center space-x-2 text-xs">
                            <span>By:</span>
                            <div class="flex items-center space-x-1">
                                <div class="w-4 h-4 rounded-full border dark:border-gray-500">
                                    <img :src="masterclass.user.image_url" alt="" srcset="">
                                </div>
                                <span>{{ masterclass.user.full_name }}</span>
                            </div>
                        </div>

                    </div>
                    <div>
                        <h2 class="text-xl font-bold line-clamp-1 mb-1">{{ masterclass.title }}</h2>
                        <div class="line-clamp-2 min-h-[40px]">
                            <p class="text-sm">{{ masterclass.short_description }}</p>
                        </div>
                    </div>
                    <div>
                        <nuxt-link :to="`/masterclass/${masterclass.id}`">
                            <UButton label="Discover" :ui="{ rounded: 'rounded-full' }" color="white" variant="solid"
                                class="px-4 py-2">
                                <template #trailing>
                                    <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                                </template>
                            </UButton>
                        </nuxt-link>
                    </div>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>


<script setup>

import { listMasterClass } from '~/composables/store/useMasterClass'
import { useMasterClassStore } from '~/stores/masterclass'


const store = useMasterClassStore()


const masterClassList = computed(() => store.getMasterClassList)


console.log(masterClassList.value);


definePageMeta({
    layout: "auth",
    title: "Notification Page",
    middleware: ['auth']
})


const convertTo12HourFormat = (dateTime, format) => {
    const dayjs = useDayjs()
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return dayjs.utc(dateTime).tz(localTimezone).format(format)
}

const getDataFromApi = async () => {
    await listMasterClass()
};

watchEffect(() => {
    getDataFromApi();
});


</script>