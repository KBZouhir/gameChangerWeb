<template>
    <div>
        <div v-if="profile" class="mx-auto w-full max-w-screen-xl py-4">
            <div class="flex flex-col">
                <div class="rounded-tr-md rounded-tl-md h-96 w-full overflow-hidden relative">
                    <div class="h-full w-full ">
                        <img :src="profile?.cover_image_url || fallbackImage" class="w-full h-full object-cover"
                            draggable="false" alt="">
                    </div>

                </div>

                <!-- { "id": 3, "full_name": "Asha Schultz", "first_name": "Asha", "last_name": "Schultz", "bio": null, "image_url": null, "cover_image_url": null, "role": { "id": 2, "name": "USER" }, "domains": [], "followers_count": 0, "followings_count": 0, "is_followed_by_me": false, "is_following_me": false, "can_discuss": true, "can_book_appointment": false } -->

                <div class="pb-4 w-full shadow-sm border border-t-0 border-slate-200 dark:border-slate-800">
                    <div
                        class="flex justify-between md:flex-row flex-col md:items-center space-x-4 space-y-2 w-3/4 mx-auto ">
                        <div
                            class="w-32 h-32 bg-white dark:bg-slate-800 shadow-sm p-1 rounded-2xl relative -mt-12 md:mx-0 mx-auto md:block">
                            <img v-if="profile?.image_url" :src="profile?.image_url"
                                class="w-full h-full object-cover rounded-2xl" alt="">
                            <UAvatar v-else class="w-full h-full" :alt="profile?.full_name" size="3xl" />
                        </div>

                        <div class="pb-4 pt-2 md:w-2/4 w-full max-h-32 overflow-hidden text-center md:text-start mb-8">
                            <h1 class="font-bold text-xl mb-3">{{ profile?.full_name }}</h1>

                            <p class="text-sm relative" v-if="profile?.bio">
                                <MoreAndLess :htmlContent="false" :description="profile?.bio" :number="200" />
                            </p>
                        </div>

                        <div class="flex items-end justify-end space-x-6">
                            <div class="flex flex-col items-center  p-4">
                                <span class="font-bold">{{ profile?.followers_count }}</span>
                                <h2 class="text-sm  capitalize">Followers</h2>
                            </div>

                            <div class="flex flex-col items-center  p-4">
                                <span class="font-bold">{{ profile?.followings_count }}</span>
                                <h2 class="text-sm capitalize">Following</h2>
                            </div>
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






            <!-- <div class="my-2 px-4 py-4 bg-white dark:bg-slate-800 flex flex-wrap justify-between items-center">
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
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { getProfile } from '~/composables/store/useProfile'
import fallbackImage from '~/assets/img/profile-cover.webp'
const route = useRoute()
const profile = ref(null)


definePageMeta({
    layout: 'auth',
    title: 'Forgot password',
    middleware: ['auth']
})

const getDataFromApi = async (id) => {
    const result = await getProfile(id)
    profile.value = result?.user || null
}


watchEffect(() => {
    getDataFromApi(route.params.id)
});
</script>