import { useApi } from "~/composables/useApi";
import { usePostStore } from "~/stores/posts";

const index = async () => {
  let store = usePostStore();
  const { data, refresh, error, pending } = await useApi(`/posts`, {
    initialCache: false,
    method: "GET",
  });
  if (data) {
    store.setPosts(data)
  }
};

const create = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`/posts`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });
  await index()
  return data
};

const update = async (id,payload) => {
  const { data, refresh, error, pending } = await useApi(`/posts/${id}`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });
  await index()
  return data
};

const deletePost = async (id) => {
  const { data, refresh, error, pending } = await useApi(`/posts/${id}`, {
    initialCache: false,
    method: "DELETE",
  });
  await index()
  return data
};

const toogleReaction = async (id, payload) => {
  const { data, refresh, error, pending } = await useApi(`/posts/${id}/react`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  return data
};


const getReactions = async (id) => {
  const { data, refresh, error, pending } = await useApi(`/posts/${id}/reactions`, {
    initialCache: false,
    method: "GET",
  });

  return data
};


const createComment = async (id, payload) => {
  const { data, refresh, error, pending } = await useApi(`/posts/${id}/comments`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  return data
};


const editComment = async (post_id, comment_id, payload) => {
  const { data, refresh, error, pending } = await useApi(`/posts/${post_id}/comments/${comment_id}`, {
    initialCache: false,
    body: payload,
    method: "PUT",
  });

  return data
};

const deleteComment = async (post_id, comment_id) => {
  const { data, refresh, error, pending } = await useApi(`/posts/${post_id}/comments/${comment_id}`, {
    initialCache: false,
    method: "DELETE",
  });

  return data
};

const getComments = async (post_id) => {
  const { data, refresh, error, pending } = await useApi(`/posts/${post_id}/comments?per_page=10`, {
    initialCache: false,
    method: "GET",
  });

  return data
};

const getPaginationsComments = async (url) => {
  const { data, refresh, error, pending } = await useApi(`${url}`, {
    initialCache: false,
    method: "GET",
  });

  return data
};

export { index, create, update ,deletePost, toogleReaction, getReactions, createComment, editComment, deleteComment, getComments, getPaginationsComments };
