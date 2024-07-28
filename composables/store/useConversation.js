import { collection, getDocs, query, where, doc, getDoc, orderBy } from "firebase/firestore"
import { useAuthStore } from "~/stores/authStore"
import { useConversationStore } from '~/stores/conversations'

export const getConversations = async (page = 1) => {
  const { $db } = useNuxtApp()
  const authStore = useAuthStore()
  const conversationStore = useConversationStore()
  const user = authStore.getAuthUser

  try {
    const conversationsCollection = collection($db, "conversations")
    const q = query(
      conversationsCollection,
      where("participants", "array-contains", user.firebase_uuid)
    );

    const querySnapshot = await getDocs(q);
    const conversations = [];

    querySnapshot.forEach((doc) => {
      conversations.push({ id: doc.id, ...doc.data() })
    });

    const conversationIds = conversations.map(
      (conversation) => conversation.id
    );

    if (conversationIds) {
      var payload = { 'conversations': conversationIds }
      const { data, refresh, error, pending } = await useApi(`conversations/get-conversations-users?page=${page}`, {
        initialCache: false,
        body: payload,
        method: "POST",
      });

      if (data?.success) {
        let conversationsUsers = []
        data.users.forEach((user) => {
          conversations.forEach((conversation) => {
            if (conversation.participants.includes(user.firebase_uuid)) {
              conversationsUsers.push(
                {
                  user: user,
                  conversation: conversation
                }
              )
            }
          })
        })

        conversationStore.setUsersConversations(conversationsUsers)
        return conversationsUsers
      }
    }

  } catch (error) {
    console.error("Error fetching conversations:", error)
  }
};

export const getOrCreateConversation = async (id) => {
  const { data, refresh, error, pending } = await useApi(`conversations/get-conversation`, {
    initialCache: false,
    body: { 'type': 1, 'recipient_id': id },
    method: "POST",
  });
  if (data.success) {
    let messages = await getMessagesForConversation(data.data.id)
    return messages
  }
};

export const getMessagesForConversation = async (conversationId) => {
  const { $db } = useNuxtApp()
  try {
    const messagesCollectionRef = collection($db, "conversations", conversationId, "messages");
    const messagesQuery = query(messagesCollectionRef, orderBy("created_at", "asc"));
    const messagesSnapshot = await getDocs(messagesQuery);
    const messages = messagesSnapshot.docs.map(doc => doc.data());
    return messages
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};



