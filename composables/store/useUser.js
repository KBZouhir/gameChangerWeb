import { useUserStore } from "~/stores/user";


export const usersList = async () => {
  const store = useUserStore()
  const { data, refresh, error, pending } = await useApi(`users`,
    {
      initialCache: false,
      method: "GET",
    }
  )
  
  store.setUsers(data)
}
