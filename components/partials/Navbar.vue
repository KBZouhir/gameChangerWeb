<template>
    <nav class="bg-white dark:bg-slate-800">
        <div class="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-20 items-center justify-between">
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center dark:hidden">
                        <img class="h-10 w-auto" src="~/assets/svg/logos/game-changer-logo.svg" alt="Game changer">
                    </div>
                    <!-- <div class="flex flex-shrink-0 items-center light:hidden">
                        <img class="h-8 w-auto" src="~/assets/svg/logos/game-changer-white-logo.svg" alt="Your Company">
                    </div> -->
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
                    <NuxtLink to="login" class="text-blueGray-900 dark:text-white px-3 py-2 text-sm font-medium">Log In</NuxtLink>
                    <NuxtLink to="register">
                        <UButton class="px-6 py-3 bg-emerald-400 ">Sign Up Now</UButton>
                    </NuxtLink>

                </div>
            </div>
        </div>
    </nav>
</template>