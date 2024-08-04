import { defineNuxtPlugin } from '#app';
import PriceDirective from '../directives/price';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('price', PriceDirective);
});