import { useApi } from "~/composables/useApi";
import { successAlert, errorAlert } from "~/composables/useAlert";
import { useAuthStore } from "~/stores/authStore";

const updateGeneral = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`/profile`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  console.log(data);
  
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
