import { useApi } from "~/composables/useApi";


const get = async (url) => {
  const { data, refresh, error, pending } = await useApi(`${url}`, {
    initialCache: false,
    method: "GET",
  });

  console.log(data);
};

export { get };
