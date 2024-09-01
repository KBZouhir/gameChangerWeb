import { useAuthStore } from "~/stores/authStore";
import { useUser } from "~/composables/store/useApiAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  await useUser();
  const authStore = useAuthStore();
  var user = authStore.getAuthUser;
  
  if(user.is_completed){
    return navigateTo("/");
  }
});