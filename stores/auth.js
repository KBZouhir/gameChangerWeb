import { defineStore } from "pinia";
import { useAuthApi } from "~/composables/useAuth";

const { authApi } = useAuthApi();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),
  actions: {
    async register(userData) {
      this.loading = true;
      this.error = null;
      let cleanData = { ...userData };
      if (!userData.email || userData.email === "0") {
        const { email, ...rest } = userData;
        cleanData = rest;
      }
      const axiosInstance = await authApi.raw();
      try {
        const response = await axiosInstance.post(`https://gc-dev.informatikab.com/api/v1/register`,cleanData).finally(()=> {this.loading = false;});
        if (response.status == 200) {
          this.token = response.data.token;
          this.user = response.data.user;
          return {
            success: true,
            data: response
          };
        }
      } catch (e) {
        return {
          success: false,
          data: e
        };
      }
    },

    async validationMail(userData) {
      this.loading = true;
      this.error = null;
      const axiosInstance = await authApi.raw();
      try {
        const response = await axiosInstance.post(`https://gc-dev.informatikab.com/api/v1/email/verify`,userData).finally(()=> {this.loading = false;});
        if (response.status == 200) {
          return {
            success: true,
            data: response
          };
        }
      } catch (e) {
        return {
          success: false,
          data: e
        };
      }
    },

    async resendValidationLink() {
      this.loading = true;
      this.error = null;
      const axiosInstance = await authApi.raw();
      try {
        const response = await axiosInstance.post(`https://gc-dev.informatikab.com/api/v1/email/resend`).finally(()=> {this.loading = false;});
        if (response.status == 200) {
          return {
            success: true,
            data: response
          };
        }
      } catch (e) {
        return {
          success: false,
          data: e
        };
      }
    },


    async sendResetPasswordLink(userData) {
      this.loading = true;
      this.error = null;
      const axiosInstance = await authApi.raw();
      try {
        const response = await axiosInstance.post(`https://gc-dev.informatikab.com/api/v1/forgot-password`, userData).finally(()=> {this.loading = false;});
        if (response.status == 200) {
          return {
            success: true,
            data: response
          };
        }
      } catch (e) {
        return {
          success: false,
          data: e
        };
      }
    },

    async login(userData) {
      this.loading = true;
      this.error = null;
      const axiosInstance = await authApi.raw();
      let cleanData = { ...userData };
      if (!userData.email || userData.email === "0") {
        const { email, ...rest } = userData;
        cleanData = rest;
      }
      try {
        const response = await axiosInstance.post(`https://gc-dev.informatikab.com/api/v1/login`,cleanData).finally(()=> {this.loading = false;});
        if (response.status == 200) {
          this.token = response.data.token;
          this.user = response.data.user;
          return {
            success: true,
            data: response
          };
        }
      } catch (e) {
        return {
          success: false,
          data: e
        };
      }

      
    },

    logout() {
      this.user = null;
      this.token = null;
    },
  },
});
