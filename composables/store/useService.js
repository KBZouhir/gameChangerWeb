import { useApi } from "~/composables/useApi";
import { useServicesStore } from "~/stores/services";

const getServices = async () => {
  let store = useServicesStore();
  const { data, refresh, error, pending } = await useApi(`/services`, {
    initialCache: false,
    method: "GET",
  });
  if (data) {
    store.setServices(data);
  }
};

const createService = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`/services`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  return data;
};

const getService = async (id) => {
  const data = await useApi(`/services/${id}`, {
    initialCache: false,
    method: "GET",
  });
  return data
};

export { getServices, createService, getService };
