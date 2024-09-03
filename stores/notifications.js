import { defineStore } from 'pinia';

export const useNotificationsStore = defineStore('interestsStore', {
  state: () => ({
    notifications: [],
    count: 0,
  }),
  getters: {
    getNotifications: (state) => state.notifications,
    unreadNotificationsCount: (state) => state.count,
  },
  actions: {
    setNotifications(notifications) {
      this.notifications = notifications;
    },
    minsCount() {
      this.count--
    },
    updateCount() {
      this.count++;
    },
    resetCount() {
      this.count = 0;
    },
    setCount(value) {
        this.count = value;
    },
  },
});
