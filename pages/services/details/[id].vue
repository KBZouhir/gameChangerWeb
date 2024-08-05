<template>
    <div class="bg-[#f1f5f9] dark:bg-[#0f172a]">
        <div class="mx-auto w-full max-w-screen-xl px-2 py-8">
            <div class="relative overflow-hidden rounded-lg  px-6 h-[450px] sm:py-32 lg:px-8">
                <USkeleton class="absolute inset-0 z-10 h-full w-full object-cover" />
                <img v-if="service?.image_url" draggable="false" :src="service?.image_url" alt=""
                    class="absolute inset-0 z-10 h-full w-full object-cover" />
            </div>

            <div class="py-6">
                <div class="grid grid-cols-3 gap-4">
                    <div class="col-span-2">
                        <h1 class="text-3xl text-white font-semibold mb-4">{{ service?.title }}</h1>
                        <div>
                            {{ service?.description  }}
                        </div>
                    </div>
                    <div class="col-span-1">
                        <UCard>
                            <div class="flex flex-col divide-y dark:divide-slate-800 space-y-4">
                                <div class="flex flex-col space-y-2 ">
                                    <b>Created at</b>
                                    {{ service?.created_at }}
                                </div>

                                <div class="flex flex-col space-y-2 py-2">
                                    <b>Service by</b>
                                    <div class="flex items-center space-x-4 mb-4">
                                        <nuxt-link :to="`/profile/${service?.user?.id}`">
                                            <UAvatar :src="service?.user?.image_url" :alt="service?.user.full_name"
                                                size="sm" />
                                        </nuxt-link>

                                        <div class="flex flex-col">
                                            <nuxt-link :to="`/profile/${service?.user?.id}`">
                                                <h4 class="font-bold mb-0">{{ service?.user.full_name }}</h4>
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-col space-y-2 py-2">
                                    <b>Price</b>
                                    <span v-if="service?.price > 0" class="text-2xl font-bold text-emerald-500">
                                        {{ service?.price }} <sup>$</sup>
                                    </span>

                                    <div v-else class="flex">
                                        <span  class="capitalize bg-emerald-500 px-4" >estimate</span>
                                    </div>
                                </div>

                                <div class="py-2">
                                    <UButton block label="Send Message" class="dark:bg-emerald-600 disabled:bg-emerald-600 dark:hover:bg-white" color="primary" size="lg" />
                                </div>

                            </div>
                        </UCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getService } from "~/composables/store/useService"


const route = useRoute()
const service = ref()
const loadingData = ref(false)

definePageMeta({
    layout: 'auth',
    title: 'Show Service',
    middleware: ['auth']
})


const getDataFromApi = async () => {
    loadingData.value = true
    const result = await getService(route.params.id)
    if (result?.error?.statusCode == 404) {

    } else {
        if (result?.data?.success) {
            service.value = result.data.service
        }
    }
    loadingData.value = false
};

watchEffect(() => {
    getDataFromApi()
});

</script>