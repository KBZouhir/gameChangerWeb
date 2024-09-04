<template>
    <div class="w-full ">
        <div class="mx-auto w-full max-w-screen-xl px-2 py-8">
            <div class="my-4">
                <nav class="flex w-full" aria-label="Breadcrumb">
                    <ol role="list" class="flex space-x-4 rounded-md bg-white dark:bg-slate-800 px-6 shadow">
                        <li class="flex">
                            <div class="flex items-center">
                                <nuxt-link to="/">
                                    <div class="text-gray-400 hover:text-gray-500">
                                        <Icon name="tabler:home" size="16" color="white" />
                                        <span class="sr-only">{{ $t('Home') }}</span>
                                    </div>
                                </nuxt-link>
                            </div>
                        </li>
                        <li class="flex">
                            <div class="flex items-center">
                                <svg class="h-full w-6 flex-shrink-0 dark:text-slate-900 text-gray-200"
                                    viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor"
                                    aria-hidden="true">
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                                <nuxt-link to="/services">
                                    <div
                                        class="ml-4 text-sm font-medium dark:text-white text-gray-500 hover:text-gray-700">
                                        {{ $t('Services') }}
                                    </div>
                                </nuxt-link>

                            </div>
                        </li>
                        <li class="flex">
                            <div class="flex items-center">
                                <svg class="h-full w-6 flex-shrink-0 dark:text-slate-900 text-gray-200"
                                    viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor"
                                    aria-hidden="true">
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                                <div class="ml-4 text-sm font-medium dark:text-white text-gray-500 hover:text-gray-700"
                                    aria-current="page">
                                    {{ service?.title }}
                                </div>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div class="relative overflow-hidden rounded-lg  px-6 md:h-[550px] h-[450px] sm:py-32 lg:px-8">
                <USkeleton class="absolute inset-0 z-10 h-full w-full object-cover" />
                <img v-if="service?.image_url" draggable="false" :src="service?.image_url" alt=""
                    class="absolute inset-0 z-10 h-full w-full object-cover" />
            </div>

            <div class="py-6">
                <div class="grid md:grid-cols-3 grid-cols-1 gap-4">
                    <UCard class="col-span-2">
                        <div>
                            <h1 class="text-3xl dark:text-white font-semibold mb-4">{{ service?.title }}</h1>
                            <div>
                                {{ service?.description }}
                            </div>
                        </div>
                    </UCard>
                    <div class="col-span-1">
                        <UCard>
                            <div class="flex flex-col divide-y dark:divide-slate-800 space-y-4">
                                <div class="flex flex-col space-y-2 " v-if="user?.id == service?.user?.id">
                                    <b>Actions</b>
                                    <div class="flex items-center justify-between space-x-2">
                                        <nuxt-link :to="`/services/edit/${service?.id}`">
                                            <UButton icon="i-heroicons-pencil-square" variant="outline" size="lg"
                                                label="Edit" color="green" />
                                        </nuxt-link>
                                        <UButton icon="i-heroicons-trash" label="Delete" variant="link" size="lg"
                                            @click="isOpen = true" color="red" />
                                    </div>
                                </div>
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
                                        <span class="capitalize bg-emerald-500 px-4">estimate</span>
                                    </div>
                                </div>

                                <div v-if="(user.id != service?.user.id) && user?.role.id != 3" class="py-2">
                                    <nuxt-link :to="`/chat?service_id=${service?.id}&user_id=${service?.user?.id}`">
                                        <UButton block label="Send Message"
                                            class="dark:bg-emerald-600 disabled:bg-emerald-600 dark:hover:bg-green-400"
                                            color="primary" size="lg" />
                                    </nuxt-link>
                                </div>

                            </div>
                        </UCard>
                    </div>
                </div>
            </div>
        </div>

        <UModal v-model="isOpen">
            <UCard class="w-full p-0 pt-0 relative z-50 overflow-hidden">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            {{ $t('Delete Service') }}
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 z-50"
                            @click="isOpen = false" />
                    </div>
                </template>
                <img src="~/assets/svg/vectors/pattern-rectangle.svg" draggable="false"
                    class="w-12 absolute top-0 right-0" alt="" srcset="">
                <div class="flex flex-col items-center justify-center ">
                    <img class="w-1/3 flex dark:hidden" src="~/assets/svg/vectors/danger.svg" alt="">
                    <img class="w-1/3 hidden dark:flex" src="~/assets/svg/vectors/danger-white.svg" alt="">
                    <h2 class="text-xl md:text-3xl font-bold text-center">
                        {{ $t('Are you sure you want to delete this service?') }}
                    </h2>
                </div>

                <div class="grid grid-cols-2 gap-6 my-6">
                    <UButton @click="deleteServiceFun" :loading="loadingData" label="Confirm"
                        class="flex items-center justify-center" size="lg" color="green" />
                    <UButton @click="isOpen = false" label="Cancel" class="flex items-center justify-center" size="lg"
                        color="red" />
                </div>

            </UCard>
        </UModal>
    </div>
</template>

<script setup>
import { getService, deleteService } from "~/composables/store/useService"

import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore();
const user = computed(() => authStore.getAuthUser)


const route = useRoute()
const service = ref()
const loadingData = ref(false)
const isOpen = ref(false)


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
}


const deleteServiceFun = async () => {
    loadingData.value = true
    const result = await deleteService(route.params.id)
    loadingData.value = false
    await navigateTo('/services')

}

watchEffect(() => {
    getDataFromApi()
});

</script>