<template>
    <div>
        <div class="mx-auto w-full max-w-screen-xl py-4">
            <div class="flex flex-col">
                <div class="rounded-tr-md rounded-tl-md h-96 w-full overflow-hidden relative">
                    <div class="h-full w-full ">
                        <img src="https://random-image-pepebigotes.vercel.app/api/random-image"
                            class="w-full h-full object-cover" alt="">
                    </div>
                    
                </div>

                <div class="pb-4 w-full shadow-sm bg-white dark:bg-slate-950">
                    <div class="flex md:flex-row flex-col items-center md:items-start space-x-4 space-y-2 w-3/4 mx-auto ">
                        <div class="w-32 h-32 bg-white dark:bg-slate-800 shadow-sm p-1 rounded-2xl relative -mt-12 md:mx-0 mx-auto md:block">
                            <img src="https://random-image-pepebigotes.vercel.app/api/random-image"
                                class="w-full h-full object-cover rounded-2xl" alt="">
                        </div>
                        <div class="pb-4 pt-2 md:w-2/4 w-full max-h-32 overflow-hidden text-center md:text-start mb-8">
                            <!-- <h1 class="font-bold text-xl">{{profile.full_name}}</h1> -->
                            <p class="text-xs relative">
                                <!-- {{ profile.bio }} -->
                            </p>
                        </div>

                        <div class="space-x-4 items-center flex md:hidden my-4">
                            <UButton icon="i-heroicons-plus" size="sm" class="py-2 px-4" color="primary" variant="solid"
                                label="Create" :trailing="false" />
                            <UButton icon="i-heroicons-pencil-square" class="hover:bg-primary/5 py-2 px-4" size="sm"
                                color="primary" variant="outline" label="Update profile" :trailing="false" />
                        </div>
                    </div>
                </div>

            </div>
            <div class="my-2 px-4 py-4 bg-white dark:bg-slate-800 flex flex-wrap justify-between items-center">
                <ul class="flex space-x-4 items-center flex-1 overflow-auto">
                    <li class="pb-2 border-b-4 border-primary font-semibold text-primary">Feed</li>
                    <li class="pb-2">Announces</li>
                    <li class="pb-2">Masterclass</li>
                    <li class="pb-2">Conferences</li>
                    <li class="pb-2">Podcast</li>
                </ul>
                <div class="space-x-4 items-center hidden md:flex">
                    <UButton icon="i-heroicons-plus" size="sm" class="py-2 px-4" color="primary" variant="solid"
                        label="Create" :trailing="false" />
                    <nuxtLink to="/profile/update">
                        <UButton icon="i-heroicons-pencil-square" class="hover:bg-primary/5 py-2 px-4" size="sm"
                        color="primary" variant="outline" label="Update profile" :trailing="false" />
                    </nuxtLink>
                    <UButton icon="i-heroicons-ellipsis-horizontal" size="sm" class="hover:bg-primary/5 py-2 px-2"
                        color="primary" square variant="outline" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getProfile } from '~/composables/store/useProfile'
const route = useRoute()
const profile = ref()

definePageMeta({
    layout: 'auth',
    title: 'Forgot password',
    middleware: ['auth']
})

const getDataFromApi = async (id) => {
    const result = await getProfile(id)
    profile.value = result.user
}

watchEffect(() => {
    getDataFromApi(route.params.id)
});
</script>