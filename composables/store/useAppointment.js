import { useApi } from "~/composables/useApi";

export const storeOpeningHours = async (payload) => {
  const { data, refresh, error, pending } = await useApi(
    `appointments/opening-hours`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );

 return data
};

export const getUserOpeningHours = async (id) => {
  const { data, refresh, error, pending } = await useApi(
    `appointments/opening-hours/get-user-availabilities/${id}`,
    {
      initialCache: false,
      method: "GET",
    }
  );
  return data;
};

export const getAvailableTimeSlots = async (id, date) => {
  const { data, refresh, error, pending } = await useApi(
    `appointments/opening-hours/get-available-time-slots/${id}?date=${date}`,
    {
      initialCache: false,
      method: "GET",
    }
  );

  return data;
};

export const bookAppointment = async (payload) => {
  const { data, refresh, error, pending } = await useApi(`appointments`, {
    initialCache: false,
    body: payload,
    method: "POST",
  });
  console.log(data);
  
  return data;
};

export const calendar = async (date) => {
  const { data, refresh, error, pending } = await useApi(
    `appointments/calendar?month=${date}`,
    {
      initialCache: false,
      method: "GET",
    }
  );

  return data;
};

export const getAppointments = async (date) => {
  const { data, refresh, error, pending } = await useApi(
    `appointments?date=${date}`,
    {
      initialCache: false,
      method: "GET",
    }
  );

  return data;
};

export const getAppointment = async (id) => {
  const { data, refresh, error, pending } = await useApi(`appointments/${id}`, {
    initialCache: false,
    method: "GET",
  });

  return data;
};

export const acceptAppointment = async (id) => {
  const { data, refresh, error, pending } = await useApi(
    `appointments/${id}/accept`,
    {
      initialCache: false,
      method: "PUT",
    }
  );

  return data;
};

export const rejectAppointment = async (id, payload) => {
  
  const { data, refresh, error, pending } = await useApi(
    `appointments/${id}/reject`,
    {
      initialCache: false,
      body: payload,
      method: "PUT",
    }
  )
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
};

export const cancelAppointment = async (id, payload) => {
  
  const { data, refresh, error, pending } = await useApi(
    `appointments/${id}/cancel`,
    {
      initialCache: false,
      body: payload,
      method: "PUT",
    }
  )
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
};


export const startAppointment = async (id) => {
  
  const { data, refresh, error, pending } = await useApi(
    `appointments/${id}/stream`,
    {
      initialCache: false,
      method: "GET",
    }
  )

  if(data){
    return {
      success: true,
      data: data
    }
  }else{
    return {
      success: false,
      data: error
    }
  }
};
