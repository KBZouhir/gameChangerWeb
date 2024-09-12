<template>
    <div
        class="is-scrollbar-hidden relative mt-3 flex flex-1 grow flex-col overflow-y-auto divide-y-[1px] divide-slate-200 dark:divide-slate-800">

        <div v-if="UsersConversations.length > 0" v-for="userConversation in UsersConversations"
            :key="userConversation.id"
            :class="(selectedUser?.firebase_uuid == userConversation.user.firebase_uuid) ? 'bg-green-100 dark:bg-slate-800' : ''"
            class="flex cursor-pointer items-center space-x-2.5 px-4 py-2.5 font-inter hover:bg-slate-100 dark:hover:bg-slate-800 ">

            <nuxt-link class="flex cursor-pointer items-center space-x-2.5 w-full" :to="`/chat?user_id=${userConversation.user.id}`">
                <UAvatar
                    :src="(userConversation.conversationable) ? userConversation.conversationable.image_url : userConversation.user.image_url"
                    :alt="userConversation.user.full_name" size="md" />
                <div class="flex flex-1 flex-col">
                    <div class="flex items-baseline justify-between space-x-1.5">
                        <p class="line-clamp-1 text-sm font-medium text-slate-700 dark:text-white dark:text-navy-100">
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
            </nuxt-link>

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
                    <img class="w-32 mx-auto mb-4 dark:hidden flex" src="~/assets/svg/vectors/chat-illustration.svg"
                        alt="" srcset="">
                    <img class="w-32 mx-auto mb-4 dark:flex hidden"
                        src="~/assets/svg/vectors/chat-illustration-white.svg" alt="" srcset="">
                    <div class="text-center my-3">
                        <h2 class="text-xl font-bold">No Conversations</h2>
                        <p class="text-gray-400">You don't have any conversations yet</p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { collection, addDoc, query, doc, where, updateDoc, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore"
import { useAuthStore } from '~/stores/authStore';
import { getConversations, getOrCreateConversation, sendAttachements } from '~/composables/store/useConversation'
import { useConversationStore } from '~/stores/conversations'

const authStore = useAuthStore();
const conversationStore = useConversationStore();

const { $db } = useNuxtApp()
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

const firebaseTimeGo = (timestamp) => {
    const millisecondsFromNanoseconds = timestamp.nanoseconds / 1000000;
    const totalMilliseconds = (timestamp.seconds * 1000) + millisecondsFromNanoseconds;
    return dayjs(totalMilliseconds).fromNow();
}
watchEffect(() => {
    getConversationsData()
})
</script>