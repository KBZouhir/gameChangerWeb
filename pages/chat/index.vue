<template>
    <div class="mx-auto w-full h-full">
        <div class="overflow-hidden h-full grid grid-cols-5 bg-[#F1F5F9]">
            <div class="bg-white dark:bg-[#111827] dark:border-[#0d121d] border-r border-t flex flex-col overflow-y-auto h-[calc(100vh-80px)]">
                <div class="p-4">
                    <UInput size="lg" placeholder="Search..." class="focus:ring-green-500" color="gray">
                        <template #leading>
                            <UButton icon="i-heroicons-arrow-left" color="primary" class="p-0 dark:text-white" square
                                variant="link" />
                        </template>

                        <template #trailing>
                            <UIcon name="i-heroicons-magnifying-glass" />
                        </template>
                    </UInput>
                </div>
                <div class="is-scrollbar-hidden mt-3 flex flex-1 grow flex-col overflow-y-auto divide-y-[1px]">
                    <div v-for="i in 50" :class="i % 2 == 0 ? 'bg-green-100' : ''"
                        class="flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600">
                        <div class="avatar h-10 w-10 relative">
                            <img class="rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="avatar">
                            <div
                                class="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white dark:border-[#0d121d] bg-slate-300 dark:border-navy-700">
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

            <div class="flex flex-col col-span-4">
                <div class="h-16 flex justify-between items-center border-y bg-white dark:border-[#0d121d] dark:bg-[#111827]">
                    <div class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                        <span class="relative inline-block">
                            <img class="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="">
                            <span class="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white"></span>
                        </span>
                        <div class="flex flex-col">
                            <span class="dark:text-white">{{ user?.full_name }}</span>
                            <span class="text-xs text-gray-400 font-light -mt-1">Active now</span>
                        </div>
                    </div>
                    <ul class="flex space-x-4 pr-4">
                        <UButton icon="i-heroicons-phone" class="dark:text-white dark:hover:text-white/70" size="sm" color="primary" square variant="link" />
                        <UButton icon="i-heroicons-video-camera" class="dark:text-white dark:hover:text-white/70" size="sm" color="primary" square variant="link" />
                        <UButton @click="openSidebar = !openSidebar" class="dark:text-white dark:hover:text-white/70" icon="i-heroicons-information-circle" size="sm"
                            color="primary" square variant="link" />
                    </ul>
                </div>
                <div class="relative h-[calc(100vh-13rem)] bg-cover bg-[url('~/assets/img/profile-cover-pattern.png')] overflow-y-auto is-scrollbar-hidden">
                    <div class="relative min-h-full bg-white/95 dark:bg-[#111827]/95">
                        <div class="p-4" v-for="message in messages">
                            <div v-if="message.id_sender == 1" class="flex items-start space-x-2.5 sm:space-x-5 ">
                                <div class="flex flex-col items-start space-y-3.5">
                                    <div class="mr-4 max-w-lg sm:mr-10">
                                        <div
                                            class="rounded-2xl bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100">
                                            {{ message.message }}
                                        </div>
                                        <p class="ml-auto mt-1 text-right text-xs text-slate-400 dark:text-navy-300">
                                            {{ message.time }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div v-if="message.id_sender == 2"
                                class="flex items-start justify-end space-x-2.5 sm:space-x-5">
                                <div class="flex flex-col items-end space-y-3.5">
                                    <div class="ml-4 max-w-lg sm:ml-10">
                                        <div
                                            class="rounded-2xl  bg-info/10 p-3 bg-primary text-white shadow-sm dark:bg-accent dark:text-white">
                                            {{ message.message }}
                                        </div>
                                        <p class="ml-auto mt-1 text-left text-xs text-slate-400 dark:text-navy-300">
                                            {{ message.time }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center h-16 border-t bg-white dark:border-[#0d121d] dark:bg-[#111827] px-4 space-x-4">
                    <UInput v-model="message" class="flex-1" variant="none" placeholder="Write your message"
                        @keyup.enter="" />
                    <UButton icon="i-heroicons-photo" class="dark:text-white dark:hover:text-white/70" size="sm" color="primary" square variant="link" />
                    <UButton icon="i-heroicons-paper-clip" class="dark:text-white dark:hover:text-white/70" size="sm" color="primary" square variant="link" />
                </div>
            </div>

            <USlideover v-model="openSidebar">
                <div class="p-0 flex-1">
                    <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid"
                        class="flex sm:hidden absolute end-5 top-5 z-10" square padded @click="openSidebar = false" />
                    <div
                        class="relative h-64 bg-[url('~/assets/img/profile-cover-pattern.png')] flex flex-col justify-center items-center space-y-4">
                        <div class="absolute bottom-0  h-full w-full bg-gradient-to-t from-primary to-transparent">
                        </div>
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
                                class="bg-white/30 hover:bg-white/65 dark:bg-white/30 text-white dark:text-white" size="lg" color="primary" square
                                variant="soft" />
                            <UButton icon="i-heroicons-video-camera" :ui="{ rounded: 'rounded-full' }"
                                class="bg-white/30 hover:bg-white/65 dark:bg-white/30 text-white dark:text-white" size="lg" color="primary" square
                                variant="soft" />
                            <UButton icon="i-heroicons-phone" :ui="{ rounded: 'rounded-full' }"
                                class="bg-white/30 hover:bg-white/65 dark:bg-white/30 text-white dark:text-white" size="lg" color="primary" square
                                variant="soft" />
                        </div>

                    </div>

                    <div class="flex flex-col space-y-6 p-6">
                        <div class="flex flex-col">
                            <label class="text-[#797C7B]" for="">Display Name</label>
                            <h2 class="font-semibold">Jhon Abraham</h2>
                        </div>

                        <div class="flex flex-col">
                            <label class="text-[#797C7B]" for="">Email Address</label>
                            <h2 class="font-semibold">jhonabraham20@gmail.com</h2>
                        </div>

                        <div class="flex flex-col">
                            <label class="text-[#797C7B]" for="">Address</label>
                            <h2 class="font-semibold">33 street west subidbazar,sylhet</h2>
                        </div>

                        <div class="flex flex-col">
                            <label class="text-[#797C7B]" for="">Phone Number</label>
                            <h2 class="font-semibold">(320) 555-0104</h2>
                        </div>
                    </div>
                </div>
            </USlideover>
        </div>
    </div>

</template>


<script setup>
import { useAuthStore } from '~/stores/authStore'
import { getConversations } from '~/composables/store/useConversation'

const authStore = useAuthStore()
const user = computed(() => authStore.getAuthUser)

const message = ref()
const openSidebar = ref(false)

const messages = ref([
    {
        id: 0,
        message: 'test',
        time: '08:45',
        id_sender: Math.floor(Math.random() * 2) + 1
    },
])

definePageMeta({
    layout: 'auth',
    title: 'Forgot password',
    middleware: ['auth']
})

watchEffect(() => {
    getConversations()
});

</script>
