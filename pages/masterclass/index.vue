<template>
    <div class="max-w-screen-xl w-full mx-auto py-4 p-2">

        <div class="flex justify-between mb-4">
            <span>
                {{ $t('Total masterclass') }}: <span class="font-bold">{{ masterClassList?.meta?.total }}</span>
            </span>
            <nuxt-link v-if="user?.role.id == 3" :to="`/masterclass/create`">
                <UButton label="Create" color="green" size="md"></UButton>
            </nuxt-link>
        </div>

        <div class="mx-auto mb-4">
            <div class="relative isolate overflow-hidden border dark:border-gray-800 bg-gray-900 px-6 py-12 sm:rounded-xl sm:px-8 sm:py-12 lg:py-12 xl:px-12">
                <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0">
                    <div class="lg:row-start-2 lg:max-w-md">
                        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            {{ masterClassList?.data[0].title }}
                        </h2>
                        <p class="mt-6 text-lg leading-8 text-gray-300">
                            {{ masterClassList?.data[0].short_description }}
                        </p>
                    </div>


                    <img :src="masterClassList?.data[0].image_url"
                        alt="Product screenshot"
                        class="relative -z-20 min-w-full max-w-xl rounded-xl shadow-xl ring-1 ring-white/10 lg:row-span-4 lg:w-[64rem] lg:max-w-none"
                        width="2432" height="1442">

                    <div class="max-w-xl lg:row-start-3 lg:mt-10 lg:max-w-md lg:border-t lg:border-white/10 lg:pt-10">
                        
                    </div>
                </div>
                <div class="pointer-events-none absolute left-12 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:bottom-[-12rem] lg:top-auto lg:translate-y-0 lg:transform-gpu"
                    aria-hidden="true">
                    <div class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-25"
                        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
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

onMounted(() => {
    setInterval(() => {
        if (!carouselRef.value) return

        if (carouselRef.value.page === carouselRef.value.pages) {
            return carouselRef.value.select(0)
        }

        carouselRef.value.next()
    }, 3000)
})

watchEffect(() => {
    getDataFromApi();
})


</script>