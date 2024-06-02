import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, 
    { 
        autoClose: 1000,
        position: toast.POSITION.BOTTOM_CENTER,
        closeButton: false
    }
);

  return {
    provide: {
      toast,
    },
  };
});
