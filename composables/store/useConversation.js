import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore"
import { useAuthStore } from "~/stores/authStore"
import { useConversationStore } from '~/stores/conversations'

export const getConversations = async (page = 1) => {
  const { $db } = useNuxtApp()
  const authStore = useAuthStore()
  const conversationStore = useConversationStore()
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

    if(conversationIds){
      var payload = { 'conversations' : conversationIds}
      const { data, refresh, error, pending } = await useApi(`conversations/get-conversations-users?page=${page}`, {
        initialCache: false,
        body: payload,
        method: "POST",
      });

      if(data?.success){
        let conversationsUsers = []
        data.users.forEach((user)=> {
          conversations.forEach((conversation) => {
            if(conversation.participants.includes(user.firebase_uuid)){
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


// export const getConversation = async (conversationId) => {
//   const { $db } = useNuxtApp();
//   console.log(conversationId);
//   try {
//     const conversationDocRef = doc($db, 'conversations', conversationId);
//     const conversationSnapshot = await getDoc(conversationDocRef);

//     if (conversationSnapshot.exists()) {

//       const messagesCollection = collection(conversationDocRef, 'messages');
//       const lastMessageQuery = query(messagesCollection, orderBy('timestamp', 'desc'), limitToLast(1));
//       const lastMessageSnapshot = await getDocs(lastMessageQuery);


//     }else{
//       console.log('Conversation not found.');
//       return null;
//     }

//   }catch (error) {
//     console.error('Error fetching conversation details:', error);
//     return null;
//   }
// };


