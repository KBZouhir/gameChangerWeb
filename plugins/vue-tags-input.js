import VueTagsInput from '@sipec/vue3-tags-input';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VueTagsInput', VueTagsInput);
});