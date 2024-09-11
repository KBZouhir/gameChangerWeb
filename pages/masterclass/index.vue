<template>
    <div class="max-w-screen-xl w-full mx-auto py-4 p-2">

        <div class="flex justify-between mb-4">
            <span>

            </span>
            <nuxt-link v-if="user?.role.id == 3" :to="`/masterclass/create`">
                <UButton label="Create" color="green" size="md"></UButton>
            </nuxt-link>
        </div>

        <div v-if="masterClassUpcoming?.length > 0" class="border-b dark:border-gray-800 border-gray-200 pb-5 mb-4">
            <h2 class="text-2xl font-bold leading-6">{{ $t('Upcoming Masterclass') }}</h2>
        </div>

        <div v-if="loadingUpcoming"
            class="h-[400px] ring-1 ring-gray-200 dark:ring-gray-800 shadow w-full grid grid-cols-12 p-4 gap-4 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-xl">
            <USkeleton class="relative col-span-12 md:col-span-5 h-full"></USkeleton>
            <USkeleton class="col-span-12 md:col-span-7 flex flex-col p-8"></USkeleton>
        </div>

        <div v-for="(masterclass, index) in masterClassUpcoming" :key="masterclass.id"
            class="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4 mb-8">
            <template v-if="index == 0">
                <nuxt-link class="col-span-2" :to="`/masterclass/${masterclass.id}`">
                    <div
                        class="md:h-[400px] ring-1 dark:hover:shadow-lg relative ring-gray-200 dark:ring-gray-800 shadow rounded-xl mb-4 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
                        <img src="~/assets/svg/vectors/pattern-rectangle.svg" class="w-12 absolute top-0 right-0" alt=""
                            srcset="" />
                        <img src="~/assets/svg/vectors/pattern-rectangle.svg"
                            class="w-12 absolute bottom-0 left-0 rotate-180 z-50" alt="" srcset="" />
                        <div class="flex flex-col md:flex-row h-full">
                            <div class="relative w-full max-h-[400px] overflow-hidden md:w-5/12 h-full">
                                <img class="w-full h-full object-cover rounded-l-xl"
                                    :src="(masterclass.image_url) ? masterclass.image_url : masterclass.video_thumbnail"
                                    :alt="masterclass.title" srcset="">
                                <div class="absolute top-3 left-3 flex justify-end">
                                    <UBadge color="primary" size="md"
                                        class="px-4 z-20 bg-opacity-75 dark:bg-opacity-75 border border-white"
                                        :ui="{ rounded: 'rounded-full', }">
                                        <span v-if="masterclass.price" class="capitalize text-white">{{
                                            masterclass.price }}
                                            €</span>
                                    </UBadge>
                                </div>
                            </div>
                            <div class="w-full md:w-7/12 flex flex-col p-8">
                                <div class="flex-1">
                                    <div class="flex justify-between items-center mb-4">
                                        <div class="flex items-center space-x-2 text-xs">
                                            <span>{{ $t('By') }}:</span>
                                            <div class="flex items-center space-x-1">
                                                <div class="w-4 h-4 rounded-full border dark:border-gray-500">
                                                    <img :src="masterclass.user.image_url" alt="" srcset="">
                                                </div>
                                                <span>{{ masterclass.user.full_name }}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <UBadge color="green">{{ masterclass.places_left }} {{ $t('Places left') }}
                                            </UBadge>
                                        </div>
                                    </div>

                                    <h1 class="text-2xl font-bold mb-4">{{ masterclass.title }}</h1>
                                    <p class="line-clamp-4">{{ masterclass.short_description }}</p>

                                    <div class="my-4 flex justify-end">

                                    </div>
                                </div>
                                <UDivider />
                                <div class="relative flex items-center whitespace-nowrap overflow-hidden py-2">
                                    <UBadge :label="domain.translated_name" :ui="{ rounded: 'rounded-full' }"
                                        color="white" size="xs"
                                        class="px-3 mr-1 text-[10px] bg-opacity-75 dark:bg-opacity-75"
                                        v-for="domain in masterclass.domains" />
                                </div>
                            </div>
                        </div>
                    </div>
                </nuxt-link>
            </template>

            <template v-else>
                <div class="text-white bg-cover rounded-t-lg overflow-hidden">
                    <div class="h-[250px] relative">
                        <nuxt-link :to="`/masterclass/${masterclass.id}`">
                            <img class="w-full h-full object-cover"
                                :src="(masterclass.image_url) ? masterclass.image_url : masterclass.video_thumbnail"
                                alt="" srcset="">
                            <div class="absolute top-3 right-3 flex justify-end">
                                <UBadge color="primary" size="md"
                                    class="px-4 z-20 bg-opacity-75 dark:bg-opacity-75 border border-white"
                                    :ui="{ rounded: 'rounded-full', }">
                                    <span v-if="masterclass.price" class="capitalize text-white">{{ masterclass.price }}
                                        €</span>
                                </UBadge>
                            </div>
                        </nuxt-link>

                        <div class="absolute bottom-0 w-full h-36 bg-gradient-to-t from-black to-transparent"></div>

                        <div class="absolute bottom-4 p-4">
                            <div class="mb-2">
                                <div class="flex items-center space-x-2 text-xs">
                                    <span>{{ $t('By') }}:</span>
                                    <div class="flex items-center space-x-1">
                                        <div class="w-4 h-4 rounded-full border dark:border-gray-500">
                                            <img :src="masterclass.user.image_url" alt="" srcset="">
                                        </div>
                                        <span>{{ masterclass.user.full_name }}</span>
                                    </div>
                                </div>
                            </div>
                            <nuxt-link :to="`/masterclass/${masterclass.id}`">
                                <h2 class="line-clamp-1 text-xl font-bold">{{ masterclass.title }}</h2>
                            </nuxt-link>

                        </div>
                    </div>
                    <div
                        class="p-4 border dark:border-gray-800 rounded-b-lg bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900">
                        <div class="flex items-center space-x-4 divide-x-[1px] divide-slate-700">
                            <div
                                class="w-16 h-16 bg-green-400 text-black rounded-md flex flex-col justify-center items-center">
                                <p class="text-2xl font-semibold ">{{ $dayjs(masterclass?.date).format('DD') }}</p>
                                <p class="text-md font-semibold ">{{ $dayjs(masterclass?.date).format('MMM') }}</p>
                            </div>

                            <div class="flex-1 pl-4">
                                <nuxt-link :to="`/masterclass/${masterclass.id}`">
                                    <p class="line-clamp-3 text-sm min-h-[60px]">
                                        {{ masterclass.short_description }}
                                    </p>
                                </nuxt-link>

                            </div>
                        </div>

                    </div>
                </div>
            </template>
        </div>


        <div class="border-b dark:border-gray-800 border-gray-200 pb-5">
            <h2 class="text-2xl font-bold leading-6">{{ $t('Past Masterclass') }}</h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4 my-4">
            <template v-for="(masterclass, index) in masterClassList?.data" :key="masterclass.id">
                <div v-if="masterClassComming(masterclass) == false"
                    class="text-white bg-cover rounded-t-lg overflow-hidden">

                    <div class="h-[250px] relative">
                        <nuxt-link :to="`/masterclass/${masterclass.id}`">
                            <img class="w-full h-full object-cover"
                                :src="(masterclass.image_url) ? masterclass.image_url : masterclass.video_thumbnail"
                                alt="" srcset="">
                            <div class="absolute top-3 right-3 flex justify-end">
                                <UBadge color="primary" size="md"
                                    class="px-4 z-20 bg-opacity-75 dark:bg-opacity-75 border border-white"
                                    :ui="{ rounded: 'rounded-full', }">
                                    <span v-if="masterclass.price" class="capitalize text-white">{{ masterclass.price }}
                                        €</span>
                                </UBadge>
                            </div>
                        </nuxt-link>

                        <div class="absolute bottom-0 w-full h-36 bg-gradient-to-t from-black to-transparent"></div>

                        <div class="absolute bottom-4 p-4">
                            <div class="mb-2">
                                <div class="flex items-center space-x-2 text-xs">
                                    <span>{{ $t('By') }}:</span>
                                    <div class="flex items-center space-x-1">
                                        <div class="w-4 h-4 rounded-full border dark:border-gray-500">
                                            <img :src="masterclass.user.image_url" alt="" srcset="">
                                        </div>
                                        <span>{{ masterclass.user.full_name }}</span>
                                    </div>
                                </div>
                            </div>
                            <nuxt-link :to="`/masterclass/${masterclass.id}`">
                                <h2 class="line-clamp-1 text-xl font-bold">{{ masterclass.title }}</h2>
                            </nuxt-link>

                        </div>
                    </div>
                    <div
                        class="p-4 border dark:border-gray-800 rounded-b-lg bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900">
                        <div class="flex items-center space-x-4 divide-x-[1px] divide-slate-700">
                            <div
                                class="w-16 h-16 bg-green-400 text-black rounded-md flex flex-col justify-center items-center">
                                <p class="text-2xl font-semibold ">{{ $dayjs(masterclass?.date).format('DD') }}</p>
                                <p class="text-md font-semibold ">{{ $dayjs(masterclass?.date).format('MMM') }}</p>
                            </div>

                            <div class="flex-1 pl-4">
                                <nuxt-link :to="`/masterclass/${masterclass.id}`">
                                    <p class="line-clamp-3 text-sm min-h-[60px]">
                                        {{ masterclass.short_description }}
                                    </p>
                                </nuxt-link>

                            </div>
                        </div>
                    </div>
                </div>
            </template>

        </div>

        <div v-if="masterClassList.length == 0 && !masterClassList?.meta"
            class="w-full grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4 my-4">
            <div v-for="i in 9" class="text-white bg-cover rounded-lg overflow-hidden border dark:border-slate-900">
                <USkeleton class="h-64 w-full" />
            </div>
        </div>

        <div v-if="masterClassList?.data?.length == 0 && !loadingConfirence"
            class="flex flex-1 flex-col items-center justify-center py-4">
            <img class="flex dark:hidden mx-auto" src="~/assets/svg/vectors/empty.svg" draggable="false" alt=""
                srcset="">
            <img class="hidden dark:flex mx-auto" src="~/assets/svg/vectors/empty-white.svg" draggable="false" alt=""
                srcset="">
            <h2 class="font-semibold text-2xl">{{ $t('No masterclass available') }}</h2>
        </div>

        <InfiniteLoading @infinite="fetchMoreMasterClass">
            <template #spinner>
                <div class="flex justify-center w-full">
                    <LoadingIcon />
                </div>
            </template>
            <template v-if="masterClassList?.data?.length > 0" #complete>
                <div class="flex justify-center my-4">
                    <span>No more data found!</span>
                </div>
            </template>
        </InfiniteLoading>
    </div>
