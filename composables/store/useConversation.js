import { useConversationStore } from "~/stores/conversations";
import { useAuthStore } from "~/stores/authStore";

export const getConversations = async (
  conversationIds,
  conversations,
  append
) => {
  const conversationStore = useConversationStore();
  const authStore = useAuthStore();

  var payload = { conversations: conversationIds };
  const { data, refresh, error, pending } = await useApi(
    `conversations/get-conversations-data`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );

  if (data?.success) {
    
    let conversationsUsers = [];

    data.conversations?.forEach((user) => {
      conversations.forEach((conversation) => {
        if (conversation.id == user.id) {
          conversationsUsers.push({
            user:
              user.participants[0].firebase_uuid ==
              authStore.getAuthUser.firebase_uuid
                ? user.participants[1]
                : user.participants[0],
            conversation: conversation,
            conversationable: user.conversationable,
          });
        }
      });
    });
    if (append) {
      conversationStore.syncUsersConversations(conversationsUsers);
    } else {
      conversationStore.setUsersConversations(conversationsUsers);
    }

    return conversationsUsers;
  }
};

export const getOrCreateConversation = async (id, type) => {
  const { data, refresh, error, pending } = await useApi(
    `conversations/get-conversation`,
    {
      initialCache: false,
      body:
        type == 1
          ? { type: type, recipient_id: id }
          : { type: type, conversationable_id: id },
      method: "POST",
    }
  );
  if (data?.success) {
    return data.data;
  }
};

export const sendAttachements = async (conversationId, payload) => {
  const { data, refresh, error, pending } = await useApi(`conversations/${conversationId}/send-attachements`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );
  if (data?.success) {
    return data.data;
  }
};

