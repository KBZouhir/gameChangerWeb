import { useApi } from "~/composables/useApi";


const get = async (url) => {
  const { data, refresh, error, pending } = await useApi(`${url}`, {
    initialCache: false,
    method: "GET",
  });

 return data
};

const getImagebyID = async (id) => {
  const { data, refresh, error, pending } = await useApi(`conversations/attachments/${id}`, {
    initialCache: false,
    method: "GET",
  });

   return data
};

const getAudioByID = async (id) => {
  const { data, refresh, error, pending } = await useApi(`conversations/attachments/${id}`, {
    initialCache: false,
    responseType: 'blob',
    method: "GET",
  });

   return data
};

export { get, getImagebyID, getAudioByID };
