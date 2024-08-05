import { defineStore } from 'pinia';

export const useServicesStore = defineStore('servicesStore', {
  state: () => ({
    services: [],
  }),
  getters: {
    getServices: (state) => state.services,
  },
  actions: {
    setServices(services) {
      this.services = services;
    }
  },
});
