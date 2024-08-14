import { defineStore } from 'pinia';

export const useNotificationsStore = defineStore('interestsStore', {
  state: () => ({
    notifications: [],
  }),
  getters: {
    getNotifications: (state) => state.notifications,
  },
  actions: {
    setNotifications(notifications) {
      this.notifications = notifications;
    }
  },
});
