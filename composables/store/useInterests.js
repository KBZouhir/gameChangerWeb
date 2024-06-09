import { useApi } from "~/composables/useApi";
import { useInterestsStore } from "~/stores/interests";

export const apiGetInterests = async () => {
  const store = useInterestsStore();
  const { data, refresh, error, pending } = await useApi(`/interests?per_page=0`, {
    initialCache: false,
    method: "GET",
  });

  store.setInterests(data.data)

};

