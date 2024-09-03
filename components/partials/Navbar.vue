<template>
    <nav class="bg-white dark:bg-slate-800 sticky top-0 z-50">
        <div class="mx-auto max-w-screen-lg px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-20 items-center justify-between">
                <div class="flex flex-1 items-center  sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center dark:hidden">
                        <img class="h-10 w-auto" src="~/assets/svg/logos/game-changer-logo.svg" alt="Game changer">
                    </div>
                    <div class="hidden flex-shrink-0 items-center dark:flex">
                        <nuxt-link to="/">
                            <img class="h-10  w-auto" src="~/assets/svg/logos/game-changer-white-logo.svg" alt="Game changer">
                        </nuxt-link>
                    </div>
                    <div class="hidden sm:ml-16 sm:flex items-center">
                        <div class="flex space-x-4">
                            <a href="#"
                                class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Events</a>
                            <a href="#"
                                class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Trainings</a>
                            <a href="#"
                                class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Ressources</a>
                            <a href="#" class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Contact
                                us</a>
                        </div>
                    </div>
                </div>

                <div class="flex items-center space-x-4">
                    <NuxtLink to="/auth/login" class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Log In</NuxtLink>
                    <NuxtLink to="/auth/register">
                        <UButton class="px-6 py-3 bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-500">Sign Up</UButton>
                    </NuxtLink>
                    <SwitchMode/>
                </div>
            </div>
        </div>
    </nav>
</template>