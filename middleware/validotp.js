import { useAuthStore } from "~/stores/authStore";
import { useUser } from "~/composables/store/useApiAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  await useUser();
  const authStore = useAuthStore();
  var user = authStore.getAuthUser;

  if (!authStore.isLoggedIn) {
    return navigateTo("/auth/login");
  }

  if(user?.is_email_verified || user?.is_phone_verified){
    return navigateTo("/");
  }
});