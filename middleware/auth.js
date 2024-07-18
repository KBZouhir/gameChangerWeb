import { useAuthStore } from "~/stores/authStore";
import { useUser } from "~/composables/store/useApiAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  await useUser();
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn) {
    return navigateTo("/auth/login");
  }
  var user = authStore.getAuthUser;
  if (!user.is_email_verified && !user.is_phone_verified) {
    if (!user.is_email_verified && user.email) {
      return navigateTo("/auth/validation");
    }

    if (!user.is_phone_verified && user.phone) {
      // resend phone verification
      return navigateTo("/auth/validation");
    }
  }
  if (!user.is_completed && (user.is_email_verified || user.is_phone_verified)) {
    if (to.path != "/auth/complete-profile") {
      abortNavigation();
      return navigateTo("/auth/complete-profile");
    }
  }
});