<script setup>
import { logout, isLoading } from '~/composables/store/useApiAuth'

const user = useCookie("current_user");



const logoutUser = async () => {
    const result = await logout();
    console.log(result);
}

const items = [
    [{
        label: user.value.full_name,
        slot: 'account',
        disabled: true
    }], [{
        label: 'Settings',
        icon: 'i-heroicons-cog-8-tooth'
    }], [{
        label: 'Sign out',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        function: logoutUser
    }]
]


</script>



<template>
    <nav class="bg-white dark:bg-slate-800">
        <div class="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-20 items-center justify-between">
                <div class="flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center dark:hidden">
                        <img class="h-10 w-auto" src="~/assets/svg/logos/game-changer-logo.svg" alt="Game changer">
                    </div>
                </div>

                <div class="hidden sm:ml-16 sm:flex items-center">
                    <div class="flex space-x-4">
                        <a href="#" class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Events</a>
                        <a href="#"
                            class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Trainings</a>
                        <a href="#"
                            class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Ressources</a>
                        <a href="#" class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Contact us</a>
                    </div>
                </div>

                <div class="flex items-center space-x-4">
                    <UButton size="lg" square variant="soft">
                        <template #leading>
                            <img src="/assets/svg/icons/search.svg">
                        </template>
                    </UButton>
                    <UButton size="lg" square variant="soft">
                        <template #leading>
                            <img src="/assets/svg/icons/notification.svg">
                        </template>
                    </UButton>
                    <UButton size="lg" square variant="soft">
                        <template #leading>
                            <img src="/assets/svg/icons/message.svg">
                        </template>
                    </UButton>
                    <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
                        :popper="{ placement: 'bottom-start' }">
                        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

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

                        <template #item="{ item }">
                            <button class="flex justify-between items-center w-full" @click="item.function">
                                <span class="truncate">{{ item.label }}</span>
                                <UIcon :name="item.icon"
                                    class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                            </button>
                        </template>
                    </UDropdown>
                </div>
            </div>
        </div>
    </nav>
</template>