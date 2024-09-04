<template>
    <div class="w-full mx-auto py-4 p-2">

        <div class="flex justify-between mb-4">
            <span>
                {{ $t('Total conferences') }}: <span class="font-bold">{{ conferenceList?.meta?.total }}</span>
            </span>
            <nuxt-link v-if="user?.role.id == 3" :to="`/conferences/create`">
                <UButton label="Create" class="dark:bg-emerald-600 disabled:bg-emerald-600 dark:hover:bg-white"
                    color="primary" size="md"></UButton>
            </nuxt-link>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 my-4">
            <div v-for="(conference, index) in conferenceList?.data"
                :key="conference.id" :style="`background-image: url(${(conference.image_url) ? conference.image_url : conference.video_thumbnail});`"
                class="text-white bg-cover rounded-lg overflow-hidden">
                <div class="p-8 w-full h-full flex flex-col space-y-4 bg-gradient-to-r from-primary to-transparent">
                    <div>
                        <div class="flex items-center space-x-2 text-xs">
                            <span>{{ $t('By') }}:</span>
                            <div class="flex items-center space-x-1">
                                <div class="w-4 h-4 rounded-full border dark:border-gray-500">
                                    <img :src="conference.user.image_url" alt="" srcset="">
                                </div>
                                <span>{{ conference.user.full_name }}</span>
                            </div>
                        </div>

                    </div>
                    <div>
                        <h2 class="text-xl font-bold line-clamp-1 mb-1">{{ conference.title }}</h2>
                        <div class="line-clamp-2 min-h-[40px]">
                            <p class="text-sm">{{ conference.short_description }}</p>
                        </div>
                    </div>
                    <div>
                        <nuxt-link :to="`/conferences/${conference.id}`">
                            <UButton label="Discover" :ui="{ rounded: 'rounded-full' }" color="white" variant="solid"
                                class="px-4 py-2">
                                <template #trailing>
                                    <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                                </template>
                            </UButton>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="conferenceList.length == 0 && !conferenceList?.meta" class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 my-4">
            <div v-for="i in 9" class="text-white bg-cover rounded-lg overflow-hidden border dark:border-slate-900">
                <USkeleton class="h-64 w-full" />
            </div>
        </div>

        <InfiniteLoading @infinite="fetchMoreMasterClass">
            <template #spinner>
                <div class="flex justify-center w-full">
                    <LoadingIcon />
                </div>
            </template>
            <template v-if="conferenceList?.data?.length > 0" #complete>
                <div class="flex justify-center my-4">
                    <span>No more data found!</span>
                </div>
            </template>
        </InfiniteLoading>
    </div>
</template>


<script setup>

import { listConference } from '~/composables/store/useConference'
import { useConferenceStore } from '~/stores/conference'
import { useAuthStore } from '~/stores/authStore'
import { getPaginationsComments } from '~/composables/store/usePost'
import InfiniteLoading from "v3-infinite-loading"
import "v3-infinite-loading/lib/style.css"

const authStore = useAuthStore();
const user = computed(() => authStore.getAuthUser)


const store = useConferenceStore()
const conferenceList = computed(() => store.getConferenceList)



definePageMeta({
    layout: "auth",
    title: "Notification Page",
    middleware: ['auth']
})

const getDataFromApi = async () => {
    await listConference()
}


const fetchMoreMasterClass = async $state => {
    console.log("fetch more data");

    if (conferenceList.value?.links?.next == null) { $state.complete(); return }
    try {
        const result = await getPaginationsComments(conferenceList.value.links.next)
        conferenceList.value.data.push(...result.data)
        conferenceList.value.links = result.links
        if (result.data.length < 10) $state.complete()

    } catch (error) {
        $state.error()
    }
}

watchEffect(() => {
    getDataFromApi();
})


</script>