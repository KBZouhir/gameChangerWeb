import { useApi } from "~/composables/useApi";
import { successAlert, errorAlert } from "~/composables/useAlert";
import { useAuthStore } from "~/stores/authStore";

export const updateGeneral = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`/profile`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  console.log(data);
  
};


export const updatePassword = async (payload) => {
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


export const getProfile = async (id) => {
  const authStore = useAuthStore();
  const { data, refresh, error, pending } = await useApi(`/profile/${id}`, {
    initialCache: false,
    method: "GET",
  });

  return data
};


export const toggleFollow = async (id) => {
  const authStore = useAuthStore();
  const { data, refresh, error, pending } = await useApi(`profile/${id}/follow`, {
    initialCache: false,
    method: "POST",
  });

  return data
};