<script setup>
import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore();
const user = computed(() => authStore.getAuthUser);

import fallbackImage from '~/assets/img/profile-cover.webp'


definePageMeta({
    layout: "auth",
    title: "Login Page",
    middleware: ['auth']
});

const currentStep = ref(0)



</script>

<template>
    <div class="bg-[#F1F5F9]">
        <div class="mx-auto w-full max-w-screen-xl py-4">
            <div class="flex flex-col">
                <div class="rounded-tr-md rounded-tl-md h-96 w-full overflow-hidden relative">
                    <div class="h-full w-full ">
                        <img :src="user.cover_image_urls || fallbackImage"
                            class="w-full h-full object-cover" draggable="false" alt="">
                    </div>
                    <div
                        class="flex space-x-3 absolute  bottom-4 right-4 rounded-full hover:bg-primary text-xs cursor-pointer transition-all duration-150 hover:shadow-md px-4 py-2 backdrop-blur-md bg-white/30">
                        <img src="~/assets/svg/icons/image-edit.svg" alt="" srcset="">
                        <span class="text-white hidden md:block">Modifier la Couverture</span>
                    </div>
                </div>

                <div class="pb-4 w-full shadow-sm bg-white">
                    <div
                        class="flex md:flex-row flex-col items-center md:items-start space-x-4 space-y-2 w-3/4 mx-auto ">
                        <div
                            class="w-32 h-32 bg-white shadow-sm p-1 rounded-2xl relative -mt-12 md:mx-0 mx-auto md:block">
                            <img :src="user.image_url"
                                class="w-full h-full object-cover rounded-2xl" alt="">
                            <UButton :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-pencil-square" size="xs"
                                class="absolute bottom-0 right-0 backdrop-blur-md bg-white/30 hover:bg-primary" square
                                variant="solid">
                                <template #leading>
                                    <img src="~/assets/svg/icons/image-edit.svg" alt="" srcset="">
                                </template>
                            </UButton>
                        </div>
                        <div class="pb-4 pt-2 md:w-2/4 w-full max-h-32 overflow-hidden text-center md:text-start">
                            <h1 class="font-bold text-xl">{{ user.full_name }}</h1>
                            <p class="text-xs cut-text relative">
                                {{ user.bio }}
                            </p>
                        </div>

                        <div class="space-x-4 items-center flex md:hidden my-4">
                            <UButton icon="i-heroicons-plus" size="sm" class="py-2 px-4" color="primary" variant="solid"
                                label="Create" :trailing="false" />
                            <UButton icon="i-heroicons-pencil-square" class="hover:bg-primary/5 py-2 px-4" size="sm"
                                color="primary" variant="outline" label="Update profile" :trailing="false" />
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex flex-col md:flex-row items-start space-y-4 md:space-x-4 md:space-y-0 my-4">
                <div class="top-0 md:top-4 bg-white sticky md:w-3/12 w-full p-2 rounded-md shadow-sm z-50">
                    <div class="px-3 py-4 overflow-y-auto">
                        <ul class=" font-medium text-sm flex flex-row md:flex-col items-center">
                            <li class="w-full">
                                <button @click="currentStep = 0"
                                    :class="currentStep == 0 ? 'text-gray-900' : 'text-[#666666]'"
                                    class="flex w-full items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    General
                                </button>
                            </li>
                            <li class="w-full">
                                <button @click="currentStep = 1"
                                    :class="currentStep == 1 ? 'text-gray-900' : 'text-[#666666]'"
                                    class="flex w-full items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    Password
                                </button>
                            </li>
                            <li class="w-full">
                                <button @click="currentStep = 2"
                                    :class="currentStep == 2 ? 'text-gray-900' : 'text-[#666666]'"
                                    class="flex w-full items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    Interests
                                </button>
                            </li>
                            <li class="w-full">
                                <button @click="currentStep = 3"
                                    :class="currentStep == 3 ? 'text-gray-900' : 'text-[#666666]'"
                                    class="flex w-full items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    Domains
                                </button>
                            </li>
                            <li class="w-full">
                                <button @click="currentStep = 4"
                                    :class="currentStep == 4 ? 'text-gray-900' : 'text-[#666666]'"
                                    class="flex w-full items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    Address
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>

                <div class="bg-white md:w-9/12 w-full p-4 rounded-md shadow-sm">
                    <div v-if="currentStep == 0" class="py-4">
                        <h1 class="text-xl font-bold mb-2">Update your Informations</h1>
                        <p class="text-xs text-[#989394]">
                            Select a few of your interest to match with users who have similar things in common.
                        </p>
                        <profileGeneral />
                    </div>

                    <div v-if="currentStep == 1" class="py-4">
                        <h1 class="text-xl font-bold mb-2">Update your password</h1>
                        <p class="text-xs text-[#989394]">
                            Select a few of your interest to match with users who have similar things in common.
                        </p>
                        <profilePassword />
                    </div>

                    <div v-if="currentStep == 2" class="py-4">
                        <h1 class="text-xl font-bold mb-2">Update your Interest</h1>
                        <p class="text-xs text-[#989394]">
                            Select a few of your interest to match with users who have similar things in common.
                        </p>
                        <profileInterests />
                    </div>

                    <div v-if="currentStep == 3" class="py-4">
                        <h1 class="text-xl font-bold mb-2">Update your Interest</h1>
                        <p class="text-xs text-[#989394]">
                            Select a few of your interest to match with users who have similar things in common.
                        </p>
                        <profileDomains />
                    </div>

                    <div v-if="currentStep == 4" class="py-4">
                        <h1 class="text-xl font-bold mb-2">Update your address</h1>
                        <p class="text-xs text-[#989394] mb-4">
                            Select a few of your interest to match with users who have similar things in common.
                        </p>
                        <Map />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* .cut-text::before{
    content: '';
    width: 100%;
    position: absolute;
    background: linear-gradient(0deg, white, transparent);
    height: 50px;
    bottom: 0;
} */
</style>