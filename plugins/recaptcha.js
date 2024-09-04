import { VueReCaptcha } from "vue-recaptcha-v3";
export default defineNuxtPlugin((nuxtApp) => {
  const { recaptchaSiteKey } = useRuntimeConfig().public;
    console.log(recaptchaSiteKey);
    
  const options = {
    siteKey: recaptchaSiteKey,
    loaderOptions: {
      autoHideBadge: false,
      useRecaptchaNet: true,
      useEnterprise: true,
      renderParameters: {
        hl: "id",
      },
    },
  };
  nuxtApp.vueApp.use(VueReCaptcha, options);
});
