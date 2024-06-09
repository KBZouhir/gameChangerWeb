import { defineStore } from "pinia";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    user: null,
    loginState: false,
  }),
  getters: {
    getAuthUser: (state) => state.user,
    isLoggedIn: (state) => state.loginState,
  },
  actions: {
    syncAuthUser(user = null) {
      this.user = user;
      if (this.user) {
        this.loginState = true;
        return;
      }
      this.loginState = false;
    },
    syncLoginState(state) {
      if (typeof state == "boolean") {
        this.isLoggedIn = state;
        return;
      }

      this.loginState = false;
    },
  },
});
