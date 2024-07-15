import { useApi } from "~/composables/useApi";
import { useSubscriptionsStore } from "~/stores/subscriptions";


export const apiSubscription = async () => {
  const store = useSubscriptionsStore();
  const { data, refresh, error, pending } = await useApi(`/subscription-plans`, {
    initialCache: false,
    method: "GET",
  });

 store.setPlans(data.data);
};
