<script setup>
import { logout, useUser } from '~/composables/store/useApiAuth'
import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore();
const user = computed(() => authStore.getAuthUser);


watchEffect(() => {
    useUser();
});

const logoutUser = async () => {
    const result = await logout()
    await navigateTo('/auth/login')

}

const items = [
    [{
        label: user.value?.full_name,
        slot: 'account',
        link: null,
        disabled: true
    }], [{
        label: 'Settings',
        icon: 'i-heroicons-cog-8-tooth',
        link: '/profile/update'
    }], [{
        label: 'Sign out',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        link: null,
        function: logoutUser
    }]
]


</script>



<template>
    <!-- <nav class="bg-white dark:bg-slate-800">
        <div class="mx-auto w-full max-w-screen-xl px-2">
            <div class="relative flex h-20 items-center justify-between">
                <div class="flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center dark:hidden">
                        <nuxt-link to="/home">
                            <img class="h-10 w-auto" src="~/assets/svg/logos/game-changer-logo.svg" alt="Game changer">
                        </nuxt-link>
                    </div>

                    <div class="flex flex-shrink-0 items-center dark:block">
                        <nuxt-link to="/home">
                            <img class="h-6 w-auto" src="~/assets/svg/logos/game-changer-white-logo.svg" alt="Game changer">
                        </nuxt-link>
                    </div>
                </div>

                <div class="hidden sm:ml-16 sm:flex items-center">
                    <div class="flex space-x-4">
                        <a href="#" class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Events</a>
                        <a href="#"
                            class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Trainings</a>
                        <a href="#"
                            class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Ressources</a>
                        <a href="#" class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Contact
                            us</a>
                    </div>
                </div>

                <div class="flex items-center space-x-4">
                    <UButton size="sm" square class="bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-white/5" color="primary">
                        <template #leading>
                            <Icon name="tabler:search" size="20" class="dark:text-white text-primary"/>
                        </template>
                    </UButton>
                    <UButton size="sm" square class="bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-white/5">
                        <template #leading>
                            <Icon name="tabler:bell" size="20" class="dark:text-white text-primary"/>
                        </template>
                    </UButton>
                    <nuxt-link to="/chat">
                        <UButton size="sm" square class="bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-white/5">
                            <template #leading>
                                <Icon name="tabler:message" size="20" class="dark:text-white text-primary"/>
                            </template>
                        </UButton>
                    </nuxt-link>
                    <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
                        <UAvatar :src="user.image_url" />
                        
                        <template #account="{ item }">
                            <div class="text-left">
                                <p>
                                    Signed in as
                                </p>
                                <p class="truncate font-medium text-gray-900 dark:text-white">
                                    {{ item.label }}
                                </p>
                            </div>
                        </template>

                        <template #dark="{ item }">
                            <div class="text-left">
                                <p>
                                    Signed in as
                                </p>
                                <p class="truncate font-medium text-gray-900 dark:text-white">
                                    {{ item.label }}
                                </p>
                            </div>
                        </template>

                        <template #item="{ item }">
                            <button class="flex justify-between items-center w-full" @click="item.function"
                                v-if="!item?.link">
                                <span class="truncate">{{ item.label }}</span>
                                <UIcon :name="item.icon"
                                    class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                            </button>

                            <NuxtLink :to="item?.link" class="flex justify-between items-center w-full" v-else>
                                <span class="truncate">{{ item.label }}</span>
                                <UIcon :name="item.icon"
                                    class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                            </NuxtLink>
                        </template>
                    </UDropdown>
                </div>
            </div>
        </div>
    </nav> -->
</template>