import { defineStore } from 'pinia';

export const useBusinessSectorsStore = defineStore("BusinessSectorsStore", {
  state: () => ({
    businessSectors: [],
  }),
  getters: {
    getBusinessSectors: (state) => state.businessSectors,
  },
  actions: {
    setBusinessSectors(businessSectors) {
      this.businessSectors = businessSectors;
    },
  },
});
