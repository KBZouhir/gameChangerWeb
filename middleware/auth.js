

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("user_access_token");
  const user = useCookie("current_user");

  
  if (!token.value) {
    abortNavigation();
    return navigateTo("/auth/login");
  }

  if(!user.value.is_email_verified && !user.value.is_phone_verified){

    if(!user.value.is_email_verified && user.value.email){
      // resend mail verification 
      
    }

    if(!user.value.is_phone_verified && user.value.phone){
      // resend phone verification
   }
  }

  if (!user.value.is_completed && (user.value.is_email_verified || user.value.is_phone_verified)) {
    if(to.path != '/auth/complete-profile'){
      abortNavigation();
      return navigateTo("/auth/complete-profile");
    }
  }
});
