import { useApi } from "~/composables/useApi";
import { successAlert, errorAlert } from "~/composables/useAlert";
import { useAuthStore } from "~/stores/authStore";

const updateGeneral = async (payload) => {
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


const updatePassword = async (payload) => {
  const authStore = useAuthStore();
  const { data, refresh, error, pending } = await useApi(`/update-password`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  if(data?.success){
    successAlert(data.message);
    authStore.syncAuthUser(data.user);
  }
  
  return { data, error, refresh, pending };
};


const getProfile = async (id) => {
  const authStore = useAuthStore();
  const { data, refresh, error, pending } = await useApi(`/profile/${id}`, {
    initialCache: false,
    method: "GET",
  });

  return data
};


export {
  updatePassword,
  updateGeneral,
  getProfile
};
