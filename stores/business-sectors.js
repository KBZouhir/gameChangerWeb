import { defineStore } from 'pinia';

export const useBusinessSectorsStore = defineStore('BusinessSectorsStore', {
  state: () => ({
    businessSectors: null,
  }),
  getters: {
    getDomains: (state) => state.businessSectors,
  },
  actions: {
    ayscDomains(businessSectors) {
      this.businessSectors = businessSectors;
    }
  },
});
