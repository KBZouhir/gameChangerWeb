import { useUserStore } from "~/stores/user";

export const usersList = async () => {
  const store = useUserStore();
  let users = { data: [] };

  const fetchUsers = async (url) => {
    const { data, refresh, error, pending } = await useApi(url, {
      initialCache: false,
      method: "GET",
    });

    users.data = users.data.concat(data.data);

    if (data.links && data.links.next) {
      await fetchUsers(data.links.next);
    }
  };

  await fetchUsers(`users`);

  store.setUsers(users);
};
