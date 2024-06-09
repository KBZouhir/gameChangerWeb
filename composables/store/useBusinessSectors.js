import { useApi } from "~/composables/useApi";
import { useBusinessSectorsStore } from "~/stores/business-sectors";


export const apiGetBusinessSectors = async () => {
  const store = useBusinessSectorsStore();
  const { data, refresh, error, pending } = await useApi(`/business-sectors?per_page=0`, {
    initialCache: false,
    method: "GET",
  });


 store.setBusinessSectors(data.data);
};


