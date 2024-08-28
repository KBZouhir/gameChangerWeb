import { useUserStore } from "~/stores/user";

export const usersList = async () => {
  const store = useUserStore();
  let users = { data: [] };

  // Recursive function to fetch users
  const fetchUsers = async (url) => {
    const { data, refresh, error, pending } = await useApi(url, {
      initialCache: false,
      method: "GET",
    });

    // Append the fetched data to the users array
    users.data = users.data.concat(data.data);

    // If there's a next page, fetch more data recursively
    if (data.links && data.links.next) {
      await fetchUsers(data.links.next);
    }
  };

  // Start fetching from the initial endpoint
  await fetchUsers(`users`);

  store.setUsers(users);
};
