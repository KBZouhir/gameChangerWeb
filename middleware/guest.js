import { useAuthStore } from "~/stores/authStore";
import { useUser } from "~/composables/store/useApiAuth";
export default defineNuxtRouteMiddleware(async(to) => {
    await useUser();
    const authStore = useAuthStore();
    if (authStore.isLoggedIn) {
        return navigateTo("/");
    }
});
