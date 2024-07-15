import { defineStore } from 'pinia';

export const useSubscriptionsStore = defineStore('subscriptionsStore', {
  state: () => ({
    plans: [],
  }),
  getters: {
    getPlans: (state) => state.plans,
  },
  actions: {
    setPlans(plans) {
      this.plans = plans;
    }
  },
});
