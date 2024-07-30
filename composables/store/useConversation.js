import { useConversationStore } from "~/stores/conversations";
import { collection, getDocs, query, where, doc, getDoc, orderBy, onSnapshot  } from "firebase/firestore"
export const getConversations = async (conversationIds, conversations, append) => {
  const conversationStore = useConversationStore()

  var payload = { conversations: conversationIds};
  const { data, refresh, error, pending } = await useApi(`conversations/get-conversations-users`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );

  if (data?.success) {
    let conversationsUsers = []
    data.users.forEach((user) => {
      conversations.forEach((conversation) => {
        if (conversation.participants.includes(user.firebase_uuid)) {
          conversationsUsers.push({
            user: user,
            conversation: conversation,
          })
        }
      })
    })
    if(append){
      conversationStore.syncUsersConversations(conversationsUsers)
    }else{
      conversationStore.setUsersConversations(conversationsUsers)
    }
    
    return conversationsUsers;
  }
};

export const getOrCreateConversation = async (id) => {
  const { data, refresh, error, pending } = await useApi(
    `conversations/get-conversation`,
    {
      initialCache: false,
      body: { type: 1, recipient_id: id },
      method: "POST",
    }
  )
  if (data.success) {
    let messages = await getMessagesForConversation(data.data.id);
    return messages;
  }
}

export const getMessagesForConversation = async (conversationId) => {
  const { $db } = useNuxtApp();
  try {
    const messagesCollectionRef = collection(
      $db,
      "conversations",
      conversationId,
      "messages"
    );
    const messagesQuery = query(
      messagesCollectionRef,
      orderBy("created_at", "asc")
    );
    const messagesSnapshot = await getDocs(messagesQuery);
    const messages = messagesSnapshot.docs.map((doc) => doc.data());

    const groupedMessages = messages.reduce((groups, message) => {
      const date = new Date(message.created_at.seconds * 1000)
        .toISOString()
        .split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});

    return groupedMessages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return {};
  }
};
