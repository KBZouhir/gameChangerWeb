import { useApi } from "~/composables/useApi";


export const uploadVideo = async (pyload) => {
  const { data, refresh, error, pending } = await useApi(`/upload-file`, {
    initialCache: false,
    body: pyload,
    method: "POST",
  });

 return data
};
