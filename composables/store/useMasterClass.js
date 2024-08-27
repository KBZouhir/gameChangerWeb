import { useApi } from "~/composables/useApi";
import { useMasterClassStore } from '~/stores/masterclass'

export const createMasterClass = async (payload) => {
  
  const { data, refresh, error, pending } = await useApi(`masterclasses`, {
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

export const listMasterClass = async () => {
  const store = useMasterClassStore()
  const { data, refresh, error, pending } = await useApi(`masterclasses`, {
    initialCache: false,
    method: "GET",
  })
  
  store.setMasterClassList(data)
  
}

export const showMasterClass = async (id) => {
  
  const { data, refresh, error, pending } = await useApi(
    `masterclasses/${id}`,
    {
      initialCache: false,
      method: "GET",
    }
  );
  
  
  return data
};

export const subscribeMasterClass = async (id) => {
  const { data, refresh, error, pending } = await useApi(
    `masterclasses/${id}/subscribe`,
    {
      initialCache: false,
      method: "GET",
    }
  );

  return data;
  
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

  return data
};


export const resendExternalCredentials = async (id, payload) => {
  const { data, refresh, error, pending } = await useApi(
    `masterclasses/${id}/send-external-user-informations`,
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
  
};


export const joinMasterClass = async (id) => {
  const { data, refresh, error, pending } = await useApi(
    `masterclasses/${id}/join`,
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
  
};

export const externalUserJoin = async (id, payload) => {
  const { data, refresh, error, pending } = await useApi(
    `masterclasses/${id}/attendees/join`,
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
