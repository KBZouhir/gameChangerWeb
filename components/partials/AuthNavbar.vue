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
    <nav class="bg-white dark:bg-slate-800 sticky top-0 z-50">
        <div class="mx-auto w-full max-w-screen-xl px-2">
            <div class="relative flex h-20 items-center justify-between">
                <div class="flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center dark:hidden">
                        <nuxt-link to="/home">
                            <img class="h-10 w-auto" src="~/assets/svg/logos/game-changer-logo.svg" alt="Game changer">
                        </nuxt-link>
                    </div>

                    <div class="hidden flex-shrink-0 items-center dark:flex">
                        <nuxt-link to="/home">
                            <img class="h-6 w-auto" src="~/assets/svg/logos/game-changer-white-logo.svg" alt="Game changer">
                        </nuxt-link>
                    </div>
                </div>

                <div class="hidden sm:ml-16 sm:flex items-center">
                    <div class="flex space-x-4">
                        <nuxt-link to="/services" class="flex space-x-2 items-center text-blueGray-900 dark:text-white px-3 py-2 text-xs font-medium">
                            <Icon name="tabler:briefcase"/>
                            <span>Services</span> 
                        </nuxt-link>
                        <nuxt-link to="/calendar" class="flex space-x-2 items-center text-blueGray-900 dark:text-white px-3 py-2 text-xs font-medium">
                            <Icon name="tabler:calendar"/>
                            <span>Calendar</span>
                        </nuxt-link>
                        <nuxt-link to="/" class="flex space-x-2 items-center text-blueGray-900 dark:text-white px-3 py-2 text-xs font-medium">
                            <Icon name="tabler:calendar"/>
                            <span>Ressources</span>
                        </nuxt-link>

                        <nuxt-link to="/" class="flex space-x-2 items-center text-blueGray-900 dark:text-white px-3 py-2 text-xs font-medium">
                            <Icon name="tabler:calendar"/>
                            <span>Contact</span>
                        </nuxt-link>
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
                    <SwitchMode/>
                    <nuxt-link to="/chat">
                        <UButton size="sm" square class="bg-slate-50 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-white/5">
                            <template #leading>
                                <Icon name="tabler:message" size="20" class="dark:text-white text-primary"/>
                            </template>
                        </UButton>
                    </nuxt-link>
                    <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
                        <UAvatar :src="user.image_url" :alt="user.full_name" size="md" />
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
    </nav>
</template>