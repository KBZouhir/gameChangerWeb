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
      this.usersConversations = conversations.sort((a, b) => {
        const aSeconds = a.conversation.last_message.created_at.seconds;
        const aNanoseconds = a.conversation.last_message.created_at.nanoseconds;
        const bSeconds = b.conversation.last_message.created_at.seconds;
        const bNanoseconds = b.conversation.last_message.created_at.nanoseconds;

        if (aSeconds !== bSeconds) {
          return bSeconds - aSeconds
        } else {
          return bNanoseconds - aNanoseconds
        }
      })
    },
    syncUsersConversations(conversations) {
      const combinedConversations = [...this.usersConversations,...conversations]
      
      this.usersConversations = combinedConversations.sort((a, b) => {
        const aSeconds = a.conversation.last_message.created_at.seconds;
        const aNanoseconds = a.conversation.last_message.created_at.nanoseconds;
        const bSeconds = b.conversation.last_message.created_at.seconds;
        const bNanoseconds = b.conversation.last_message.created_at.nanoseconds;

        if (aSeconds !== bSeconds) {
          return bSeconds - aSeconds
        } else {
          return bNanoseconds - aNanoseconds
        }
      })
    },
    clearUsersConversations() {
      console.log("clear  this.usersConversations ");
      
      this.usersConversations  = []
    }
  },
});
