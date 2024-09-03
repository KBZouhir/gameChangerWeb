import { defineStore } from "pinia";

export const useUserStore = defineStore("UsersStore", {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    setUsers(users) {
      this.users = users;
    },
  },
});
