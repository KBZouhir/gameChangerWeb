import { defineStore } from "pinia";

export const useSettings = defineStore("settings", {
  state: () => ({
    settings: null,
  }),
  getters: {
    getSettings: (state) => state.settings,
  },
  actions: {
    setSettings(settings) {
      this.settings = settings;
    },
  },
});
