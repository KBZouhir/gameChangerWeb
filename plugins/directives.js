import { defineNuxtPlugin } from '#app';
import PriceDirective from '../directives/price';
import onlyPositiveNumber from '../directives/onlyPositiveNumber';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('price', PriceDirective);
  nuxtApp.vueApp.directive('only-positive-number', onlyPositiveNumber);
});