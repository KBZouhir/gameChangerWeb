<template>
    <div class="mx-auto w-full h-full">
        <div class="overflow-hidden h-full grid grid-cols-5 bg-[#F1F5F9]">
            <div class="bg-white hidden dark:bg-[#111827] dark:border-[#0d121d] border-r border-t md:flex flex-col overflow-y-auto h-[calc(100vh-80px)]">
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

                <div class="is-scrollbar-hidden relative mt-3 flex flex-1 grow flex-col overflow-y-auto divide-y-[1px] divide-slate-200 dark:divide-slate-700">
                    <div v-for="user in UsersConversations" :key="user.id" @click="getConversation(user.user)" class="flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600 ">

                        <div class="avatar h-10 w-10 relative dark:bg-slate-800 bg-slate-300 rounded-full flex justify-center items-center">
                            <img v-if="user.user.image_url" class="rounded-full object-cover w-full h-full" :src="user.user.image_url" alt="avatar">
                            <span v-else class="text-xs dark:text-white">{{ getInitials(user.user.full_name) }}</span>
                        </div>
                        <div class="flex flex-1 flex-col">
                            <div class="flex items-baseline justify-between space-x-1.5">
                                <p class="line-clamp-1 text-sm font-medium text-slate-700 dark:text-white dark:text-navy-100">
                                    {{ user.user.full_name }}
                                </p>
                                <span class="text-xs text-slate-400 dark:text-navy-300"> {{ firebaseTimeGo(user.conversation.last_message.created_at) }}</span>
                            </div>
                            <div class="mt-1 flex items-center justify-between space-x-1">
                                <p class="line-clamp-1 text-xs text-slate-400 dark:text-navy-300">
                                    {{ user.conversation.last_message.content }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center items-center w-full h-full bg-white/5" v-if="UsersConversations.length <= 0">
                        <svg aria-hidden="true"
                            class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div ref="scrollTrigger" class="py-3"></div>
                </div>
            </div>

            <div v-if="selectedUser" class="flex flex-col col-span-5 md:col-span-4">
                <div class="h-16 flex justify-between items-center border-y bg-white dark:border-[#0d121d] dark:bg-[#111827]">

                    <div class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                        <div class="avatar h-10 w-10 relative dark:bg-slate-800 bg-slate-300 rounded-full flex justify-center items-center">
                            <img v-if="selectedUser?.image_url" class="rounded-full object-cover w-full h-full" :src="selectedUser?.image_url" alt="avatar">
                            <span v-else class="text-xs dark:text-white">{{ getInitials(selectedUser?.full_name) }}</span>
                        </div>


                        <div class="flex flex-col">
                            <span class="dark:text-white">{{ selectedUser?.full_name }}</span>
                            <span class="text-xs text-gray-400 font-light -mt-1">Last seen </span>
                        </div>
                    </div>
                    <ul class="flex space-x-4 pr-4">
                        <UButton icon="i-heroicons-phone" class="dark:text-white dark:hover:text-white/70" size="sm"
                            color="primary" square variant="link" />
                        <UButton icon="i-heroicons-video-camera" class="dark:text-white dark:hover:text-white/70"
                            size="sm" color="primary" square variant="link" />
                        <UButton @click="openSidebar = !openSidebar" class="dark:text-white dark:hover:text-white/70"
                            icon="i-heroicons-information-circle" size="sm" color="primary" square variant="link" />
                    </ul>
                </div>
                <div class="relative h-[calc(100vh-13rem)] bg-cover bg-[url('~/assets/img/profile-cover-pattern.png')] overflow-y-auto is-scrollbar-hidden">
                    <div ref="scrollContainer" class="relative min-h-full bg-white/95 dark:bg-[#111827]/95">
                        <div class="p-4" v-for="message in messages">
                            <div v-if="message.sender_uid != user.firebase_uuid" class="flex items-start space-x-2.5 sm:space-x-5 ">
                                <div class="flex flex-col justify-end items-end space-y-3.5">
                                    <div class="mr-4 max-w-lg sm:mr-10">
                                        <div
                                            class="rounded-2xl bg-indigo-100 p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100">
                                            {{ message.content }}
                                        </div>
                                        <p class="ml-auto mt-1 text-right text-xs text-slate-400 dark:text-navy-300">
                                            {{ message.time }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div v-else
                                class="flex items-start justify-end space-x-2.5 sm:space-x-5">
                                <div class="flex flex-col items-end space-y-3.5">
                                    <div class="flex flex-col justify-end items-end ml-4 max-w-lg sm:ml-10">
                                        <span class="rounded-2xl  bg-info/10 p-3 bg-primary text-white shadow-sm dark:bg-accent dark:text-white">
                                            {{ message.content }}
                                        </span>
                                        <p class="ml-auto mt-1 text-left text-xs text-slate-400 dark:text-navy-300">
                                            {{firebaseTimeGo(message.created_at)  }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="flex items-center h-16 border-t bg-white dark:border-[#0d121d] dark:bg-[#111827] px-4 space-x-4">
                    <UInput v-model="message" class="flex-1" variant="none" placeholder="Write your message"
                        @keyup.enter="" />
                    <UButton icon="i-heroicons-photo" class="dark:text-white dark:hover:text-white/70" size="sm"
                        color="primary" square variant="link" />
                    <UButton icon="i-heroicons-paper-clip" class="dark:text-white dark:hover:text-white/70" size="sm"
                        color="primary" square variant="link" />
                </div>
            </div>

            <div v-else class="dark:bg-slate-900 flex flex-col justify-center items-center col-span-4">
                <div>
                    <img class="w-16 mx-auto mb-4" src="~/assets/svg/logos/game-changer-icon-logo.svg" alt="" srcset="">
                    <h2 class="uppercase font-extrabold text-4xl text-primary">game changer</h2>
                    <p class="text-right text-primary text-xl">Connet</p>
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
                        </div>

                        <div class="flex justify-between items-center space-x-3 relative z-50">
                            <UButton icon="i-heroicons-user" :ui="{ rounded: 'rounded-full' }"
                                class="bg-white/30 hover:bg-white/65 dark:bg-white/30 text-white dark:text-white"
                                size="lg" color="primary" square variant="soft" />
                            <UButton icon="i-heroicons-video-camera" :ui="{ rounded: 'rounded-full' }"
                                class="bg-white/30 hover:bg-white/65 dark:bg-white/30 text-white dark:text-white"
                                size="lg" color="primary" square variant="soft" />
                            <UButton icon="i-heroicons-phone" :ui="{ rounded: 'rounded-full' }"
                                class="bg-white/30 hover:bg-white/65 dark:bg-white/30 text-white dark:text-white"
                                size="lg" color="primary" square variant="soft" />
                        </div>

                    </div>

                    <!-- <div class="flex flex-col space-y-6 p-6">
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
                    </div> -->
                </div>
            </USlideover>
        </div>
    </div>

</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/authStore';
import { getConversations, getOrCreateConversation } from '~/composables/store/useConversation';
import { useConversationStore } from '~/stores/conversations';

const authStore = useAuthStore();
const conversationStore = useConversationStore();

const { $moment } = useNuxtApp()

const user = computed(() => authStore.getAuthUser);
const UsersConversations = computed(() => conversationStore.getUsersConversations);

const message = ref();
const openSidebar = ref(false);
const scrollTrigger = ref(null);
const scrollContainer = ref(null);
const loadConversations = ref(false)
const page = ref(1)
const hasMore = ref(true)
const selectedUser = ref(null)

const messages = ref([]);

const getInitials = (name) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part[0]).join('');
    return initials;
};

definePageMeta({
    layout: 'auth',
    title: 'Forgot password',
    middleware: ['auth']
});

const fetchUsersConversations = async () => {
    loadConversations.value = true
    if (hasMore.value) {
        const result = await getConversations(page.value);
        if (result.length < 10) {
            hasMore.value = false
        } else {
            page.value += 1
        }
    }

    loadConversations.value = false
}

const fetchMoreUsersConversations = async () => {
    loadConversations.value = true
    if (hasMore.value && page.value != 1) {
        const result = await getConversations(page.value);
        if (result.length < 10) {
            hasMore.value = false
        } else {
            page.value += 1
        }
    }

    loadConversations.value = false
}

const getConversation = async (user) => {
    selectedUser.value = user
    messages.value = await getOrCreateConversation(user.id)
    
    await nextTick();

    if (scrollContainer.value) {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
}


const firebaseTimeGo = (timestamp) => {
    const millisecondsFromNanoseconds = timestamp.nanoseconds / 1000000;
    const totalMilliseconds = (timestamp.seconds * 1000) + millisecondsFromNanoseconds;
    return $moment(totalMilliseconds).fromNow();
}

watchEffect(() => {
    fetchUsersConversations()
});

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            fetchMoreUsersConversations();
        }
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
    });
    if (scrollTrigger.value) {
        observer.observe(scrollTrigger.value);
    }
});
</script>