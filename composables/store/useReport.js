import { useApi } from "~/composables/useApi";

export const report = async (content, id, pyload) => {
  const { data, refresh, error, pending } = await useApi(`${content}/${id}/report`, {
    initialCache: false,
    body: pyload,
    method: "POST",
  });
  return data
};