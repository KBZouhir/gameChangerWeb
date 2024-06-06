export default defineNuxtRouteMiddleware((to) => {
    const token = useCookie("user_access_token");
  
    if (token.value) {
      return navigateTo("/dashboard");
    }
  });
  