import { useApi } from "~/composables/useApi";
import { successAlert, errorAlert } from "~/composables/useAlert";
import { useAuthStore } from "~/stores/authStore";
import { useUser } from "~/composables/store/useApiAuth";

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

  if (data?.success) {
    successAlert(data.message);
    authStore.syncAuthUser(data.user);
  }

  return { data, error, refresh, pending };
};

export const updateInterests = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`/profile`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  if (data?.success) {
    return {
      success: true,
      data: data,
    };
  } else {
    return {
      success: false,
      data: error,
    };
  }
};

export const updateDomains = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`/profile`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  if (data?.success) {
    return {
      success: true,
      data: data,
    };
  } else {
    return {
      success: false,
      data: error,
    };
  }
};

export const getProfile = async (id) => {
  const authStore = useAuthStore();
  const { data, refresh, error, pending } = await useApi(`/profile/${id}`, {
    initialCache: false,
    method: "GET",
  });

  return data;
};

export const toggleFollow = async (id) => {
  const authStore = useAuthStore();
  const { data, refresh, error, pending } = await useApi(
    `profile/${id}/follow`,
    {
      initialCache: false,
      method: "POST",
    }
  );

  return data;
};

export const updateCoverPage = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`profile`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  return data;
};

export const updateProfilePicture = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`profile`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  return data;
};

export const updateSettings = async (payload) => {
  const authStore = useAuthStore();
  const { data, refresh, error, pending } = await useApi(`profile/settings`, {
    initialCache: false,
    body: payload,
    method: "PUT",
  });

  if (data) {
    await useUser();
    return {
      success: true,
      data: data,
    };
  } else {
    return {
      success: false,
      data: error,
    };
  }
};
