import { defineStore } from 'pinia';

export const useInterestsStore = defineStore('interestsStore', {
  state: () => ({
    interests: null,
  }),
  getters: {
    getInterests: (state) => state.interests,
  },
  actions: {
    setInterests(interests) {
      this.interests = interests;
    }
  },
});
