<script setup>
import { logout, useUser } from "~/composables/store/useApiAuth";
import { useAuthStore } from "~/stores/authStore";
import { getNotifications, markAsRead, deleteNotification, markAllAsRead } from '~/composables/store/useNotifications'
import userImage from '~/assets/svg/icons/user.svg'
import userWhite from '~/assets/svg/icons/user-white.svg'
import bell from '~/assets/svg/vectors/bell.svg'
import bellWhite from '~/assets/svg/vectors/bell-white.svg'

import { useNotificationsStore } from "~/stores/notifications"
import { useDayjs } from '#dayjs'
const dayjs = useDayjs()

const route = useRoute()

const store = useNotificationsStore()

const notifications = computed(() => store.getNotifications)

const authStore = useAuthStore();
const user = computed(() => authStore.getAuthUser);

const isOpen = ref(false);

const query = ref(route.query.q)

// watchEffect(() => {
//     useUser();
// });

defineProps({
  notificationCount: {
    type: Number,
    default: 0
  }
});

const logoutUser = async () => {
  const result = await logout();
  const authCookie = useCookie("user_access_token");
  authCookie.value = null;
  await navigateTo("/auth/login");
};

const timego = (dateTime) => {
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return dayjs.utc(dateTime).tz(localTimezone).fromNow()
}


const markAllNotifyAsRead = async () => {
  const result = await markAllAsRead();
  if (result?.success) {
    notifications.value.data = notifications.value.data.map(notify => ({
      ...notify,
      read_at: new Date()
    }));
  }
}

const markNotifyAsRead = async (notification) => {
  if (!notification?.read_at) {
    const result = await markAsRead(notification.id);
    if (result?.success) {
      const notifyIndex = notifications.value.data.findIndex(notify => notify.id === notification.id);
      if (notifyIndex !== -1) {
        notifications.value.data[notifyIndex].read_at = new Date();
      }
    }
  }
}

const deleteNotify = async (notification) => {
  const result = await deleteNotification(notification.id);
  if (result?.success) {
    notifications.value.data = notifications.value.data.filter(notify => notify.id !== notification.id);
  }
}


const search = async() => {
  await navigateTo(`/search?q=${query.value}`)
}


const getDataFromApi = async () => {
  await getNotifications()
}

const fetchMoreNotifications = async $state => {
  console.log("fetch more data");

  try {
    const result = await getPaginationsComments(notifications.value.links.next)
    notifications.value.data.push(...result.data)
    notifications.value.links = result.links
    if (result.data.length < 10) $state.complete()

  } catch (error) {
    $state.error()
  }
}

const notifyitems = [
  [
    {
      key: 'as-read',
      label: 'Mark as read',
      icon: 'i-heroicons-check',
      function: markNotifyAsRead
    }, {
      key: 'as-delele',
      label: 'Delete',
      icon: 'i-heroicons-trash',
      function: deleteNotify
    }
  ]
]

watchEffect(() => {
  getDataFromApi()
})

const items = [
  [
    {
      label: user.value?.full_name,
      slot: "account",
      link: null,
      disabled: true,
    },
  ],
  [
    {
      key: "profile",
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      link: "/profile/update",
    },
  ],
  [
    {
      key: "switch",
      label: "Switch mode",
    },
  ],
  [
    {
      key: "logout",
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      link: null,
      function: logoutUser,
    },
  ],
];
</script>

