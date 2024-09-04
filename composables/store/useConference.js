import { useApi } from "~/composables/useApi";
import { useConferenceStore } from '~/stores/Conference'

export const createConference = async (payload) => {
  
  const { data, refresh, error, pending } = await useApi(`conferences`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });

  if (data) {
    return {
      success: true,
      data,
    }
  } else {
    return {
      success: false,
      error,
    }
  }
}

export const listConference = async () => {
  const store = useConferenceStore()
  const { data, refresh, error, pending } = await useApi(`conferences`, {
    initialCache: false,
    method: "GET",
  })
  
  store.setConferenceList(data)
  
}

export const showConference = async (id) => {
  
  const { data, refresh, error, pending } = await useApi(
    `conferences/${id}`,
    {
      initialCache: false,
      method: "GET",
    }
  );
  
  
  return data
}

export const subscribeConference = async (id) => {
  const { data, refresh, error, pending } = await useApi(
    `conferences/${id}/subscribe`,
    {
      initialCache: false,
      method: "GET",
    }
  );

  return data;
  
}

export const guestSubscribeConference = async (id, payload) => {
  const { data, refresh, error, pending } = await useApi(
    `conferences/${id}/subscribe/guest`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );
  if(data){
    return {
      status: true,
      data: data
    }
  }else{
    return {
      status: false,
      data: error
    }
  }
  
  return data
}


export const resendExternalCredentials = async (id, payload) => {
  const { data, refresh, error, pending } = await useApi(
    `conferences/${id}/send-external-user-informations`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );

  if(data){
    return{
      success: true,
      data: data
    }
  }else{
    return{
      success: false,
      data: error
    }
  }
  
}

export const resendExternalAnimatorCredentials = async (id, payload) => {
  const { data, refresh, error, pending } = await useApi(
    `conferences/${id}/send-external-animator-informations`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );

  if(data){
    return{
      success: true,
      data: data
    }
  }else{
    return{
      success: false,
      data: error
    }
  }
  
}


export const joinConference = async (id) => {
  const { data, refresh, error, pending } = await useApi(
    `conferences/${id}/join`,
    {
      initialCache: false,
      method: "GET",
    }
  );
  console.log(error);
  
  if(data){
    return{
      success: true,
      data: data
    }
  }else{
    return{
      success: false,
      data: error
    }
  }
  
}

export const externalUserJoin = async (id, payload) => {
  const { data, refresh, error, pending } = await useApi(
    `conferences/${id}/attendees/join`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );

  if(data){
    return{
      success: true,
      data: data
    }
  }else{
    return{
      success: false,
      data: error
    }
  }
  
}

export const externalAnimatorJoin = async (id, payload) => {
  const { data, refresh, error, pending } = await useApi(
    `conferences/${id}/animators/join`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );

  if(data){
    return{
      success: true,
      data: data
    }
  }else{
    return{
      success: false,
      data: error
    }
  }
  
}

export const getInformationsByEmail = async (id) => {
  const { data, refresh, error, pending } = await useApi(
    `conferences/${id}/get-informations-by-email`,
    {
      initialCache: false,
      method: "GET",
    }
  );
}
