import axios from "axios"
import { useAuthStore } from '~/stores/auth'

const apiUrl = import.meta.env.API_BASE_URL;

const client = axios.create({ baseURL: apiUrl });
client.defaults.headers.common["Content-Type"] = "application/json";

export function useApi() {
    const axiosFunc = async () => {
        const store = useAuthStore();
        console.log(store.token);
        if (store.token) {
            const auth = `Bearer ${store.token}`;
            client.defaults.headers.post['Content-Type']    = 'multipart/form-data';
            client.defaults.headers.common["Authorization"] = auth;
        }

        return client;
    };

    return { axios: axiosFunc };
}

export const abstractApi = (apiUrl, name) => {
    return () => {
        const { axios } = useApi();
        const url = apiUrl;

        const api = {
            all: async (filters = "") => {
                return (await axios()).get(url + filters);
            },

            one: async (id) => {
                return (await axios()).get(url + "/" + id);
            },

            post: async (data) => {
                return (await axios()).post(url, data);
            },

            patch: async (id, data) => {
                return (await axios()).patch(url + "/" + id, data);
            },

            put: async (id, data) => {
                return (await axios()).put(url + "/" + id, data);
            },

            delete: async (id) => {
                return (await axios()).delete(url + "/" + id);
            },

            raw: async () => {
                return await axios();
            },

            getApiUrl: () => {
                return url;
            },
        };

        return { [name]: api };
    };
};
