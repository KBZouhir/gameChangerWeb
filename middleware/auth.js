import { useAuthStore } from "~/stores/authStore";
import { useUser } from "~/composables/store/useApiAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  await useUser();
  if (!authStore.isLoggedIn) {
    return navigateTo("/auth/login");
  }
  var user = authStore.getAuthUser;

  console.log('auth middleware', user);
  
  if (!user.is_email_verified && !user.is_phone_verified && user.role.id != 3) {
    if (to.path != "/auth/validation") {
      return navigateTo("/auth/validation");
    }
  }

  if(to.path == "/auth/validation" && (user.is_email_verified || user.is_phone_verified)){
    return navigateTo("/")
  }

  // if (
  //   !user.is_completed &&
  //   (user.is_email_verified || user.is_phone_verified)
  // ) {
  //   if (to.path != "/auth/complete-profile") {
  //     abortNavigation();
  //     return navigateTo("/auth/complete-profile");
  //   }
  // }
});
