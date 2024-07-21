<template>
    <div class="overflow-hidden h-full grid grid-cols-5 bg-[#F1F5F9]">
        <div class="bg-white border-r border-t p-4 flex flex-col">
            <UInput size="lg" placeholder="Search..." color="gray">
                <template #leading>
                    <UButton icon="i-heroicons-arrow-left" @click="goback" color="primary" class="p-0" square
                        variant="link" />
                </template>

                <template #trailing>
                    <UIcon name="i-heroicons-magnifying-glass" />
                </template>
            </UInput>
            <div class="is-scrollbar-hidden mt-3 flex flex-1 grow flex-col overflow-y-auto divide-y-[1px]">
                <div v-for="i in 4" :class="i % 2 == 0 ? 'bg-green-100' : ''"
                    class="flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600">
                    <div class="avatar h-10 w-10 relative">
                        <img class="rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="avatar">
                        <div
                            class="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-slate-300 dark:border-navy-700">
                        </div>
                    </div>
                    <div class="flex flex-1 flex-col">
                        <div class="flex items-baseline justify-between space-x-1.5">
                            <p class="line-clamp-1 text-xs+ font-medium text-slate-700 dark:text-navy-100">
                                Alfredo Elliott
                            </p>
                            <span class="text-sm text-slate-400 dark:text-navy-300">11:03</span>
                        </div>
                        <div class="mt-1 flex items-center justify-between space-x-1">
                            <p class="line-clamp-1 text-sm text-slate-400 dark:text-navy-300">
                                Lorem ipsum dolor
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col col-span-3">
            <div class="h-16 flex justify-between items-center border-y bg-white">
                <div class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                    <span class="relative inline-block">
                        <img class="h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="">
                        <span
                            class="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white"></span>
                    </span>
                    <div class="flex flex-col">
                        <span>{{ user?.full_name }}</span>
                        <span class="text-xs text-gray-400 font-light -mt-1">Active now</span>
                    </div>
                </div>
                <ul class="flex space-x-4 pr-4">
                    <UButton icon="i-heroicons-phone" size="sm" color="primary" square variant="link" />
                    <UButton icon="i-heroicons-video-camera" size="sm" color="primary" square variant="link" />
                    <UButton icon="i-heroicons-information-circle" size="sm" color="primary" square variant="link" />
                </ul>
            </div>
            <div class="bg-slate-50 flex-1 space-y-4 p-4">
                <div class="flex items-start space-x-2.5 sm:space-x-5">
                    <div class="flex flex-col items-start space-y-3.5">
                        <div class="mr-4 max-w-lg sm:mr-10">
                            <div
                                class="rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100">
                                Ei eum populo dictas, ad sed tempor minimum voluptatibus,
                            </div>
                            <p class="ml-auto mt-1 text-right text-xs text-slate-400 dark:text-navy-300">
                                08:16
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex items-start justify-end space-x-2.5 sm:space-x-5">
                    <div class="flex flex-col items-end space-y-3.5">
                        <div class="ml-4 max-w-lg sm:ml-10">
                            <div
                                class="rounded-2xl  bg-info/10 p-3 bg-primary text-white shadow-sm dark:bg-accent dark:text-white">
                                No mei stet periculis consequat, agam nostro
                            </div>
                            <p class="ml-auto mt-1 text-left text-xs text-slate-400 dark:text-navy-300">
                                08:17
                            </p>
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <div class="relative flex justify-center">
                        <span class="px-2 text-sm text-gray-500">Nov 30, 2024, 9:41 AM</span>
                    </div>
                </div>

                <div class="flex items-start space-x-2.5 sm:space-x-5">
                    <div class="flex flex-col items-start space-y-3.5">
                        <div class="mr-4 max-w-lg sm:mr-10">
                            <div
                                class="rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100">
                                Ei eum populo dictas, ad sed tempor minimum voluptatibus,
                            </div>
                            <p class="ml-auto mt-1 text-right text-xs text-slate-400 dark:text-navy-300">
                                08:16
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center h-16 border-t bg-white px-4 space-x-4">
                <UInput v-model="value" class="flex-1" variant="none" placeholder="Write your message" />
                <UButton icon="i-heroicons-photo" size="sm" color="primary" square variant="link" />
                <UButton icon="i-heroicons-paper-clip" size="sm" color="primary" square variant="link" />
            </div>
        </div>

        <div class="bg-white border-l border-t">
            <div
                class="relative h-64 bg-[url('~/assets/img/profile-cover-pattern.png')] flex flex-col justify-center items-center space-y-4">
                <div class="absolute bottom-0  h-full w-full bg-gradient-to-t from-primary to-transparent"></div>
                <div class="flex flex-col justify-center items-center relative z-50">
                    <span class="relative inline-block">
                        <img class="h-16 w-16 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="">
                    </span>
                    <h2 class="text-xl font-semibold text-white">Lina Krouse</h2>
                    <span class="text-sm text-white">@linakrouse</span>
                </div>

                <div class="flex justify-between items-center space-x-3 relative z-50">
                    <UButton icon="i-heroicons-user" :ui="{ rounded: 'rounded-full' }"
                        class="bg-white/30 hover:bg-white/65 text-white" size="lg" color="primary" square
                        variant="soft" />
                    <UButton icon="i-heroicons-video-camera" :ui="{ rounded: 'rounded-full' }"
                        class="bg-white/30 hover:bg-white/65 text-white" size="lg" color="primary" square
                        variant="soft" />
                    <UButton icon="i-heroicons-phone" :ui="{ rounded: 'rounded-full' }"
                        class="bg-white/30 hover:bg-white/65 text-white" size="lg" color="primary" square
                        variant="soft" />
                </div>


            </div>
        </div>
    </div>
</template>


<script setup>
import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore();
const user = computed(() => authStore.getAuthUser);

definePageMeta({
    layout: 'auth',
    title: 'Forgot password',
    middleware: []
})


const goback = () => {
    alert('ozuiropeuz')
}
</script>