<template>
  <nav>
    <div
      class="z-30 h-[--m-top] h-24 fixed top-0 left-0 w-full flex items-center bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:bg-dark dark:border-slate-800 dark:shadow-md shadow-sm">
      <div class="relative flex w-full items-center justify-between px-4">
        <div class="flex items-center justify-center space-x-2 sm:items-stretch sm:justify-start">
          <UButton @click="isOpen = true" size="lg" square
            class="block xl:hidden bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-white/5">
            <template #leading>
              <Icon name="tabler:list" size="20" class="dark:text-white text-primary" />
            </template>
          </UButton>
          <div class="flex-shrink-0 items-center dark:hidden md:flex">
            <nuxt-link to="/">
              <img class="h-10 w-auto" src="~/assets/svg/logos/game-changer-logo.svg" alt="Game changer">
            </nuxt-link>
          </div>

          <div class="flex-shrink-0 items-center dark:flex hidden dark:md:flex">
            <nuxt-link to="/">
              <img class="h-10 w-auto" src="~/assets/svg/logos/game-changer-white-logo.svg" alt="Game changer">
            </nuxt-link>
          </div>
        </div>

        <div class="hidden sm:ml-16 sm:flex items-center">
          <div class="flex space-x-4">
            <div id="search--box"
              class="xl:w-[680px] sm:w-96 sm:relative rounded-full z-20 max-md:hidden w-screen left-0 max-sm:fixed max-sm:top-2 dark:bg-slate-700 bg-slate-100"
              tabindex="0" aria-haspopup="true" aria-expanded="false">
              <ion-icon name="search" class="absolute left-4 top-1/2 -translate-y-1/2 md hydrated" role="img"
                aria-label="search"></ion-icon>

              <!-- <UInput v-model="value"  placeholder="Search Friends, videos .." size="xl"/> -->
              <input type="text" v-model="query" placeholder="Search Friends, videos .." @keyup.enter="search"
                class="w-full !pl-10 !font-normal !bg-transparent h-12 !text-sm rounded-full focus:outline-green-400 dark:focus:outline-green-400" />
              <Icon name="tabler:search" size="20" class="absolute top-1/2 -translate-y-1/2 left-3" />
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div>
            <UButton :ui="{ rounded: 'rounded-full' }" size="lg" color="green">
                <template #leading>
                  <Icon name="tabler:plus" />
                </template>
              </UButton>
          </div>
          <!-- <UButton size="sm" square
                        class="bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-white/5"
                        color="primary">
                        <template #leading>
                            <Icon name="tabler:search" size="20" class="dark:text-white text-primary" />
                        </template>
                    </UButton> -->

          <UPopover  :popper="{ placement: 'bottom-end' }">
            <UButton :ui="{ rounded: 'rounded-full' }" size="md" square
              class="bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-white/5">
              <template #leading>
                <UChip :text="notificationCount" color="red" size="lg">
                  <Icon name="tabler:bell" size="20" class="dark:text-white text-primary" />
                </UChip>
              </template>
            </UButton>

            <template #panel>
              <div class="w-[400px] max-h-[500px] overflow-auto is-scrollbar-hidden pt-0">
                <div class="sticky top-0  dark:bg-[#111827] bg-white z-50  pb-2">
                  <div class="flex justify-between items-center p-4">
                    <h2 class="font-bold">{{ $t('Notifications List') }}</h2>
                    <UButton @click="markAllNotifyAsRead" size="md" color="green" variant="link"
                      label="Mark all as read" class="hover:no-underline hover:bg-green-500/5" :trailing="false">
                      <template #leading>
                        <Icon name="tabler:checks" />
                      </template>
                    </UButton>
                  </div>
                  <UDivider label="" />
                </div>

                <ul v-if="notifications?.data?.length > 0" role="list" class="mt-4 p-4">
                  <li v-for="(notification, index) in notifications?.data" :key="index"
                    class="flex items-start p-4 shadow mb-4 rounded-md relative bg-transparent border dark:border-slate-800/40">

                    <div class="flex-1">
                      <div class="flex items-center space-x-4 ">
                        <UAvatar v-if="notification.data.image_url" :src="notification.data.image_url" alt=""
                          size="md" />
                        <div v-else
                          class="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                          <img alt="user" :src="userImage" className="inline-block dark:hidden" />
                          <img alt="user" :src="userWhite" className="hidden dark:inline-block" />
                        </div>


                        <div class="flex flex-col">
                          <h4 class="font-bold mb-0 text-sm">{{ notification.data.message }}</h4>

                          <span class="text-xs -mt-[0.5px]">
                            {{ timego(notification.created_at) }}
                          </span>
                        </div>

                      </div>
                      <div v-if="!notification.read_at"
                        class="w-[6px] h-1/2 rounded-tr-md rounded-br-md bg-green-600 absolute top-1/2 -translate-y-1/2 left-0">
                      </div>
                    </div>
                    <div>
                      <UDropdown :items="notifyitems" :ui="{ item: { disabled: 'cursor-text select-text' } }"
                        :popper="{ placement: 'bottom-start' }">
                        <UButton icon="i-heroicons-ellipsis-vertical" size="sm"
                          :color="($colorMode.value == 'dark') ? 'white' : 'black'" variant="link" :trailing="false" />

                        <template #item="{ item }">
                          <UButton size="xs" :disabled="(item.key == 'as-read' && notification.read_at) ? true : false"
                            :color="(item.key == 'as-delele') ? 'red' : 'black'" variant="link"
                            class="hover:no-underline w-full flex items-center justify-between"
                            @click="item.function(notification)">
                            <span class="truncate">{{ item.label }}</span>
                            <UIcon :name="item.icon"
                              :class="(item.key == 'as-delele') ? 'text-red-400' : 'dark:text-blacktext-white '"
                              class="flex-shrink-0 h-4 w-4  ms-auto" />
                          </UButton>
                        </template>
                      </UDropdown>
                    </div>
                  </li>
                </ul>

                <div v-if="notifications?.data?.length == 0"
                class="flex flex-col justify-center items-center space-y-2 mb-8">
                <ClientOnly>
                    <img :src="$colorMode.value == 'dark' ? bellWhite : bell" alt="" srcset="">
                    <h2 class="font-semibold text-xl uppercase">{{ $t('No notifications') }}</h2>
                </ClientOnly>

            </div>

                <div class="flex justify-center items-center mb-4">
                  <nuxt-link to="/notifications">
                    <UButton  size="md" color="green" variant="outline" label="All notifications"
                    class="hover:no-underline hover:bg-green-500/5" :trailing="false">
                    
                  </UButton>
                  </nuxt-link>
                </div>
              </div>
            </template>
          </UPopover>

          <UPopover  :popper="{ placement: 'bottom-end'}" v-if="user?.role.id != 3">
            <UButton :ui="{ rounded: 'rounded-full' }" size="md" square
              class="bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-white/5">
              <template #leading>
                <Icon name="tabler:message" size="20" :class="$route.path === '/chat'
                  ? 'text-[#34d399]'
                  : 'text-[#0f1454] dark:text-white'
                  " />
              </template>
            </UButton>

            <template #panel>
              <div class="w-[400px] max-h-[500px] is-scrollbar-hidden overflow-auto pt-0">
                <div class="sticky top-0  dark:bg-[#111827] bg-white z-50  pb-2">
                  <div class="flex justify-between items-center p-4">
                    <h2 class="font-bold">{{ $t('Messages List') }}</h2>
                  </div>
                  <UDivider label="" />
                </div>

                <usersConvertions/>

                

                <div class="flex justify-center items-center mb-4">
                  <nuxt-link to="/chat">
                    <UButton  size="md" color="green" variant="outline" label="All messages"
                    class="hover:no-underline hover:bg-green-500/5" :trailing="false">
                    
                  </UButton>
                  </nuxt-link>
                </div>
              </div>
            </template>
          </UPopover>




          <!-- <nuxt-link v-if="user?.role.id != 3" to="/chat">
            <UButton :ui="{ rounded: 'rounded-full' }" size="md" square
              class="bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-white/5">
              <template #leading>
                <Icon name="tabler:message" size="20" :class="$route.path === '/chat'
                  ? 'text-[#34d399]'
                  : 'text-[#0f1454] dark:text-white'
                  " />
              </template>
            </UButton>
          </nuxt-link> -->
          <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
            :popper="{ placement: 'bottom-start' }">
            <div
              class="p-[2px] bg-gray-100 dark:bg-gray-800 dark:border-slate-700 border-slate-200 border rounded-full flex items-center justify-center">
              <UAvatar :src="user?.image_url" :alt="user?.full_name" size="sm" />
            </div>
            <template #account="{ item }">
              <div class="text-left">
                <p>Signed in as</p>
                <p class="truncate font-medium text-gray-900 dark:text-white">
                  {{ item.label }}
                </p>
              </div>
            </template>

            <template #dark="{ item }">
              <div class="text-left">
                <p>Signed in as</p>
                <p class="truncate font-medium text-gray-900 dark:text-white">
                  {{ item.label }}
                </p>
              </div>
            </template>

            <template #item="{ item }">

              <button class="flex justify-between items-center w-full" v-if="item?.key == 'switch'">
                <SwitchMode :label="item.label" size="xs" />
              </button>


              <button class="flex justify-between items-center w-full" @click="item.function" v-else-if="!item?.link">
                <span class="truncate">{{ item.label }}</span>
                <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
              </button>

              <NuxtLink :to="item?.link" class="flex justify-between items-center w-full" v-else>
                <span class="truncate">{{ item.label }}</span>
                <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
              </NuxtLink>
            </template>
          </UDropdown>
        </div>
      </div>
    </div>
    <div v-if="isOpen" id="site__sidebar__overly"
      class="absolute top-0 left-0 z-20 w-screen h-screen xl:hidden backdrop-blur-sm"
      uk-toggle="target: #site__sidebar ; cls :!-translate-x-0" tabindex="0" aria-expanded="false"></div>
    <USlideover v-model="isOpen">
      <div class="p-4">
        <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid"
          class="flex sm:hidden absolute end-5 top-5 z-10" square padded @click="isOpen = false" />
        <div @click="isOpen = false" class="flex flex-shrink-0 items-center dark:hidden">
          <nuxt-link to="/">
            <img class="h-10 w-auto" src="~/assets/svg/logos/game-changer-logo.svg" alt="Game changer" />
          </nuxt-link>
        </div>

        <div @click="isOpen = false" class="hidden flex-shrink-0 items-center dark:flex">
          <nuxt-link to="/">
            <img class="h-10 w-auto" src="~/assets/svg/logos/game-changer-white-logo.svg" alt="Game changer" />
          </nuxt-link>
        </div>
      </div>

      <div class="p-4">
        <ul role="list" class="-mx-2 space-y-1 my-4">
          <li @click="isOpen = false">
            <nuxt-link to="/" :class="{ 'bg-green-500 text-white': $route.path === '/' }"
              class="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 dark:text-white text-gray-600 hover:bg-gray-800 hover:text-white">
              <Icon name="tabler:smart-home" size="18" />
              Home
            </nuxt-link>
          </li>
          <li @click="isOpen = false">
            <nuxt-link to="/services" :class="{ 'bg-[#34d399] text-white': $route.path === '/services' }"
              class="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 dark:text-white text-gray-600 hover:bg-gray-800 hover:text-white">
              <Icon name="tabler:briefcase" size="18" />
              Services
            </nuxt-link>
          </li>
          <li v-if="user?.role.id != 3" @click="isOpen = false">
            <nuxt-link to="/calendar" :class="{ 'bg-[#34d399] text-white': $route.path === '/calendar' }"
              class="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 dark:text-white text-gray-600 hover:bg-gray-800 hover:text-white">
              <Icon name="tabler:calendar" size="18" />
              Calendar
            </nuxt-link>
          </li>
          <li @click="isOpen = false">
            <nuxt-link to="/masterclass" :class="{ 'bg-[#34d399] text-white': $route.path === '/masterclass' }"
              class="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 dark:text-white text-gray-600 hover:bg-gray-800 hover:text-white">
              <Icon name="tabler:device-tv" size="18" />
              Masterclass
            </nuxt-link>
          </li>
        </ul>
      </div>
    </USlideover>
  </nav>
</template>
