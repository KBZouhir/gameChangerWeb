import { useApi } from "~/composables/useApi";
import { useDomainsStore } from "~/stores/domains";

const isLoading = ref(false);

const apiGetDomains = async () => {
  const store = useDomainsStore();
  isLoading.value = true;
  const { data, refresh, error, pending } = await useApi(`/domains?per_page=0`, {
    initialCache: false,
    method: "GET",
  });

  isLoading.value = false;

  return { data, error, refresh, pending };
};

const apiGetDomainBySector = async (query = null) => {
  const store = useDomainsStore();
  isLoading.value = true;
  const urlParams = new URLSearchParams(query).toString();
  const { data, refresh, error, pending } = await useApi(`/domains?per_page=0&${urlParams}`, {
    initialCache: false,
    method: "GET",
  });

  isLoading.value = false;

  return { data, error, refresh, pending };
};

export {
    apiGetDomains,
    apiGetDomainBySector,
    isLoading,
};
