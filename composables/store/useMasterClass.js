import { useApi } from "~/composables/useApi";
import { useMasterClassStore } from '~/stores/masterclass'
export const createMasterClass = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`masterclasses`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });
};

export const listMasterClass = async () => {
  const store = useMasterClassStore()
  const { data, refresh, error, pending } = await useApi(`masterclasses`, {
    initialCache: false,
    method: "GET",
  });
  store.setMasterClassList(data)
  console.log(data);
  
};

export const showMasterClass = async (id) => {
  const { data, refresh, error, pending } = await useApi(
    `masterclasses/${id}`,
    {
      initialCache: false,
      method: "GET",
    }
  );
};

export const subscribeMasterClass = async (id) => {
  const { data, refresh, error, pending } = await useApi(
    `masterclasses/${id}/subscribe`,
    {
      initialCache: false,
      method: "GET",
    }
  );
};

export const guestSubscribeMasterClass = async (id, payload) => {
  const { data, refresh, error, pending } = await useApi(
    `masterclasses/${id}/subscribe/guest`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );
};

export const getInformationsByEmail = async (id) => {
  const { data, refresh, error, pending } = await useApi(
    `masterclasses/${id}/get-informations-by-email`,
    {
      initialCache: false,
      method: "GET",
    }
  );
};
