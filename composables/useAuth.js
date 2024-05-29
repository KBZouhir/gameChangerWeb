import { abstractApi } from "~/composables/useApi";

export const useAuthApi =
    abstractApi("/auth", "authApi");


