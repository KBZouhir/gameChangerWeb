import { useApi } from "~/composables/useApi";
import { successAlert, errorAlert } from "~/composables/useAlert";
import { useAuthStore } from "~/stores/authStore";
import { useSettings } from "~/stores/settings";
import { excludeKeys } from '~/utils/excludeKeys'

const register = async (payload) => {
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

  if (data) {
    // successAlert(data.message);
    const userTokenCookie = useCookie("user_access_token");
    // const currentUserCookie = useCookie("current_user");
    userTokenCookie.value = data.token;
    // currentUserCookie.value = data.user;
  }
  return { data, error, refresh, pending };
};

const validationMail = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`/email/verify`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  if (data) {
    // successAlert(data.message);
    // store.setSeason(data.season);
  }
  return { data, error, refresh, pending };
};

const sendOtp = async (payload) => {
  return await useApi(
    "https://identitytoolkit.googleapis.com/v1/accounts:sendVerificationCode?key=AIzaSyDT5goQg7ja2wF5VIyMR5ywgzEc_qUtacg",
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );
};

const ResendValidationMail = async () => {
  return await useApi(`/email/resend`, {
    initialCache: false,
    method: "POST",
  });
};

const login = async (payload) => {
  const authStore = useAuthStore();

  
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

 
  if (data) {
    const userTokenCookie = useCookie("user_access_token");
    userTokenCookie.value = data.token;
    authStore.syncAuthUser(data.user);
  }
  return { data, error, refresh, pending };
};

const forgotPassword = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`/forgot-password`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  return { data, error, refresh, pending };
};

const resetPassword = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`/password/reset`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  return { data, error, refresh, pending };
};

const completeProfile = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`/complete-profile`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  return { data, error, refresh, pending };
};

const logout = async () => {
  const authStore = useAuthStore();
  const { data, refresh, error, pending } = await useApi(`/logout`, {
    initialCache: false,
    method: "POST",
  });
  if (data?.success) {
    authStore.syncAuthUser(null);
    authStore.syncLoginState(false);
    const cookie = useCookie("user_access_token");
    cookie.value = null;
  }
};

async function useUser() {
  const authStore = useAuthStore();
  const cookie = useCookie("user_access_token");
  const token = cookie.value;
  let user = authStore.getAuthUser;
  getSettings()
  if (token && user == null) {
    const key = `me-${(Math.random() + 1).toString(36).substring(7)}`;

    const { data, error } = await useApi(`/me`, {
      initialCache: false,
    });

    if (error) {
      authStore.syncAuthUser(null);
    }

    if (data) {
      authStore.syncAuthUser(data.user);
    }
  }
  // return user;
}


async function getSettings() {

  const settingStore = useSettings();
  const { data, error } = await useApi(`/settings`, {
    initialCache: false,
  });

  if(data.success){
    settingStore.setSettings(excludeKeys(data, ['success', 'message']))
  }
}


export {
  useUser,
  register,
  validationMail,
  sendOtp,
  ResendValidationMail,
  login,
  logout,
  completeProfile,
  forgotPassword,
  resetPassword,
};
