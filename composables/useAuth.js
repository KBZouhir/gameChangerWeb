import {useAuthStore} from "~/store/authStore";
import {useApi} from "~/composables/useApi";

export async function useUser() {
    const authStore = useAuthStore();
    const cookie = useCookie('customer_access_token')
    const token = cookie.value;
    let user = authStore.getAuthUser
    if (token && user == null) {

      const key = `me-${(Math.random() + 1).toString(36).substring(7)}`;

      const { data, error } = await useApi(`/me`, {
        initialCache: false,
      }); 
        
        
        
        if (error)
        {
            authStore.syncAuthUser(null)
        }

        if (data)
        {
            authStore.syncAuthUser(data.user)
        }

    }
    // return user;
}



export async function userLogout() {
    const authStore = useAuthStore();
    const {error} =await useApi('/logout')
    if (error)
    {
        //console.log(error)
    }
    authStore.syncAuthUser(null)
    const cookie = useCookie('customer_access_token')
    cookie.value = null
    return await useRouter().push('/auth/login')
}

export async function loginWithEmail(payload) {

    const {data,error} = await useApi('/login', {
        method: 'POST', body: payload,initialCache:false
    })
    if (error)
    {
        throw error
    }
    const authStore = useAuthStore();
    const cookie = useCookie('customer_access_token');
    cookie.value = data.token
    authStore.syncAuthUser(data.user);
  // window.location = '/home'
     return await useRouter().push('/home')
}
