import { useApi } from "~/composables/useApi";
import { useNotificationsStore } from "~/stores/notifications";


export const getNotifications = async () => {
  const store = useNotificationsStore();
  const { data, refresh, error, pending } = await useApi(`notifications`, {
    initialCache: false,
    method: "GET",
  });

 store.setNotifications(data);
};

export const markAllAsRead = async () => {
  const { data, refresh, error, pending } = await useApi(`notifications/mark-all-as-read`, {
    initialCache: false,
    method: "POST",
  });

  return data
};

export const markAsRead = async (id) => {
  const { data, refresh, error, pending } = await useApi(`notifications/${id}/mark-as-read`, {
    initialCache: false,
    method: "POST",
  });
  return data
};

export const deleteNotification = async (id) => {
  const { data, refresh, error, pending } = await useApi(`notifications/${id}`, {
    initialCache: false,
    method: "DELETE",
  });
  return data
};

export const unreadNotificationsCount = async () => {
  const { data, refresh, error, pending } = await useApi(`notifications/unread-notifications-count`, {
    initialCache: false,
    method: "GET",
  });


};
