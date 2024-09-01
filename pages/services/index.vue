<template>
    <div class="bg-[#f1f5f9] dark:bg-[#0f172a]">
        <div class="mx-auto w-full max-w-screen-xl px-2 py-8">
            <div class="flex justify-between mb-4">
                <span>
                    Total services: <span class="font-bold">{{ services?.meta?.total }}</span>
                </span>
                <nuxt-link v-if="user?.role.id != 3" :to="`/services/create`">
                    <UButton label="Create" class="dark:bg-emerald-600 disabled:bg-emerald-600 dark:hover:bg-white"
                        color="primary" size="md"></UButton>
                </nuxt-link>
            </div>
            <div class="grid md:grid-cols-3 grid-cols-1 gap-4">
                <UCard :ui="{ body: 'p-0' }" class="overflow-hidden" v-for="(service, index) in services?.data">
                    <div :class="`relative h-64 rounded-tr-lg rounded-tl-lg bg-cover`"
                        :style="`background-image:url('${service.image_url}')`">

                    </div>

                    <div class="flex justify-end -mt-2 ">
                        <UBadge color="green" size="xs" class="px-4 z-20" :ui="{ rounded: 'rounded-none' }">
                            <span v-if="service.price" class="capitalize">{{ service.price }} $</span>
                            <span class="capitalize" v-else>estimate</span>
                        </UBadge>
                    </div>
                    <div class="p-4">
                        <div class="flex items-center space-x-4 mb-4">
                            <nuxt-link :to="`/profile/${service?.user.id}`">
                                <UAvatar :src="service.user.image_url" :alt="service.user.full_name" size="sm" />
                            </nuxt-link>

                            <div class="flex flex-col">
                                <nuxt-link :to="`/profile/${service?.user.id}`">
                                    <h4 class="font-bold mb-0">{{ service.user.full_name }}</h4>
                                </nuxt-link>
                                <span class="text-xs text-slate-400 -mt-[0.5px]">{{
                                    $dayjs(service.created_at).format("DD/MM/YYYY h:MM A")
                                    }}</span>
                            </div>
                        </div>

                        <div class="min-h-32">
                            <nuxt-link :to="`/services/details/${service?.id}`">
                                <h3 class="text-lg font-semibold truncate mb-2">{{ service?.title }} </h3>
                            </nuxt-link>

                            <div class="text-xs text-slate-600 dark:text-gray-400 line-clamp-4">
                                {{ service?.description }}
                            </div>
                        </div>

                    </div>
                    <template #footer>
                        <div class="flex flex-wrap items-center">
                            <UBadge :label="domain.translated_name" color="white" size="xs"
                                class="px-3 m-1 text-[10px]s" v-for="domain in service.domains" />
                        </div>
                    </template>
                </UCard>

            </div>

            <div v-if="services.length == 0" class="grid md:grid-cols-3 grid-cols-1 gap-4 ">
                <UCard :ui="{ body: 'p-0' }" class="overflow-hidden" v-for="i in 9">
                    <USkeleton class="h-64 w-full" />

                    
                    <div class="p-4">
                        <div class="flex items-center space-x-4">
                            <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
                            <div class="space-y-2">
                                <USkeleton class="h-4 w-[250px]" />
                                <USkeleton class="h-4 w-[200px]" />
                            </div>
                        </div>

                        <div class="min-h-32">
                            <h3 class="text-lg font-semibold truncate mt-2 mb-6">
                                
                            </h3>
                            <div class="flex flex-col space-y-4">
                                <USkeleton class="h-4 w-full" />
                                <USkeleton class="h-4 w-full" />
                                <USkeleton class="h-4 w-full" />
                                <USkeleton class="h-4 w-[200px]" />
                            </div>
                        </div>

                    </div>
                    <template #footer>
                        <div class="flex flex-wrap space-x-3 items-center">
                            <USkeleton class="h-6 w-[70px]" v-for="i in 4" />
                        </div>
                    </template>
                </UCard>
            </div>

            <InfiniteLoading v-if="services" @infinite="fetchMoreServices">
                <template #spinner>
                    <div class="flex justify-center w-full">
                        <LoadingIcon />
                    </div>
                </template>
                <template v-if="services?.data?.length > 0" #complete>
                    <div class="flex justify-center my-4">
                        <span>No more data found!</span>
                    </div>
                </template>
            </InfiniteLoading>
        </div>
    </div>
</template>

<script setup>
import { useServicesStore } from "~/stores/services"
import { getServices } from "~/composables/store/useService"
import { getPaginationsComments } from '~/composables/store/usePost'
import { useAuthStore } from '~/stores/authStore'
import InfiniteLoading from "v3-infinite-loading"
import "v3-infinite-loading/lib/style.css"

definePageMeta({
    layout: 'auth',
    title: 'Service',
    middleware: ['auth']
})

const authStore = useAuthStore();
const servicesStore = useServicesStore();

const services = computed(() => servicesStore.getServices);
const user = computed(() => authStore.getAuthUser);

const fetchMoreServices = async $state => {

    try {
        const result = await getPaginationsComments(services.value.links.next)
        services.value.data.push(...result.data)
        services.value.links = result.links
        if (result.data.length < 10) $state.complete()

    } catch (error) {
        $state.error()
    }
}


const getDataFromApi = async () => {
    await getServices()
};

watchEffect(() => {
    getDataFromApi();
});


</script>