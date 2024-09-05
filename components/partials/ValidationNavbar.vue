<script setup>
import { logout, useUser } from "~/composables/store/useApiAuth";
import { useAuthStore } from "~/stores/authStore";

const authStore = useAuthStore();
const user = computed(() => authStore.getAuthUser);

const isOpen = ref(false);

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
      key: "switch",
      label: "Switch mode",
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      link: null,
      function: logoutUser,
    },
  ],
];
</script>

<template>
  <nav class="h-[--m-top] h-24 sticky z-50 top-0 left-0 w-full  bg-white dark:bg-slate-800 border-b border-slate-200 dark:bg-dark dark:border-slate-800">
    <div class="z-[10] lg:flex 2xl:gap-16 gap-12 max-w-[1065px] mx-auto h-full">
      <div class="relative flex w-full items-center justify-between px-4">
        <div class="flex items-center justify-center space-x-2 sm:items-stretch sm:justify-start">
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

        <div class="flex items-center space-x-4">
          <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
            :popper="{ placement: 'bottom-start' }">
            <div
              class="p-[2px] bg-gray-100 dark:bg-gray-800 dark:border-slate-700 border-slate-200 border rounded-full flex items-center justify-center">
              <UAvatar :src="user?.image_url" :alt="user?.full_name" size="md" />
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
                <SwitchMode :label="item.label" size="xs"/>
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
  </nav>
</template>
