<template>
    <div class="mx-auto w-full h-full">
        <div class="overflow-hidden h-full grid grid-cols-5 bg-[#F1F5F9]">
            <div
                class="bg-white hidden lg:col-span-1 col-span-2 dark:bg-[#111827] dark:border-[#0d121d] border-r border-t md:flex flex-col overflow-y-auto h-[calc(100vh-80px)]">
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

                    <div class="pt-4">
                        <div class="grid grid-cols-2 rounded-full dark:bg-slate-800 bg-white/60 p-1">
                            <button @click="selectTab(1)"
                                :class="conversationType == 1 ? 'dark:bg-white text-black' : ''"
                                class=" flex space-x-1 justify-center items-center text-center rounded-full p-2">
                                <Icon name="tabler:message-2" />
                                <span class="font-semibold text-sm">{{ $t('Chat') }}</span>
                            </button>

                            <button @click="selectTab(2)"
                                :class="conversationType == 2 ? 'dark:bg-white text-black' : ''"
                                class="flex space-x-1 justify-center items-center text-center rounded-full p-2">
                                <Icon name="tabler:briefcase" />
                                <span class="font-semibold text-sm">{{ $t('Services') }}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    class="is-scrollbar-hidden relative mt-3 flex flex-1 grow flex-col overflow-y-auto divide-y-[1px] divide-slate-200 dark:divide-slate-800">

                    <div v-if="UsersConversations.length > 0" v-for="userConversation in UsersConversations"
                        :key="userConversation.id" @click="getConversation(userConversation)"
                        :class="(selectedUser?.firebase_uuid == userConversation.user.firebase_uuid) ? 'bg-green-100 dark:bg-slate-800' : ''"
                        class="flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-100 dark:hover:bg-slate-800 ">

                        <UAvatar
                            :src="(userConversation.conversationable) ? userConversation.conversationable.image_url : userConversation.user.image_url"
                            :alt="userConversation.user.full_name" size="md" />
                        <div class="flex flex-1 flex-col">
                            <div class="flex items-baseline justify-between space-x-1.5">
                                <p
                                    class="line-clamp-1 text-sm font-medium text-slate-700 dark:text-white dark:text-navy-100">
                                    {{ (userConversation.conversationable) ? userConversation.conversationable.title :
                                        userConversation.user.full_name }}
                                </p>
                                <span class="text-xs text-slate-400 dark:text-navy-300"> {{
                                    firebaseTimeGo(userConversation.conversation.last_message.created_at) }}</span>
                            </div>
                            <div class="mt-1 flex items-center justify-between space-x-1">
                                <p class="line-clamp-1 text-xs text-slate-400 dark:text-navy-300">
                                    <span
                                        v-if="(userConversation.conversation.last_message.sender_uid == user.firebase_uuid) && userConversation.conversation.last_message.content != null">You:
                                    </span>
                                    <span v-if="userConversation.conversation.last_message.content != null"
                                        :class="userConversation.conversation.last_message.sender_uid != user.firebase_uuid ? 'font-bold' : ''">
                                        {{ userConversation.conversation.last_message.content }}
                                    </span>
                                    <span v-if="userConversation.conversation.last_message?.attachments"
                                        :class="userConversation.conversation.last_message.sender_uid != user.firebase_uuid ? 'font-bold' : 'italic '">
                                        {{ userConversation.conversation.last_message?.attachments[0].type == 'image' ?
                                            'You sent a picture' : 'You sent a Media'
                                        }}
                                    </span>
                                </p>
                            </div>
                        </div>

                    </div>

                    <template v-if="loadConversations">
                        <div v-for="i in 10"
                            class="flex items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600">
                            <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
                            <div class="flex flex-1 flex-col space-y-3">
                                <USkeleton class="h-4" />
                                <USkeleton class="h-4 w-2/5" />
                            </div>
                        </div>
                    </template>

                    <template v-if="!loadConversations && UsersConversations.length == 0">
                        <div class="flex-1 justify-center flex items-center">
                            <div>
                                <img class="w-32 mx-auto mb-4 dark:hidden flex"
                                    src="~/assets/svg/vectors/chat-illustration.svg" alt="" srcset="">
                                <img class="w-32 mx-auto mb-4 dark:flex hidden"
                                    src="~/assets/svg/vectors/chat-illustration-white.svg" alt="" srcset="">
                                <div class="text-center my-3">
                                    <h2 class="text-xl font-bold">No Conversations</h2>
                                    <p class="text-gray-400">You don't have any conversations yet</p>
                                </div>
                            </div>
                        </div>
                    </template>

                    <div class="flex justify-center py-4" v-if="showMoreBtn && UsersConversations.length > 0">
                        <UButton @click="fetchMoreUsersConversations" :loading="seeMoreLoading"
                            class="dark:bg-slate-50 capitalize hover:dark:bg-slate-200" size="xs">load more</UButton>
                    </div>
                </div>
            </div>

            <div v-if="selectedUser" class="flex flex-col col-span-5 md:col-span-3 lg:col-span-4 ml-20 md:ml-0">
                <div
                    class="h-16 flex justify-between items-center border-y bg-white dark:border-[#0d121d] dark:bg-[#111827]">
                    <div class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">

                        <UAvatar v-if="selectedService" :src="selectedService.image_url" :alt="selectedService.title"
                            size="md" />
                        <UAvatar v-else :src="selectedUser.image_url" :alt="selectedUser.full_name" size="md" />

                        <div class="flex flex-col">
                            <span class="dark:text-white">{{ (selectedService) ? selectedService.title :
                                selectedUser?.full_name
                                }}</span>
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
                <div
                    class="relative h-[calc(100vh-13rem)] bg-repeat bg-[url('~/assets/img/profile-cover-pattern.png')] overflow-y-auto is-scrollbar-hidden">


                    <div v-if="selectedService" class="w-full p-2 bg-white dark:bg-slate-800 sticky top-0 z-50">
                        <div class="relative isolate flex flex-col gap-8 lg:flex-row">
                            <div class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                                <img :src="selectedService.image_url" alt=""
                                    class="absolute inset-0 h-full w-full rounded-md bg-gray-50 object-cover">
                                <div class="absolute inset-0 rounded-md ring-1 ring-inset ring-gray-900/10"></div>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center gap-x-4 text-xs">
                                    <time datetime="2020-03-16" class="text-gray-500 dark:text-white">
                                        {{ selectedService.created_at }}
                                    </time>
                                </div>
                                <div class="group relative">
                                    <div class="flex items-center justify-between">
                                        <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 dark:text-white group-hover:dark:text-white">
                                            <nuxt-link :to="`/services/${selectedService?.id}`">
                                                {{ selectedService.title }}
                                            </nuxt-link>
                                        </h3>
                                        <span class="relative z-10 items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                                            <span v-if="selectedService.price">{{selectedService.price}}$</span> 
                                            <span v-else>{{ $t('Estimate') }}</span>
                                        </span>
                                    </div>
                                    <p class="mt-2 text-xs leading-6 text-gray-600 dark:text-gray-300 line-clamp-3">
                                        {{ selectedService.description }}
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div ref="scrollContainer" class="relative min-h-full bg-white/95 dark:bg-[#111827]/95">
                        <div v-for="(listMessages, date) in messages" :key="date" class="p-4">
                            <UDivider :label="date" size="2xs" />

                            <div v-for="message in listMessages">
                                <div v-if="message.sender_uid != user.firebase_uuid"
                                    class="flex items-start space-x-2.5 sm:space-x-5 mb-3">
                                    <div class="flex flex-col justify-end items-end space-y-3.5">
                                        <div class="mr-4 max-w-lg sm:mr-10">
                                            <div v-if="message.content"
                                                class="rounded-2xl bg-indigo-100 p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100">
                                                {{ message.content }}
                                            </div>
                                            <p
                                                class="ml-auto mt-1 text-right text-xs text-slate-400 dark:text-navy-300">
                                                {{ message.time }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div v-else class="flex items-start justify-end space-x-2.5 sm:space-x-5 mb-3">
                                    <div class="flex flex-col items-end space-y-3.5">
                                        <div class="flex flex-col justify-end items-end ml-4 max-w-lg sm:ml-10">
                                            <div v-if="isURL(message.content)">
                                                <LinkPreview :url="message.content" />
                                            </div>
                                            <span v-else
                                                class="rounded-2xl  bg-info/10 p-3 bg-primary text-white shadow-sm dark:bg-accent dark:text-white">
                                                {{ message.content }}
                                            </span>
                                            <div v-for="attachment in message.attachments">

                                                <ImageView v-if="attachment.type == 'image'" :id="attachment.id" />
                                                <VideoPlayer v-if="attachment.type == 'video'" :id="attachment.id" />
                                                <AudioPlayer v-if="attachment.type == 'audio'" :id="attachment.id" />
                                            </div>
                                            <p class="ml-auto mt-1 text-left text-xs text-slate-400 dark:text-navy-300">
                                                {{ firebaseTimeGo(message.created_at) }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="flex items-center h-16 border-t bg-white dark:border-[#0d121d] dark:bg-[#111827] px-4 space-x-4">
                    <UInput v-model="inputMessage" class="flex-1" variant="none" placeholder="Write your message"
                        @keyup.enter="sendMessage" />
                    <UButton icon="i-heroicons-photo" class="hidden dark:text-white dark:hover:text-white/70" size="sm"
                        color="primary" square variant="link" />
                    <UButton icon="i-heroicons-paper-clip" class="hidden dark:text-white dark:hover:text-white/70"
                        size="sm" color="primary" square variant="link" />
                </div>
            </div>

            <div
                class="dark:border-[#0d121d] bg-white border-t border-r dark:bg-[#111827] p-4 col-span-1 h-full fixed flex flex-col space-y-4 w-20 md:hidden">
                <UButton @click="isOpen = true" size="lg" square
                    class="block md:hidden bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-white/5">
                    <template #leading>
                        <Icon name="tabler:list" size="20" class="dark:text-white text-primary" />
                    </template>
                </UButton>
                <div v-if="UsersConversations.length > 0" v-for="userConversation in UsersConversations"
                    :key="userConversation.id" @click="getConversation(userConversation)"
                    :class="(selectedUser?.firebase_uuid == userConversation.user.firebase_uuid) ? 'border-2 border-green-500 rounded-full flex items-center justify-center p-1 dark:bg-slate-800' : ''"
                    class="cursor-pointer font-inter ">

                    <UAvatar
                        :src="(userConversation.conversationable) ? userConversation.conversationable.image_url : userConversation.user.image_url"
                        :alt="userConversation.user.full_name" size="md" />
                </div>

                <template v-if="loadConversations">
                    <div v-for="i in 10"
                        class="flex items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600">
                        <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />

                    </div>
                </template>
            </div>

            <div v-if="!selectedUser"
                class="dark:bg-slate-900 grid grid-cols-3 gap-4 col-span-5 md:col-span-3 lg:col-span-4 h-full">
                <div class="flex flex-col items-center justify-center col-span-5 ml-20">
                    <img class="w-32 mx-auto mb-4 dark:hidden flex" src="~/assets/svg/vectors/chat-illustration.svg"
                        alt="" srcset="">
                    <img class="w-32 mx-auto mb-4 dark:flex hidden"
                        src="~/assets/svg/vectors/chat-illustration-white.svg" alt="" srcset="">
                    <h2 class="uppercase font-extrabold text-4xl dark:text-white text-primary">game changer</h2>
                    <p class="text-right text-primary dark:text-white text-xl">Connect</p>
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
                            <UAvatar size="2xl" :src="selectedUser?.image_url" :alt="selectedUser?.full_name" />
                            <h2 class="text-xl font-semibold text-white">{{ selectedUser?.full_name }}</h2>
                        </div>

                        <div class="flex justify-between items-center space-x-3 relative z-50">
                            <nuxt-link :to="`/profile/${selectedUser?.id}`">
                                <UButton icon="i-heroicons-user" :ui="{ rounded: 'rounded-full' }"
                                    class="bg-white/30 hover:bg-white/65 dark:bg-white/30 text-white dark:text-white"
                                    size="lg" color="primary" square variant="soft" />
                            </nuxt-link>
                            <UButton icon="i-heroicons-video-camera" :ui="{ rounded: 'rounded-full' }"
                                class="bg-white/30 hover:bg-white/65 dark:bg-white/30 text-white dark:text-white"
                                size="lg" color="primary" square variant="soft" />
                            <UButton icon="i-heroicons-phone" :ui="{ rounded: 'rounded-full' }"
                                class="bg-white/30 hover:bg-white/65 dark:bg-white/30 text-white dark:text-white"
                                size="lg" color="primary" square variant="soft" />
                        </div>

                    </div>
                </div>
            </USlideover>

            <USlideover v-model="isOpen">
                <div class="p-4">
                    <!-- <UInput size="lg" placeholder="Search..." class="focus:ring-green-500" color="gray">
                        <template #leading>
                            <UButton icon="i-heroicons-arrow-left" color="primary" class="p-0 dark:text-white" square
                                variant="link" />
                        </template>

                        <template #trailing>
                            <UIcon name="i-heroicons-magnifying-glass" />
                        </template>
                    </UInput> -->
                    <UButton @click="isOpen = false" icon="i-heroicons-arrow-left" color="green" class="p-0 dark:text-white" square variant="link" />

                    <div class="pt-4">
                        <div class="grid grid-cols-2 rounded-full dark:bg-slate-800 bg-white/60 p-1">
                            <button @click="{ conversationType = 1; selectedUser = null }"
                                :class="conversationType == 1 ? 'dark:bg-white text-black' : ''"
                                class=" flex space-x-1 justify-center items-center text-center rounded-full p-2">
                                <Icon name="tabler:message-2" />
                                <span class="font-semibold text-sm">{{ $t('Chat') }}</span>
                            </button>

                            <button @click="{ conversationType = 2; selectedUser = null }"
                                :class="conversationType == 2 ? 'dark:bg-white text-black' : ''"
                                class="flex space-x-1 justify-center items-center text-center rounded-full p-2">
                                <Icon name="tabler:briefcase" />
                                <span class="font-semibold text-sm">{{ $t('Services') }}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="UsersConversations.length > 0" v-for="userConversation in UsersConversations"
                    :key="userConversation.id" @click="getConversation(userConversation)"
                    :class="(selectedUser?.firebase_uuid == userConversation.user.firebase_uuid) ? 'bg-green-100 dark:bg-slate-800' : ''"
                    class="flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-100 dark:hover:bg-slate-800 ">

                    <UAvatar
                        :src="(userConversation.conversationable) ? userConversation.conversationable.image_url : userConversation.user.image_url"
                        :alt="userConversation.user.full_name" size="md" />
                    <div class="flex flex-1 flex-col">
                        <div class="flex items-baseline justify-between space-x-1.5">
                            <p
                                class="line-clamp-1 text-sm font-medium text-slate-700 dark:text-white dark:text-navy-100">
                                {{ (userConversation.conversationable) ? userConversation.conversationable.title :
                                    userConversation.user.full_name }}
                            </p>
                            <span class="text-xs text-slate-400 dark:text-navy-300"> {{
                                firebaseTimeGo(userConversation.conversation.last_message.created_at) }}</span>
                        </div>
                        <div class="mt-1 flex items-center justify-between space-x-1">
                            <p class="line-clamp-1 text-xs text-slate-400 dark:text-navy-300">
                                <span
                                    v-if="(userConversation.conversation.last_message.sender_uid == user.firebase_uuid) && userConversation.conversation.last_message.content != null">You:
                                </span>
                                <span v-if="userConversation.conversation.last_message.content != null"
                                    :class="userConversation.conversation.last_message.sender_uid != user.firebase_uuid ? 'font-bold' : ''">
                                    {{ userConversation.conversation.last_message.content }}
                                </span>
                                <span v-if="userConversation.conversation.last_message?.attachments"
                                    :class="userConversation.conversation.last_message.sender_uid != user.firebase_uuid ? 'font-bold' : 'italic '">
                                    {{ userConversation.conversation.last_message?.attachments[0].type == 'image' ?
                                        'You sent a picture' : 'You sent a video'
                                    }}
                                </span>
                            </p>
                        </div>
                    </div>

                </div>

                <template v-if="loadConversations">
                    <div v-for="i in 10"
                        class="flex items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600">
                        <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
                        <div class="flex flex-1 flex-col space-y-3">
                            <USkeleton class="h-4" />
                            <USkeleton class="h-4 w-2/5" />
                        </div>
                    </div>
                </template>

                <template v-if="!loadConversations && UsersConversations.length == 0">
                    <div class="flex-1 justify-center flex items-center">
                        <div>
                            <img class="w-32 mx-auto mb-4 dark:hidden flex"
                                src="~/assets/svg/vectors/chat-illustration.svg" alt="" srcset="">
                            <img class="w-32 mx-auto mb-4 dark:flex hidden"
                                src="~/assets/svg/vectors/chat-illustration-white.svg" alt="" srcset="">
                            <div class="text-center my-3">
                                <h2 class="text-xl font-bold">No Conversations</h2>
                                <p class="text-gray-400">You don't have any conversations yet</p>
                            </div>
                        </div>
                    </div>
                </template>

                <div class="flex justify-center py-4" v-if="showMoreBtn && UsersConversations.length > 0">
                    <UButton @click="fetchMoreUsersConversations" :loading="seeMoreLoading"
                        class="dark:bg-slate-50 capitalize hover:dark:bg-slate-200" size="xs">load more</UButton>
                </div>
            </USlideover>
        </div>
    </div>

</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { collection, addDoc, query, doc, where, updateDoc, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore"
import { useAuthStore } from '~/stores/authStore';
import { getConversations, getOrCreateConversation } from '~/composables/store/useConversation'
import { useConversationStore } from '~/stores/conversations'

const authStore = useAuthStore();
const conversationStore = useConversationStore();

const { $db } = useNuxtApp()
const { $moment } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const dayjs = useDayjs()

const user = computed(() => authStore.getAuthUser);
const UsersConversations = computed(() => conversationStore.getUsersConversations);

const inputMessage = ref();
const openSidebar = ref(false)
const isOpen = ref(false)
const scrollTrigger = ref(null)
const scrollContainer = ref(null)
const loadConversations = ref(false)
const page = ref(1)
const hasMore = ref(true)
const selectedUser = ref(null)
const selectedService = ref(null)
const messages = ref([]);
const conversationIds = ref([])
const conversations = ref([])
const selectedConversation = ref(null)
const showMoreBtn = ref(false)
const seeMoreLoading = ref(false)
const conversationType = ref(1)



definePageMeta({
    layout: 'auth',
    title: 'Chat',
    middleware: ['auth']
})

const getConversationsData = async () => {
    loadConversations.value = true
    try {
        const conversationsCollection = collection($db, "conversations")
        const q = query(conversationsCollection, where("participants", "array-contains", user.value.firebase_uuid), orderBy("last_message.created_at", "desc"), where("type", "==", conversationType.value))

        conversations.value = []
        onSnapshot(q, async (querySnapshot) => {
            conversations.value = []
            querySnapshot.forEach((doc) => {
                conversations.value.push({ id: doc.id, ...doc.data() })
            })


            conversationIds.value = conversations.value.map(
                (conversation) => conversation.id
            )


            if (conversationIds.value.length > 0) {


                let arrayConversationIds = []
                let arrayConversations = []

                arrayConversationIds = conversationIds.value.slice(0, 10)
                arrayConversations = conversations.value.slice(0, 10)
                showMoreBtn.value = true
                page.value += 1


                await getConversations(arrayConversationIds, arrayConversations, false)
            } else {
                conversationStore.clearUsersConversations()
            }
            loadConversations.value = false
        })
    } catch (error) {
        console.error("Error fetching conversations:", error)
    }
}

const getOrCreateCon = async () => {
    if (route.query.user_id) {
        let id = (route.query.service_id) ? route.query.service_id : route.query.user_id
        let type = (route.query.service_id) ? 2 : 1
        const result = await getOrCreateConversation(id, type)
        conversationType.value = type

        if (result?.conversationable) {
            selectedService.value = result?.conversationable
        }
        selectedConversation.value = result?.id
        await getMessagesFirebase(result?.id)

        const participant = result.participants.find((participant) => participant.id !== user.value.id);

        selectedUser.value = participant

    }
}

const fetchMoreUsersConversations = async () => {
    loadConversations.value = true
    seeMoreLoading.value = true
    if (hasMore.value) {
        try {
            const arrayConversationIds = conversationIds.value.slice((page.value - 1) * 10, page.value * 10)
            const result = await getConversations(arrayConversationIds, conversations.value, true);
            if (result?.length < 10) {
                hasMore.value = false
                showMoreBtn.value = false
            } else {
                page.value += 1
            }
        } catch (error) {
            console.error("Error fetching conversations:", error)
        }
    }
    seeMoreLoading.value = false
    loadConversations.value = false
}

const getConversation = async (conversationData) => {
    isOpen.value = false
    let id = (conversationData.conversation.conversationable_id) ? conversationData.conversation.conversationable_id : conversationData.user.id
    selectedUser.value = conversationData.user;
    selectedService.value = conversationData.conversationable;
    const conversationID = await getOrCreateConversation(id, conversationType.value)


    selectedConversation.value = conversationID?.id
    messages.value = []

    getMessagesFirebase(selectedConversation.value)
}

const getMessagesFirebase = (targetConversation) => {
    try {
        const messagesCollectionRef = collection($db, "conversations", targetConversation, "messages");
        const messagesQuery = query(messagesCollectionRef, orderBy("created_at", "asc"));

        onSnapshot(messagesQuery, (snapshot) => {
            const messagesList = snapshot.docs.map((doc) => doc.data());

            const filteredMessages = messagesList.filter(
                (message) => message.sender_uid === selectedUser.value.firebase_uuid
            )

            const groupedMessages = messagesList.reduce((acc, message) => {
                const date = dayjs.unix(message.created_at?.seconds).format('YYYY-MM-DD');
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(message);

                return acc;
            }, {});


            if (filteredMessages.length > 0) {
                messages.value = groupedMessages
            }

            nextTick().then(() => {
                if (scrollContainer.value) {
                    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
                }
            })
        })

    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

const sendMessage = async () => {
    console.log(selectedConversation.value);
    
    if (selectedConversation.value) {
        if (inputMessage.value.trim() === '') return;
        try {
            const messagesRef = collection($db, 'conversations', selectedConversation.value, 'messages')
            const conversationDocRef = doc($db, 'conversations', selectedConversation.value)
            const newMessageRef = await addDoc(messagesRef, {
                content: inputMessage.value,
                created_at: serverTimestamp(),
                sender_uid: user.value.firebase_uuid,
            });

            await updateDoc(conversationDocRef, {
                last_message: {
                    id: newMessageRef.id,
                    content: inputMessage.value,
                    created_at: serverTimestamp(),
                    sender_uid: user.value.firebase_uuid,
                }
            });
            inputMessage.value = ""
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}

const firebaseTimeGo = (timestamp) => {
    const millisecondsFromNanoseconds = timestamp.nanoseconds / 1000000;
    const totalMilliseconds = (timestamp.seconds * 1000) + millisecondsFromNanoseconds;
    return dayjs(totalMilliseconds).fromNow();
}

const receivedMessageSound = () => {
    const audio = new Audio('/sounds/MessageNotification.mp3');
    audio.play();
}


const selectTab = (tab) => {
    router.push({
        path: route.path,
        query: {}
    })
    conversationType.value = tab;
    selectedUser.value = null
}


const isURL = (str, protocol = "") => {
  try {
    const url = new URL(str);
    return protocol 
      ? url.protocol === `${protocol}:` && url.hostname !== ""
      : url.hostname !== ""
  } catch (_) {
    return false
  }
}

watchEffect(() => {
    getConversationsData()
    getOrCreateCon()
})

</script>