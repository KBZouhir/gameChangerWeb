import { useApi } from "~/composables/useApi";
import { useBusinessSectorsStore } from "~/stores/business-sectors";

const isLoading = ref(false);

const apiGetBusinessSectors = async () => {
  const store = useBusinessSectorsStore();
  isLoading.value = true;
  const { data, refresh, error, pending } = await useApi(`/business-sectors?per_page=0`, {
    initialCache: false,
    method: "GET",
  });

  isLoading.value = false;

  return { data, error, refresh, pending };
};

export {
  apiGetBusinessSectors,
    isLoading,
};
