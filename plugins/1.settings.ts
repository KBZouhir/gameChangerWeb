import { useApi } from "~/composables/useApi";
import { useSettings } from "~/stores/settings";
import { useUser } from "~/composables/store/useApiAuth";

export default defineNuxtPlugin(async ({ vueApp }) => {
  const store = useSettings();
  await store.syncSetting();
  const key = `me-${(Math.random() + 1).toString(36).substring(7)}`;
  console.log(key, "tetsetset");

  await useUser(key);
  return {
    provide: {
      settings: (key = "") => {
        if (!key) return store.getSettings;
        return store.getSettings[`${key}`];
      },
    },
  };
});
