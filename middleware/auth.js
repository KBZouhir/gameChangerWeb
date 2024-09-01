import { useAuthStore } from "~/stores/authStore";
import { useUser } from "~/composables/store/useApiAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  await useUser();
  if (!authStore.isLoggedIn) {
    return navigateTo("/auth/login");
  }
  var user = authStore.getAuthUser;

  
  if (!user.is_email_verified && !user.is_phone_verified) {
    if (to.path != "/auth/validation") {
      return navigateTo("/auth/validation");
    }
  }
  if (
    !user.is_completed &&
    (user.is_email_verified || user.is_phone_verified)
  ) {
    if (to.path != "/auth/complete-profile") {
      abortNavigation();
      return navigateTo("/auth/complete-profile");
    }
  }
});
