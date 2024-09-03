<template>
  <div class="relative flex flex-col min-h-screen bg-[#f1f5f9] dark:bg-[#0f172a]">
    <!-- <img class="absolute top-0 left-0 z-10" :src="greenBlurEffect" alt="" srcset=""> -->
    <NuxtLoadingIndicator />
    <NuxtSnackbar />
    <PartialsAuthNavbar />
    <div
      
      class="fixed top-0 left-0 z-[99] pt-[--m-top] overflow-hidden transition-transform xl:duration-500 max-xl:w-full max-xl:-translate-x-full"
    >
      <div
        class="p-2 max-xl:bg-white shadow-sm 2xl:w-72 sm:w-64 w-[80%] h-[calc(100vh-64px)] relative z-30 border-r border-slate-[150] dark:border-slate-700"
      >
        <div class="overflow-y-auto pt-6 ps-3">
          <nav id="side">
            <ul role="list" class="space-y-1 my-4">
              <li @click="isOpen = false">
                <nuxt-link
                  to="/"
                  :class="{ 'bg-[#34d399] text-white': $route.path === '/' }"
                  class="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 dark:text-white text-gray-600 hover:bg-gray-800 hover:text-white"
                >
                  <Icon name="tabler:smart-home" size="24" />
                  Home
                </nuxt-link>
              </li>
              <li @click="isOpen = false">
                <nuxt-link
                  to="/services"
                  :class="{ 'bg-[#34d399] text-white': $route.path === '/services' }"
                  class="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 dark:text-white text-gray-600 hover:bg-gray-800 hover:text-white"
                >
                  <Icon name="tabler:briefcase" size="24" />
                  Services
                </nuxt-link>
              </li>
              <li v-if="user?.role.id != 3" @click="isOpen = false">
                <nuxt-link
                  to="/calendar"
                  :class="{ 'bg-[#34d399] text-white': $route.path === '/calendar' }"
                  class="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 dark:text-white text-gray-600 hover:bg-gray-800 hover:text-white"
                >
                  <Icon name="tabler:calendar" size="24" />
                  Calendar
                </nuxt-link>
              </li>
              <li @click="isOpen = false">
                <nuxt-link
                  to="/masterclass"
                  :class="{ 'bg-[#34d399] text-white': $route.path === '/masterclass' }"
                  class="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 dark:text-white text-gray-600 hover:bg-gray-800 hover:text-white"
                >
                  <Icon name="tabler:device-tv" size="24" />
                  Masterclass
                </nuxt-link>
              </li>
              <li @click="isOpen = false">
                <nuxt-link
                  to="/masterclass"
                  :class="{ 'bg-[#34d399] text-white': $route.path === '/masterclass' }"
                  class="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 dark:text-white text-gray-600 hover:bg-gray-800 hover:text-white"
                >
                  <Icon name="tabler:device-tv" size="24" />
                  Masterclass
                </nuxt-link>
              </li>
              <li @click="isOpen = false">
                <nuxt-link
                  to="/masterclass"
                  :class="{ 'bg-[#34d399] text-white': $route.path === '/masterclass' }"
                  class="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 dark:text-white text-gray-600 hover:bg-gray-800 hover:text-white"
                >
                  <Icon name="tabler:device-tv" size="24" />
                  Masterclass
                </nuxt-link>
              </li>
              <li @click="isOpen = false">
                <nuxt-link
                  to="/masterclass"
                  :class="{ 'bg-[#34d399] text-white': $route.path === '/masterclass' }"
                  class="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 dark:text-white text-gray-600 hover:bg-gray-800 hover:text-white"
                >
                  <Icon name="tabler:device-tv" size="24" />
                  Masterclass
                </nuxt-link>
              </li>
            </ul>
          </nav>

          <nav
            id="side"
            class="font-medium text-sm text-black border-t pt-3 mt-2 dark:text-white dark:border-slate-800"
          >
            <div class="px-3 pb-2 text-sm font-medium">
              <div class="text-black dark:text-white">Pages</div>
            </div>

            <ul class="mt-2 -space-y-2 uk-nav" uk-nav="multiple: true">
              <li>
                <a href="setting.html">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span> Setting </span>
                </a>
              </li>
              <li>
                <a href="upgrade.html">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    ></path>
                  </svg>
                  <span> Upgrade </span>
                </a>
              </li>
              <li>
                <a href="form-login.html">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    ></path>
                  </svg>
                  <span> Authentication </span>
                </a>
              </li>
              <li class="uk-parent">
                <a href="#" class="group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    ></path>
                  </svg>
                  <span> Development </span>
                  <ion-icon
                    name="chevron-down"
                    class="text-base ml-auto duration-200 group-aria-expanded:rotate-180 md hydrated"
                    role="img"
                    aria-label="chevron down"
                  ></ion-icon>
                </a>
                <ul class="pl-10 my-1 space-y-0 text-sm" hidden="">
                  <li>
                    <a href="components.html" class="!py-2 !rounded -md">Elements</a>
                  </li>
                  <li>
                    <a href="components.html" class="!py-2 !rounded -md">Components</a>
                  </li>
                  <li>
                    <a href="components.html" class="!py-2 !rounded -md">Icons</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          <div class="text-xs font-medium flex flex-wrap gap-2 gap-y-0.5 p-2 mt-2">
            <a href="#" class="hover:underline">About</a>
            <a href="#" class="hover:underline">Blog </a>
            <a href="#" class="hover:underline">Careers</a>
            <a href="#" class="hover:underline">Support</a>
            <a href="#" class="hover:underline">Contact Us </a>
            <a href="#" class="hover:underline">Developer</a>
          </div>
        </div>
      </div>
      
    </div>
    <div class="2xl:ml-[--w-side] xl:ml-[--w-side-sm] p-2.5 mt-[--m-top]">
      <div class="lg:flex 2xl:gap-16 gap-12 max-w-[1065px] mx-auto">
        <NuxtPage />
      </div>
    </div>

    <!-- <UNotifications class="z-20"/> -->
    <!-- <img class="absolute top-0 right-0 z-10" :src="yellowBlurEffect" alt="" srcset=""> -->
  </div>
