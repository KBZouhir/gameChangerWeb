import en from "./locales/en.json";
import fr from "./locales/fr.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "fr",
  locales: [
    { code: "en", iso: "en-US", file: "./locales/en.json", dir: "ltr" },
    { code: "fr", iso: "fr-FR", file: "./locales/fr.json" },
  ],
  messages: {
    en,
    fr,
  },
}));
