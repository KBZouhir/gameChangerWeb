import { useApi } from "~/composables/useApi";
import { successAlert, errorAlert } from "~/composables/useAlert";
import { useAuthStore } from "~/stores/authStore";



const create = async (payload) => {
  console.log('data here', payload);
  // const { data, refresh, error, pending } = await useApi(`/posts`, {
  //   initialCache: false,
  //   body: payload,
  //   method: "POST",
  // });

  // console.log(data);
}


const getPosts = async (payload) => {

};




export {
  create
};
