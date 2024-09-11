<template>
    <div class="max-w-screen-xl w-full mx-auto py-4 p-2">

        <div class="flex justify-between mb-4">
            <span>

            </span>
            <nuxt-link v-if="user?.role.id == 3" :to="`/masterclass/create`">
                <UButton label="Create" color="green" size="md"></UButton>
            </nuxt-link>
        </div>



        <div
            class="h-[400px] ring-1 dark:shadow-lg relative ring-gray-200 dark:ring-gray-800 shadow rounded-xl mb-8 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900    overflow-hidden">
            <img src="~/assets/svg/vectors/pattern-rectangle.svg" class="w-12 absolute top-0 right-0" alt=""
                srcset="" />
            <img src="~/assets/svg/vectors/pattern-rectangle.svg" class="w-12 absolute bottom-0 left-0 rotate-180"
                alt="" srcset="" />
            <div class="grid grid-cols-12 h-full">
                <div class="col-span-5 h-full p-8">
                    <img class="w-full h-full object-cover rounded-xl"
                        :src="(masterClassList?.data[0].image_url) ? masterClassList?.data[0].image_url : masterClassList?.data[0].video_thumbnail"
                        :alt="masterClassList?.data[0].title" srcset="">
                </div>
                <div class="col-span-7 flex flex-col p-8">
                    <div class="flex-1">
                        <h1 class="text-2xl font-bold mb-2">{{ masterClassList?.data[3].title }}</h1>
                        <p class="line-clamp-3">{{ masterClassList?.data[3].short_description }}</p>
                        <div class="grid grid-cols-4 gap-x-4 my-4">
                            <div class="flex items-center justify-center ring-1 relative ring-gray-200 dark:ring-gray-800 shadow rounded-xl p-2">
                                <Icon name="tabler:user" size="46"/>
                            </div>
                            <div class="flex items-center justify-center ring-1 relative ring-gray-200 dark:ring-gray-800 shadow rounded-xl p-2">

                            </div>
                            <div class="flex items-center justify-center ring-1 relative ring-gray-200 dark:ring-gray-800 shadow rounded-xl p-2">

                            </div>
                            <div class="flex items-center justify-center ring-1 relative ring-gray-200 dark:ring-gray-800 shadow rounded-xl p-2">

                            </div>
                        </div>
                    </div>
                    <UDivider />
                    <div class="relative flex items-center whitespace-nowrap overflow-hidden py-2">
                        <UBadge :label="domain.translated_name" :ui="{rounded: 'rounded-full'}" 
                        color="white" size="xs" class="px-3 mr-1 text-[10px] bg-opacity-75 dark:bg-opacity-75"
                            v-for="domain in masterClassList?.data[3].domains" />
                    </div>
                </div>
            </div>
        </div>

        <UCard class="">
            <h2 class="mb-2">Past masterclass</h2>
            <UCarousel ref="carouselRef" v-slot="{ item }" arrows :items="masterClassList?.data"
                :ui="{ item: 'snap-start', indicators: { active: 'bg-green-400' } }" :next-button="{ color: 'gray' }"
                :prev-button="{ color: 'gray' }">
                <div :key="item.id"
                    :style="`background-image: url(${(item.image_url) ? item.image_url : item.video_thumbnail});`"
                    class="w-[400px] mr-2 text-white bg-cover rounded-lg overflow-hidden">

                    <div class="p-8 w-full h-full flex flex-col space-y-4 bg-gradient-to-r from-primary to-transparent">
                        <div>
                            <div class="flex items-center space-x-2 text-xs">
                                <span>{{ $t('By') }}:</span>
                                <div class="flex items-center space-x-1">
                                    <div class="w-4 h-4 rounded-full border dark:border-gray-500">
                                        <img :src="item.user.image_url" alt="" srcset="">
                                    </div>
                                    <span>{{ item.user.full_name }}</span>
                                </div>
                            </div>

                        </div>
                        <div>
                            <h2 class="text-xl font-bold line-clamp-1 mb-1">{{ item.title }}</h2>
                            <div class="line-clamp-2 min-h-[40px]">
                                <p class="text-sm">{{ item.short_description }}</p>
                            </div>
                        </div>
                        <div>
                            <nuxt-link :to="`/masterclass/${item.id}`">
                                <UButton label="Discover" :ui="{ rounded: 'rounded-full' }" color="white"
                                    variant="solid" class="px-4 py-2">
                                    <template #trailing>
                                        <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                                    </template>
                                </UButton>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </UCarousel>
        </UCard>
        <!-- <div class="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4 my-4">
            <div v-for="(masterclass, index) in masterClassList?.data" :key="masterclass.id"
                :style="`background-image: url(${(masterclass.image_url) ? masterclass.image_url : masterclass.video_thumbnail});`"
                class="text-white bg-cover rounded-lg overflow-hidden">

                <div class="p-8 w-full h-full flex flex-col space-y-4 bg-gradient-to-r from-primary to-transparent">
                    <div>
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
            </div>
        </div> -->

        <div v-if="masterClassList.length == 0 && !masterClassList?.meta"
            class="w-full grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4 my-4">
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



definePageMeta({
    layout: "auth",
    title: "Notification Page",
    middleware: ['auth']
})

const getDataFromApi = async () => {
    await listMasterClass()
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