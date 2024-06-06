import { useApi } from "~/composables/useApi";
import { successAlert } from "~/composables/useAlert";

const isLoading = ref(false);

const register = async (payload) => {
  isLoading.value = true;
  let cleanData = { ...payload };
  if (!payload.email || payload.email === "0") {
    const { email, ...rest } = payload;
    cleanData = rest;
  }
  const { data, refresh, error, pending } = await useApi(`/register`, {
    initialCache: false,
    body: cleanData,
    method: "POST",
  });

  isLoading.value = false;
  if (data) {
    successAlert(data.message);
    const userTokenCookie = useCookie("user_access_token");
    const currentUserCookie = useCookie("current_user");
    userTokenCookie.value = data.token;
    currentUserCookie.value = data.user;
  }
  return { data, error, refresh, pending };
};

const validationMail = async (payload) => {
  isLoading.value = true;
  const { data, refresh, error, pending } = await useApi(`/email/verify`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  isLoading.value = false;
  if (data) {
    successAlert(data.message);
    //store.setSeason(data.season);
  }
  return { data, error, refresh, pending };
};

const sendOtp = async (payload) => {
  isLoading.value = true;
  const { data, refresh, error, pending } = await useApi(
    "https://identitytoolkit.googleapis.com/v1/accounts:sendVerificationCode?key=AIzaSyDT5goQg7ja2wF5VIyMR5ywgzEc_qUtacg",
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );

  isLoading.value = false;
  console.log(data);
  return { data, error, refresh, pending };
};

const ResendValidationMail = async () => {
  isLoading.value = true;
  const { data, refresh, error, pending } = await useApi(`/email/resend`, {
    initialCache: false,
    method: "POST",
  });

  isLoading.value = false;
  if (data) {
    successAlert(data.message);
  }
  return { data, error, refresh, pending };
};

const login = async (payload) => {
  isLoading.value = true;
  let cleanData = { ...payload };
  if (!payload.email || payload.email === "0") {
    const { email, ...rest } = payload;
    cleanData = rest;
  }

  if (payload.phone == "") {
    const { phone, ...rest } = payload;
    cleanData = rest;
  }
  const { data, refresh, error, pending } = await useApi(`/login`, {
    initialCache: false,
    body: cleanData,
    method: "POST",
  });

  isLoading.value = false;
  if (data) {
    successAlert(data.message);
    const userTokenCookie = useCookie("user_access_token");
    const currentUserCookie = useCookie("current_user");
    userTokenCookie.value = data.token;
    currentUserCookie.value = data.user;
  }
  return { data, error, refresh, pending };
};

const forgotPassword = async (payload) => {
  isLoading.value = true;
  const { data, refresh, error, pending } = await useApi(`/forgot-password`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  isLoading.value = false;

  return { data, error, refresh, pending };
};

const resetPassword = async (payload) => {
  isLoading.value = true;
  const { data, refresh, error, pending } = await useApi(`/password/reset`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  isLoading.value = false;

  return { data, error, refresh, pending };
};

const logout = async () => {
  const { data, refresh, error, pending } = await useApi(`/logout`, {
    initialCache: false,
    method: "POST",
  });
  if (data.success) {
    //authStore.syncAuthUser(null);
    const cookie = useCookie("user_access_token");
    cookie.value = null;
  }
  await navigateTo('/auth/login')
};

export {
  register,
  validationMail,
  sendOtp,
  ResendValidationMail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  isLoading,
};
