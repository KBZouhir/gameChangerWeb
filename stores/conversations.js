import { defineStore } from "pinia";

export const useConversationStore = defineStore("ConversationStore", {
  state: () => ({
    usersConversations: [],
  }),
  getters: {
    getUsersConversations: (state) => state.usersConversations,
  },
  actions: {
    setUsersConversations(conversations) {
      const combinedConversations = [
        ...this.usersConversations,
        ...conversations,
      ];
      const uniqueConversations = Array.from(
        new Set(combinedConversations.map((conversation) => conversation.user.id))
      ).map((id) =>
        combinedConversations.find((conversation) => conversation.user.id === id)
      );
      
      this.usersConversations = uniqueConversations.sort((a, b) => {
        const aSeconds = a.conversation.last_message.created_at.seconds;
        const aNanoseconds = a.conversation.last_message.created_at.nanoseconds;
        const bSeconds = b.conversation.last_message.created_at.seconds;
        const bNanoseconds = b.conversation.last_message.created_at.nanoseconds;

        if (aSeconds !== bSeconds) {
          return bSeconds - aSeconds
        } else {
          return bNanoseconds - aNanoseconds
        }
      });
    },
  },
});
