<template>
    <div class="w-full">
  
        <div v-if="profile" class="mx-auto w-full max-w-screen-xl py-4">
            <div class="flex flex-col">
                <div class="rounded-tr-md rounded-tl-md h-96 w-full overflow-hidden relative">
                    <div class="h-full w-full ">
                        <img :src="profile?.cover_image_url || fallbackImage" class="w-full h-full object-cover"
                            draggable="false" alt="">
                    </div>

                </div>

                <div class="w-full shadow-sm border border-t-0 border-slate-200 dark:border-slate-800">
                    <div
                        class="flex justify-between md:flex-row flex-col md:items-center space-x-4 space-y-2 w-3/4 mx-auto ">
                        <div
                            class="w-32 h-32 bg-gray-100 dark:bg-gray-800 shadow-sm p-1 rounded-2xl relative -mt-12 md:mx-0 mx-auto md:block">
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

                        <div class="flex items-center justify-center lg:items-end lg:justify-end space-x-6">
                            <div class="flex flex-col items-center  p-4">
                                <span class="font-bold">{{ profile?.followers_count }}</span>
                                <h2 class="text-sm  capitalize">Followers</h2>
                            </div>

                            <div class="flex flex-col items-center  p-4">
                                <span class="font-bold">{{ profile?.followings_count }}</span>
                                <h2 class="text-sm capitalize">Following</h2>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 px-8 border-t dark:border-[#1e293b] mt-4">
                        <div class="flex justify-between items-center space-x-2">
                            <ul class="md:flex hidden space-x-4 items-center flex-1 overflow-auto">
                                <li class="pb-2 border-b-4 dark:border-green-400 font-semibold dark:text-green-400">Feed
                                </li>
                                <li class="pb-2">Announces</li>
                                <li class="pb-2">Masterclass</li>
                                <li class="pb-2">Conferences</li>
                                <li class="pb-2">Podcast</li>
                            </ul>
                            <!-- Unfollow -->
                            <UButton color="green" v-if="profile?.is_followed_by_me" :loading="toggleFollowLoading" @click="toggleFollowBtn(1)" >
                                <Icon name="tabler:user-check" />
                                {{ $t('Following') }}
                            </UButton>
                            <!-- Follow back -->
                            <UButton color="green" v-if="!profile?.is_followed_by_me && profile?.is_following_me" :loading="toggleFollowLoading" @click="toggleFollowBtn(2)" >
                                <Icon name="tabler:user-up" />
                                {{ $t('Follow Back') }}
                            </UButton>
                            <!-- Follow -->
                            <UButton color="green" v-if="!profile?.is_following_me && !profile?.is_followed_by_me" :loading="toggleFollowLoading" @click="toggleFollowBtn(3)" >
                                <Icon name="tabler:user-plus" />
                                {{ $t('Follow') }}
                            </UButton>

                            <nuxt-link :to="`/appointment/availability/${profile?.id}`"
                                v-if="profile?.can_book_appointment">
                                <UButton color="green">
                                    <Icon name="tabler:calendar-plus" />
                                    {{ $t('Appointment') }}
                                </UButton>
                            </nuxt-link>
                            <nuxt-link :to="`/chat?user_id=${profile?.id}`">
                                <UButton color="green" variant="outline" v-if="profile?.can_discuss">
                                <Icon name="tabler:message" />
                                {{ $t('Message') }}
                            </UButton>
                            </nuxt-link>
                            
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
import { getProfile, toggleFollow } from '~/composables/store/useProfile'
import fallbackImage from '~/assets/img/profile-cover.webp'
const route = useRoute()
const profile = ref(null)
const toggleFollowLoading = ref(false)


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
})




const toggleFollowBtn = async (type) => {
    toggleFollowLoading.value = true
    try {
        const result = await toggleFollow(profile.value.id)
        if (result.success) {
            if (type === 1) { // Unfollow
                profile.value.followers_count -= 1
                profile.value.is_followed_by_me = false
            } else if (type === 2 || type === 3) { // Follow back or Follow
                profile.value.followers_count += 1
                profile.value.is_followed_by_me = true
            }
        }
    } finally {
        toggleFollowLoading.value = false
    }
};
</script>