import { defineStore } from 'pinia';

export const useInterestsStore = defineStore('interestsStore', {
  state: () => ({
    interests: [],
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
