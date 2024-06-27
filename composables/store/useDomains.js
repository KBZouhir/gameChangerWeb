import { useApi } from "~/composables/useApi";
import { useDomainsStore } from "~/stores/domains";


export const apiGetDomains = async () => {
  const store = useDomainsStore();
  const { data, refresh, error, pending } = await useApi(`/domains?per_page=0`, {
    initialCache: false,
    method: "GET",
  });
  store.setDomains(data.data)
};

export const apiGetDomainBySector = async (query = null) => {
  const store = useDomainsStore();
  const urlParams = new URLSearchParams(query).toString();
  const { data, refresh, error, pending } = await useApi(`/domains?per_page=0&${urlParams}`, {
    initialCache: false,
    method: "GET",
  });
  store.setDomains(data.data);
};

