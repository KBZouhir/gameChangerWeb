// First we need to get the access token from the Cookies

import { useCookie, callWithNuxt } from "nuxt/app";
/**
 * Api call using nuxt `useFetch`
 *
 * @param url
 * @param options
 */

export const useApi = async (url, options) => {
  const cookie = useCookie("user_access_token");
  let token = cookie.value;
  const apiRoute = "https://gc-dev.informatikab.com/api/v1";

  const DEFAULT_HEADERS = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${token}`,
  };

  // Here we will create a default set of headers for every request
  // if present we will also spread the `headers` set by the user
  // then we will delete them to avoid collision in next spread
  const cookieHeaders = useRequestHeaders(["cookie"]);

  const headers = { ...DEFAULT_HEADERS, ...options?.headers, ...cookieHeaders };

  // At this point all the `headers` passed by the user where correctly
  // set in the defaults, now we will spread `options` to remove the
  // `headers` attribute, so we don't spread it again in `useFetch`
  const opts = options ? (({ headers, ...opts }) => opts)(options) : null;
  const baseURL = !options?.baseURL ? apiRoute : options.baseURL;

  const { data, refresh, error, pending } = await useFetch(url, {
    baseURL: baseURL,
    onResponseError({ request, response, options }) {
      if (response.status === 401) {
        window.location.reload();
      }
    },
    headers,
    ...opts,
  });
  return {
    data: data.value,
    error: error.value,
    refresh,
    pending,
  };
};

/**
 * Api call using nuxt `useAsyncData`
 *
 * @param url
 * @param options
 */

export const useaSyncApi = async (url, key, options) => {
  const cookie = useCookie("user_access_token");
  let token = cookie.value;

  const apiRoute = "https://gc-dev.informatikab.com/api/v1";
  // const apiRoute = 'http://127.0.0.1:8000/api/user';

  const DEFAULT_HEADERS = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${token}`,
  };

  key = key ? key : url;
  // Here we will create a default set of headers for every request
  // if present we will also spread the `headers` set by the user
  // then we will delete them to avoid collision in next spread
  const headers = { ...DEFAULT_HEADERS, ...options?.headers };

  // At this point all the `headers` passed by the user where correctly
  // set in the defaults, now we will spread `options` to remove the
  // `headers` attribute, so we don't spread it again in `useFetch`
  const opts = options ? (({ headers, ...opts }) => opts)(options) : null;

  const baseURL = !options?.baseURL ? apiRoute : options.baseURL;

  const { data, refresh, error, pending } = await useAsyncData(
    key,
    () => $fetch(url, {
      baseURL: baseURL,
      onResponseError({ request, response, options }) {

        
        if (response.status === 401) {
          window.location.reload();
        }
      },
      headers,
      ...opts,
    })
  )


  return {
    data: data.value,
    error: error.value,
    refresh,
    pending,
  };
};
