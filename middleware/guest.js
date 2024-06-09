export default defineNuxtRouteMiddleware((to) => {
    const token = useCookie("user_access_token");
  
      console.log(token.value);
  if (token.value) {
      return navigateTo("/dashboard");
    }
  });
  