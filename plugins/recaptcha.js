import { VueReCaptcha } from "vue-recaptcha-v3";
export default defineNuxtPlugin((nuxtApp) => {
  const { recaptchaSiteKey } = useRuntimeConfig().public;
    
  const options = {
    siteKey: recaptchaSiteKey,
    loaderOptions: {
      autoHideBadge: true,
      useRecaptchaNet: true,
      useEnterprise: true,
      renderParameters: {
        hl: "fr",
        renderParameters: 'recaptcha-conatier'
      },
    },
  };
  nuxtApp.vueApp.use(VueReCaptcha, options);
});
