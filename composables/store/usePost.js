import { useApi } from "~/composables/useApi";
import { successAlert, errorAlert } from "~/composables/useAlert";
import { useAuthStore } from "~/stores/authStore";

const getPosts = async (payload) => {
  let cleanData = { ...payload };
  if (!payload.email || payload.email === "0") {
    const { email, ...rest } = payload;
    cleanData = rest;
  }
  const { data, refresh, error, pending } = await useApi(`/profile`, {
    initialCache: false,
    body: cleanData,
    method: "POST",
  });

  if (data) {
    successAlert(data.message);
    const userTokenCookie = useCookie("user_access_token");
    // const currentUserCookie = useCookie("current_user");
    userTokenCookie.value = data.token;
    // currentUserCookie.value = data.user;
  }
  return { data, error, refresh, pending };
};

const 


export {
  updatePassword,
  updateGeneral,
};
