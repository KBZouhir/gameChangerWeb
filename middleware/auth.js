

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("user_access_token");

//   if (token.value) {
//     authenticated.value = true;
//   }

//   if (token.value && to?.name === "/auth/login") {
//     return navigateTo("/");
//   }

//   if (!token.value && to?.name !== "/auth/login") {
//     abortNavigation();
//     return navigateTo("/auth/login");
//   }
});
