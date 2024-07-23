import { collection, getDocs, query, where } from "firebase/firestore"
import { useAuthStore } from "~/stores/authStore"

export const getConversations = async () => {
  const { $db } = useNuxtApp()
  const authStore = useAuthStore()
  const user = authStore.getAuthUser

  try {
    const conversationsCollection = collection($db, "conversations")
    const q = query(conversationsCollection,where("participants", "array-contains", user.firebase_uuid))
    const querySnapshot = await getDocs(q);
    const conversations = [];

    querySnapshot.forEach((doc) => {
        conversations.push({ id: doc.id, ...doc.data() })
    });

    const conversationIds = conversations.map(
      (conversation) => conversation.id
    );

  } catch (error) {
    console.error("Error fetching conversations:", error)
  }
};

export const getMessagesFromConversation = async (conversation_id) => {
  const { $db } = useNuxtApp()
  try {
    const messagesCollection = collection(
      $db,
      `conversations/${conversation_id}/messages`
    );
    const messagesSnapshot = await getDocs(messagesCollection)
    const messages = messagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  } catch (error) {
    console.error("Error fetching conversations:", error)
  }
};
