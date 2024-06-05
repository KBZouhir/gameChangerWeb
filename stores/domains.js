import { defineStore } from 'pinia';

export const useDomainsStore = defineStore('domainsStore', {
  state: () => ({
    domains: null,
  }),
  getters: {
    getDomains: (state) => state.domains,
  },
  actions: {
    ayscDomains(domains) {
      this.domains = domains;
    }
  },
});
