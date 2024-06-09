import { defineStore } from 'pinia';

export const useDomainsStore = defineStore('domainsStore', {
  state: () => ({
    domains: [],
  }),
  getters: {
    getDomains: (state) => state.domains,
  },
  actions: {
    setDomains(domains) {
      this.domains = domains;
    }
  },
});
