import { useApi } from "~/composables/useApi";

export const useSettings = defineStore("settingsStore", {
  state: () => ({
    settings: {},
  }),
  getters: {
    getSettings: (state) => state.settings,
  },
  actions: {
    async syncSetting() {
      this.loading = true;
      this.error = null;
      this.generateNewKey();

      const { data, error } = await useApi("/settings", {
        initialCache: true,
        key: this.cacheKey,
      });

      this.loading = false;
      if (error) {
        // localStorage.setItem('error',JSON.stringify(error))
        this.error = error;
        return;
      }
      this.settings = data;
    },
    generateNewKey() {
      const key = (Math.random() + 1).toString(36).substring(7);
      this.cacheKey = `global-settings-${key}`;
    },
    setSettings(settings) {
      this.settings = settings;
    },
  },
});