</template>

<script setup>
import greenBlurEffect from "~/assets/img/green-blur-effect.png";
import yellowBlurEffect from "~/assets/img/yellow-blur-effect.png";

import { registerToken } from "~/composables/store/useApiAuth";
import { useAuthStore } from "~/stores/authStore";
const authStore = useAuthStore();
const user = computed(() => authStore.getAuthUser);

const toast = useToast();

const { $messaging, $getToken, $onMessage } = useNuxtApp();

const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      $getToken($messaging, {
        vapidKey:
          "BJXJpMYEoxBnfQRx74LugwKT6Bs29NW39m6Wh8exW1bb8nrMElyc4c8VfuCj-ZnhZSOuiEiiKsuq9djzsLVSqgU",
      })
        .then((currentToken) => {
          if (currentToken) {
            RegisterFCMToken(currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    } else {
      console.error("Permission denied");
    }
  } catch (error) {
    console.error("Error requesting permission:", error);
  }
};

const RegisterFCMToken = async (token) => {
  await registerToken({ device_token: token });
};

const receivedMessageSound = () => {
    const audio = new Audio('/sounds/MessageNotification.mp3');
    audio.play();
}

const updateUnreadNotificationCount = async () => {
    const result = await unreadNotificationsCount()
    
}

onMounted(() => {
  requestPermission();

  updateUnreadNotificationCount()

  $onMessage($messaging, (payload) => {
    showNotification.value = true
    receivedMessageSound()
    updateUnreadNotificationCount()
    toast.add({
      id: payload.notification.messageId,
      description: payload.notification.body,
      avatar: { src: payload.data.image_url },
      icon: "i-octicon-desktop-download-24",
      color: "primary",
      timeout: "3000",
    });
  });
});
</script>

<style></style>