</template>


<script setup>

import { listMasterClass } from '~/composables/store/useMasterClass'
import { useMasterClassStore } from '~/stores/masterclass'
import { useAuthStore } from '~/stores/authStore'
import { getPaginationsComments } from '~/composables/store/usePost'
import InfiniteLoading from "v3-infinite-loading"
import "v3-infinite-loading/lib/style.css"

const authStore = useAuthStore();
const user = computed(() => authStore.getAuthUser)


const store = useMasterClassStore()
const masterClassList = computed(() => store.getMasterClassList)
const masterClassUpcoming = ref()
const loadingMasterClass = ref()
const loadingUpcoming = ref(false)


definePageMeta({
    layout: "auth",
    title: "Notification Page",
    middleware: ['auth']
})

const getDataFromApi = async () => {
    loadingMasterClass.value = true
    await listMasterClass()
    loadingMasterClass.value = false
    masterClassUpcoming.value = await masterClassList.value.data.filter((masterClass) => {
        const dayjs = useDayjs()
        const now = dayjs();
        const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const masterClassDate = dayjs.utc(masterClass.date).tz(localTimezone)
        return masterClassDate.isAfter(now)
    })
}


const masterClassComming = (masterClass) => {

    const dayjs = useDayjs()
    const now = dayjs();
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const masterClassDate = dayjs.utc(masterClass?.date).tz(localTimezone)
    return masterClassDate.isAfter(now)

}

const fetchMoreMasterClass = async $state => {
    console.log("fetch more data");

    if (masterClassList.value?.links?.next == null) { $state.complete(); return }
    try {
        const result = await getPaginationsComments(masterClassList.value.links.next)
        masterClassList.value.data.push(...result.data)
        masterClassList.value.links = result.links
        if (result.data.length < 10) $state.complete()

    } catch (error) {
        $state.error()
    }
}

watchEffect(() => {
    getDataFromApi();
})


</script>