import { useApi } from "~/composables/useApi";
import { usePostStore } from "~/stores/posts";

const index = async () => {
  let store = usePostStore();
  const { data, refresh, error, pending } = await useApi(`/posts`, {
    initialCache: false,
    method: "GET",
  });
  if (data) {
    store.setPosts(data.data)
  }
};

const create = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`/posts`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  console.log(data);
};

const toogleReaction = async (id, payload) => {
  const { data, refresh, error, pending } = await useApi(`/posts/${id}/react`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  return data
};

export { index, create, toogleReaction };
