<template>
    <div class="w-full mx-auto py-4 p-2">
        
        <div class="mx-auto max-w-7xl ">
        <div
          class="relative border dark:border-slate-800 isolate overflow-hidden bg-gradient-to-br dark:from-slate-800 dark:to-slate-800 px-6 pt-8 dark:shadow-2xl sm:rounded-xl sm:px-8 md:pt-16 lg:flex lg:gap-x-20 lg:px-16 lg:pt-0">
          <svg viewBox="0 0 1024 1024"
            class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true">
            <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stop-color="#0f1454" />
                <stop offset="1" stop-color="#34d399" />
              </radialGradient>
            </defs>
          </svg>
          <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 class="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">Conferences</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"> Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Si longus, levis
              dictata sunt. Quare attende, quaeso</p>

          </div>
          <div class="relative mt-16 h-80 lg:mt-8">
            <img class="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png" alt="App screenshot"
              width="1824" height="1080">
          </div>
        </div>
      </div>



        <div class="flex justify-between mb-4">
            <span>
                
            </span>
            <nuxt-link v-if="user?.role.id == 3" :to="`/conferences/create`">
                <UButton label="Create" class="dark:bg-emerald-600 disabled:bg-emerald-600 dark:hover:bg-white"
                    color="primary" size="md"></UButton>
            </nuxt-link>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4 my-4">
            <div v-for="(conference, index) in conferenceList?.data" :key="conference.id"
                :style="`background-image: url(${(conference.image_url) ? conference.image_url : conference.video_thumbnail});`"
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

        <div v-if="conferenceList.length == 0 && !conferenceList?.meta"
            class="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4 my-4">
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

            <template #complete>
                <div v-if="conferenceList?.data?.length > 0 && conferenceList?.meta?.total > 10" class="flex justify-center my-4">
                    <span>No more data found!</span>
                </div>
            </template>

        </InfiniteLoading>

        <div>
            <div v-if="loadingMasterClass" class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 my-4">
                <div v-for="i in 9" class="text-white bg-cover rounded-lg overflow-hidden border dark:border-slate-900">
                    <USkeleton class="h-64 w-full" />
                </div>
            </div>
        </div>

        <div v-if="conferenceList?.data?.length == 0 && !loadingConfirence"
            class="flex flex-1 flex-col items-center justify-center py-4">
            <img class="flex dark:hidden mx-auto" src="~/assets/svg/vectors/empty.svg" draggable="false" alt=""
                srcset="">
            <img class="hidden dark:flex mx-auto" src="~/assets/svg/vectors/empty-white.svg" draggable="false" alt=""
                srcset="">
            <h2 class="font-semibold text-2xl">{{ $t('No conference available') }}</h2>
        </div>

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

const loadingConfirence = ref(false)

definePageMeta({
    layout: "auth",
    title: "Notification Page",
    middleware: ['auth']
})

const getDataFromApi = async () => {
    loadingConfirence.value = true
    await listConference()
    loadingConfirence.value = false
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