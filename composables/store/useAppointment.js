import { useApi } from "~/composables/useApi";

export const storeOpeningHours = async (payload) => {
    const { data, refresh, error, pending } = await useApi(`appointments/opening-hours`, {
      initialCache: false,
      body: payload,
      method: "POST",
    });

    console.log(data)
};

export const getUserOpeningHours = async (id) => {
  const { data, refresh, error, pending } = await useApi(
    `appointments/opening-hours/get-user-availabilities/${id}`,
    {
      initialCache: false,
      method: "GET",
    }
  );
  return data

};

export const getAvailableTimeSlots = async (id, date) => {
  const { data, refresh, error, pending } = await useApi(
    `appointments/opening-hours/get-available-time-slots/${id}?date=${date}`,
    {
      initialCache: false,
      method: "GET",
    }
  );
  
  return data

};


export const bookAppointment = async (payload) => {
  
  const { data, refresh, error, pending } = await useApi(`appointments`,
    {
      initialCache: false,
      body: payload,
      method: "POST",
    }
  );
  
  return data

};


export const calendar = async (date) => {
  
  const { data, refresh, error, pending } = await useApi(`appointments/calendar?month=${date}`,
    {
      initialCache: false,
      method: "GET",
    }
  );

  return data

};

export const getAppointments = async (date) => {
  
  const { data, refresh, error, pending } = await useApi(`appointments?date=${date}`,
    {
      initialCache: false,
      method: "GET",
    }
  );

  return data

};

export const getAppointment = async (id) => {
  
  const { data, refresh, error, pending } = await useApi(`appointments/${id}`,
    {
      initialCache: false,
      method: "GET",
    }
  );

  return data

};
