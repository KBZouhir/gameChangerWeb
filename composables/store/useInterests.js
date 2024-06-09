import { useApi } from "~/composables/useApi";
import { useInterestsStore } from "~/stores/interests";

const isLoading = ref(false);

const apiGetInterests = async () => {
  const store = useInterestsStore();
  isLoading.value = true;
  const { data, refresh, error, pending } = await useApi(`/interests?per_page=0`, {
    initialCache: false,
    method: "GET",
  });

  isLoading.value = false;
console.log(data);
  store.setInterests(data.data)

};

export {
  apiGetInterests,
    isLoading,
};
