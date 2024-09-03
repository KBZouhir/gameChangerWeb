import { useApi } from "~/composables/useApi";
import { useAuthStore } from "~/stores/authStore";
import { useSettings } from "~/stores/settings";
import { excludeKeys } from "~/utils/excludeKeys";

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
    const userTokenCookie = useCookie("user_access_token");
    userTokenCookie.value = data.token;
  }
  return { data, error, refresh, pending };
};

const validationMail = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`/email/verify`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });
  await useUser();
  if (data) {
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

const sendOtp = async (payload) => {
  const { apiKey } = useRuntimeConfig().public;
  return await useApi(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendVerificationCode?key=${apiKey}`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );
};

const verifyOtp = async (payload) => {
  const { apiKey } = useRuntimeConfig().public;
  return await useApi(
    `https://identitytoolkit.googleapis.com/v1/accounts:verifyVerificationCode?key=${apiKey}`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );
};

const ResendValidationMail = async () => {
  const { data, refresh, error, pending } = await useApi(`/email/resend`, {
    initialCache: false,
    method: "POST",
  });

  if (data) {
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

const socialAuth = async (payload) => {
  const authStore = useAuthStore();
  const { data, refresh, error, pending } = await useApi(`/social-auth`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  if (data.success) {
    const userTokenCookie = useCookie("user_access_token");
    userTokenCookie.value = data.token;
    authStore.syncAuthUser(data.user);

    return data;
  }
};

const login = async (payload) => {
  const authStore = useAuthStore();
  const { $auth, $signInWithEmailAndPassword } = useNuxtApp();

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
    const { role } = data.user;

    if (role.id != 3 && payload.email != "0") {
      const { user } = await $signInWithEmailAndPassword(
        $auth,
        payload.email,
        payload.password
      );
    }
  }
  return { data, error, refresh, pending };
};

const loginWithGoogle = async () => {
  const { $auth, $GoogleAuthProvider, $signInWithPopup } = useNuxtApp();
  try {
    const provider = new $GoogleAuthProvider();
    const result = await $signInWithPopup($auth, provider);

    if (result.user) {
      const [firstName, lastName] = result.user.displayName.split(" ");

      const payload = {
        idToken: result.user.accessToken,
        first_name: firstName,
        last_name: lastName,
      };

      const response = await socialAuth(payload);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

const loginWithFacebook = async () => {
  const { $auth, $FacebookAuthProvider, $signInWithPopup } = useNuxtApp();
  try {
    const provider = new $FacebookAuthProvider();

    $signInWithPopup($auth, provider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        console.log(user, accessToken);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        console.log(errorCode, errorMessage, email, credential);
      });
  } catch (error) {
    console.log(error);
  }
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

const VerifyExistencePhone = async (payload) => {
  const { data, refresh, error, pending } = await useApi(
    `/forgot-password/phone/verify`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );

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

  if (data) {
    console.log(data);
    authStore.syncAuthUser(null);
    authStore.syncLoginState(false);
  }
};

async function useUser(key = "me") {
  const authStore = useAuthStore();
  const cookie = useCookie("user_access_token");
  const token = cookie.value;
  let user = authStore.getAuthUser;

  if (token && user == null) {
    const { data, error } = await useaSyncApi(`/me`, key, {
      initialCache: false,
    });
    if (error) {
      console.log(error);

      // const authCookie = useCookie("user_access_token");
      // authCookie.value = null;

      authStore.syncAuthUser(null);
    }

    if (data) {
      authStore.syncAuthUser(data.user);
    }
  }
  return user;
}

async function getSettings() {
  const settingStore = useSettings();
  const { data, error } = await useApi(`/settings`, {
    initialCache: false,
  });

  if (data?.success) {
    settingStore.setSettings(excludeKeys(data, ["success", "message"]));
  }
}

async function registerToken(payload) {
  const { data, error } = await useApi(`/register-token`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });
}

export {
  useUser,
  register,
  validationMail,
  sendOtp,
  verifyOtp,
  ResendValidationMail,
  login,
  loginWithGoogle,
  loginWithFacebook,
  logout,
  completeProfile,
  forgotPassword,
  resetPassword,
  VerifyExistencePhone,
  registerToken,
};
