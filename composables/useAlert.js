export const successAlert = (message) => {
    useNuxtApp().$toast.success(message);
}

export const infoAlert = (message) => {
    useNuxtApp().$toast.info(message);
}

export const errorAlert = (message) => {
    useNuxtApp().$toast.error(message);
}

export const warningAlert = (message) => {
    useNuxtApp().$toast.warning(message);
}
