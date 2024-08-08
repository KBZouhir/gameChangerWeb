import { useApi } from "~/composables/useApi";

export const storeOpeningHours = async (payload) => {
    const { data, refresh, error, pending } = await useApi(`appointments/opening-hours`, {
      initialCache: false,
      body: payload,
      method: "POST",
    });

    console.log(data)
};

export const getUserOpeningHours = async (id) => {
  const { data, refresh, error, pending } = await useApi(
    `appointments/opening-hours/get-user-availabilities/${id}`,
    {
      initialCache: false,
      method: "GET",
    }
  );
  return data

};
