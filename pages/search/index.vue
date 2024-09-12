<template>
    <div class="relative flex flex-col space-y-4 w-full">
        <div class="my-4 ring-1 relative overflow-hidden ring-gray-200 dark:ring-gray-800 shadow  bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-800/50 rounded-xl flex flex-col "
            v-if="!user.is_completed && user.role.id != 3">

            <div class="py-8 px-6">

                <div class="grid grid-cols-4 gap-x-8">
                    <div class="col-span-1 sm:flex flex-col justify-center hidden">
                        <h2 class="lg:text-6xl sm:text-5xl text-4xl font-bold mb-2">{{ calculPercentage }}%</h2>
                        <span> of your profile is complete </span>
                    </div>
                    <div class="col-span-4 sm:col-span-3 flex flex-col">
                        <div class="relative p-2 rounded-full w-full bg-slate-100 mb-2">
                            <div class="absolute top-0 left-0 h-full bg-green-400 rounded-l-full"
                                :style="{ width: `${calculPercentage}%` }"></div>
                        </div>

                        <h2 class="text-xl font-bold my-2">
                            Complete your profile!
                        </h2>

                        <p class="text-xs mb-4">
                            To learn more about building a great profile, check out our Braintrust Academy Course and
                            get pro tips on
                            Discord in the "top-notch-profile channel. When you get to 100%, you can apply for jobs and
                            get verified
                            as an
                            Approved Talent!
                        </p>

                        <div class="flex items-center justify-between">
                            <nuxt-link to="/complete-profile">
                                <UButton label="Complete Profile" color="green" />
                            </nuxt-link>
                            <UButton label="Why is this important?" color="white" variant="link" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-6  bg-[url('~/assets/svg/particules/pattern.svg')]"></div>
        </div>
        <h2 v-if="$route.query.q != ''" class="text-xl font-bold mb-8 mt-4">Search result : <span
                class="text-green-400">{{ $route.query.q }}</span>
        </h2>
        <div class="flex space-x-4">
            <div class="flex flex-col space-y-6 w-2/3">
                <post @deletePostFun="deletePostFun" @editPostFun="editPostFun" :post="post" :user="user"
                    v-for="(post, index) in posts?.data" :key="index" />
            </div>
            <div class="w-1/3 sticky top-100">
                <div class="hidden md:block gap-4">

                    <div class="card bg-white rounded-xl text-sm font-medium dark:bg-slate-800 shadow-sm p-4 mb-4">
                        <CalanderWidget />
                    </div>
                    <div class="card bg-white rounded-xl text-sm font-medium dark:bg-slate-800 mb-4 shadow-sm p-5 px-6">
                        <div class="flex justify-between text-black dark:text-white">
                            <h3 class="font-bold text-base">Peaple You might know</h3>
                            <button type="button">
                                <i name="sync-outline" class="text-xl md hydrated" role="img"
                                    aria-label="sync outline"></i>
                            </button>
                        </div>

                        <div
                            class="space-y-4 capitalize text-xs font-normal mt-5 mb-2 text-gray-500 dark:text-white/80">
                            <div class="flex items-center gap-3">
                                <a href="profile.html">
                                    <img src="https://demo.foxthemes.net/instello/assets/images/avatars/avatar-7.jpg"
                                        alt="" class="bg-gray-200 rounded-full w-10 h-10" />
                                </a>
                                <div class="flex-1">
                                    <a href="profile.html">
                                        <h4 class="font-semibold text-sm text-black dark:text-white">
                                            Johnson smith
                                        </h4>
                                    </a>
                                    <div class="mt-0.5">Suggested For You</div>
                                </div>
                                <button type="button"
                                    class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery">
                                    Follow
                                </button>
                            </div>
                            <div class="flex items-center gap-3">
                                <a href="profile.html">
                                    <img src="https://demo.foxthemes.net/instello/assets/images/avatars/avatar-5.jpg"
                                        alt="" class="bg-gray-200 rounded-full w-10 h-10" />
                                </a>
                                <div class="flex-1">
                                    <a href="profile.html">
                                        <h4 class="font-semibold text-sm text-black dark:text-white">
                                            James Lewis
                                        </h4>
                                    </a>
                                    <div class="mt-0.5">Followed by Johnson</div>
                                </div>
                                <button type="button"
                                    class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery">
                                    Follow
                                </button>
                            </div>
                            <div class="flex items-center gap-3">
                                <a href="profile.html">
                                    <img src="https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg"
                                        alt="" class="bg-gray-200 rounded-full w-10 h-10" />
                                </a>
                                <div class="flex-1">
                                    <a href="profile.html">
                                        <h4 class="font-semibold text-sm text-black dark:text-white">
                                            John Michael
                                        </h4>
                                    </a>
                                    <div class="mt-0.5">Followed by Monroe</div>
                                </div>
                                <button type="button"
                                    class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery">
                                    Follow
                                </button>
                            </div>
                            <div class="flex items-center gap-3">
                                <a href="profile.html">
                                    <img src="https://demo.foxthemes.net/instello/assets/images/avatars/avatar-3.jpg"
                                        alt="" class="bg-gray-200 rounded-full w-10 h-10" />
                                </a>
                                <div class="flex-1">
                                    <a href="profile.html">
                                        <h4 class="font-semibold text-sm text-black dark:text-white">
                                            Monroe Parker
                                        </h4>
                                    </a>
                                    <div class="mt-0.5">Suggested For You</div>
                                </div>
                                <button type="button"
                                    class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery">
                                    Follow
                                </button>
                            </div>
                            <div class="flex items-center gap-3">
                                <a href="profile.html">
                                    <img src="https://demo.foxthemes.net/instello/assets/images/avatars/avatar-4.jpg"
                                        alt="" class="bg-gray-200 rounded-full w-10 h-10" />
                                </a>
                                <div class="flex-1">
                                    <a href="profile.html">
                                        <h4 class="font-semibold text-sm text-black dark:text-white">
                                            Martin Gray
                                        </h4>
                                    </a>
                                    <div class="mt-0.5">Suggested For You</div>
                                </div>
                                <button type="button"
                                    class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery">
                                    Follow
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card bg-white rounded-xl shadow-sm p-5 px-6 text-sm font-medium dark:bg-slate-800 mb-4">
                        <div class="flex justify-between text-black dark:text-white">
                            <h3 class="font-bold text-base">Trends for you</h3>
                            <button type="button">
                                <i name="sync-outline" class="text-xl md hydrated" role="img"
                                    aria-label="sync outline"></i>
                            </button>
                        </div>

                        <div
                            class="space-y-3.5 capitalize text-xs font-normal mt-5 mb-2 text-gray-600 dark:text-white/80">
                            <a href="#">
                                <div class="flex items-center gap-3 p">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5 -mt-2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5">
                                        </path>
                                    </svg>
                                    <div class="flex-1">
                                        <h4 class="font-semibold text-black dark:text-white text-sm">
                                            artificial intelligence
                                        </h4>
                                        <div class="mt-0.5">1,245,62 post</div>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="block">
                                <div class="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5 -mt-2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5">
                                        </path>
                                    </svg>
                                    <div class="flex-1">
                                        <h4 class="font-semibold text-black dark:text-white text-sm">
                                            Web developers
                                        </h4>
                                        <div class="mt-0.5">1,624 post</div>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="block">
                                <div class="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5 -mt-2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5">
                                        </path>
                                    </svg>
                                    <div class="flex-1">
                                        <h4 class="font-semibold text-black dark:text-white text-sm">
                                            Ui Designers
                                        </h4>
                                        <div class="mt-0.5">820 post</div>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="block">
                                <div class="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-5 h-5 -mt-2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5">
                                        </path>
                                    </svg>
                                    <div class="flex-1">
                                        <h4 class="font-semibold text-black dark:text-white text-sm">
                                            affiliate marketing
                                        </h4>
                                        <div class="mt-0.5">480 post</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div v-if="isLoading" class="w-full h-full absolute flex justify-center items-center backdrop-blur-sm">
            <LoadingIcon />
        </div>
    </div>
</template>


<script setup>
import { search } from '~/composables/store/usePost'
import { useAuthStore } from "~/stores/authStore";


const authStore = useAuthStore()

const user = computed(() => authStore.getAuthUser)

const calculPercentage = computed(() => {
  let percentage = 0;
  if(user.value.interests.length > 0) {
    percentage += 33;
  }

  if(user.value.domains.length > 0) {
    percentage += 33;
  }

  if(user.value.address) {
    percentage += 33;
  }

  return percentage;
})

definePageMeta({
    layout: 'auth',
    title: 'Search',
    middleware: ['auth']
})

const route = useRoute()
const posts = ref()
const isLoading = ref(false)


const getDataFromApi = async () => {
    isLoading.value = true
    const result = await search(route.query.q)
    posts.value = result
    isLoading.value = false
}


watchEffect(() => {
    getDataFromApi()
})

</script>