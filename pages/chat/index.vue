<template>
    <div class="mx-auto w-full h-full">
        <div class="overflow-hidden h-full grid grid-cols-5 bg-[#F1F5F9]">
            <div
                class="bg-white hidden dark:bg-[#111827] dark:border-[#0d121d] border-r border-t lg:flex flex-col overflow-y-auto h-[calc(100vh-80px)]">
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
                            <button @click="conversationType = 1" :class="conversationType == 1 ? 'dark:bg-white text-black' : ''"
                                class=" flex space-x-1 justify-center items-center text-center rounded-full p-2">
                                <Icon name="tabler:message-2" />
                                <span class="font-semibold text-sm">{{ $t('Chat') }}</span>
                            </button>

                            <button @click="conversationType = 2" :class="conversationType == 2 ? 'dark:bg-white text-black' : ''"
                                class="flex space-x-1 justify-center items-center text-center rounded-full p-2">
                                <Icon name="tabler:briefcase" />
                                <span class="font-semibold text-sm">{{ $t('Services') }}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    class="is-scrollbar-hidden relative mt-3 flex flex-1 grow flex-col overflow-y-auto divide-y-[1px] divide-slate-200 dark:divide-slate-800">
                    
                    <div v-if="UsersConversations.length > 0 || loadConversations"
                        v-for="userConversation in UsersConversations" :key="userConversation.id"
                        @click="getConversation(userConversation.user)"
                        :class="(selectedUser?.firebase_uuid == userConversation.user.firebase_uuid) ? 'bg-green-100 dark:bg-slate-800' : ''"
                        class="flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-100 dark:hover:bg-slate-800 ">
                        <UAvatar :src="userConversation.user.image_url" :alt="userConversation.user.full_name"
                            size="md" />
                        <div class="flex flex-1 flex-col">
                            <div class="flex items-baseline justify-between space-x-1.5">
                                <p
                                    class="line-clamp-1 text-sm font-medium text-slate-700 dark:text-white dark:text-navy-100">
                                    {{ userConversation.user.full_name }}
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
                    <template v-else>
                        <div v-for="i in 10"
                            class="flex items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600">
                            <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
                            <div class="flex flex-1 flex-col space-y-3">
                                <USkeleton class="h-4" />
                                <USkeleton class="h-4 w-2/5" />
                            </div>
                        </div>
                    </template>

                    <template v-if="loadConversations && UsersConversations.length == 0">
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

            <div v-if="selectedUser" class="flex flex-col col-span-5 lg:col-span-4">
                <div
                    class="h-16 flex justify-between items-center border-y bg-white dark:border-[#0d121d] dark:bg-[#111827]">
                    <div class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                        <div
                            class="avatar h-10 w-10 relative dark:bg-slate-800 bg-slate-300 rounded-full flex justify-center items-center">
                            <img v-if="selectedUser?.image_url" class="rounded-full object-cover w-full h-full"
                                :src="selectedUser?.image_url" alt="avatar">
                            <span v-else class="text-xs dark:text-white">
                                {{ getInitials(selectedUser?.full_name) }}
                            </span>
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
                <div
                    class="relative h-[calc(100vh-13rem)] bg-repeat bg-[url('~/assets/img/profile-cover-pattern.png')] overflow-y-auto is-scrollbar-hidden">
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
                                            <span v-if="message.content"
                                                class="rounded-2xl  bg-info/10 p-3 bg-primary text-white shadow-sm dark:bg-accent dark:text-white">
                                                {{ message.content }}
                                            </span>
                                            <div v-for="attachment in message.attachments">
                                                <ImageView v-if="attachment.type == 'image'" :id="attachment.id" />
                                                <VideoPlayer v-else :id="attachment.id" />
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
                    <UButton icon="i-heroicons-photo" class="dark:text-white dark:hover:text-white/70" size="sm"
                        color="primary" square variant="link" />
                    <UButton icon="i-heroicons-paper-clip" class="dark:text-white dark:hover:text-white/70" size="sm"
                        color="primary" square variant="link" />
                </div>
            </div>

            <div v-else class="dark:bg-slate-900 flex flex-col justify-center items-center col-span-4">
                <div>
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

const user = computed(() => authStore.getAuthUser);
const UsersConversations = computed(() => conversationStore.getUsersConversations);

const inputMessage = ref();
const openSidebar = ref(false);
const scrollTrigger = ref(null);
const scrollContainer = ref(null);
const loadConversations = ref(false)
const page = ref(1)
const hasMore = ref(true)
const selectedUser = ref(null)
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
            }
            loadConversations.value = true
        })
    } catch (error) {
        console.error("Error fetching conversations:", error)
    }
}

const getInitials = (name) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part[0]).join('');
    return initials;
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

const getConversation = async (user) => {
    selectedUser.value = user;
    const conversationID = await getOrCreateConversation(user.id, conversationType.value)
    console.log(conversationID.conversationable);
    
    selectedConversation.value = conversationID?.id
    messages.value = []
    
    try {
        const messagesCollectionRef = collection($db, "conversations", selectedConversation.value, "messages");
        const messagesQuery = query(messagesCollectionRef, orderBy("created_at", "asc"));

        onSnapshot(messagesQuery, (snapshot) => {
            const messagesList = snapshot.docs.map((doc) => doc.data());
            console.log(messagesList);
            
            const filteredMessages = messagesList.filter(
                (message) => message.sender_uid === selectedUser.value.firebase_uuid
            )
            
            const groupedMessages = messagesList.reduce((groups, message) => {
                const date = new Date(message.created_at.seconds * 1000)
                    .toISOString()
                    .split("T")[0];
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(message);
                return groups;
            }, {})


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
    return $moment(totalMilliseconds).fromNow();
}

const receivedMessageSound = () => {
    const audio = new Audio('/sounds/MessageNotification.mp3');
    audio.play();
}

watchEffect(() => {
    getConversationsData()
})

</script>