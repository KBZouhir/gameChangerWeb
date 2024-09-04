<template>
    <div class="max-w-screen-xl mx-auto py-4">
        <div class="grid grid-cols-1 md:grid-cols-6 gap-6 p-6">
            <div class="md:col-span-4">
                <div class="rounded-lg overflow-hidden mb-6 h-96">
                    <img v-if="conference?.image_url" :src="conference?.image_url" draggable="false"
                        class="w-full h-full object-cover" alt="" srcset="">

                    <video ref="videoPlayer" class="video-js vjs-default-skin w-full h-full"></video>

                </div>

                <UTabs :items="items" class="mb-8">
                    <template #item="{ item }">
                        <div v-if="item.key === 'general'">
                            <div class="flex justify-between pt-6">
                                <div>
                                    <div class="mb-2">
                                        <h1 class="text-2xl font-bold">{{ conference?.title }}</h1>
                                    </div>
                                    <div class="flex items-center space-x-2 text-xs mb-4">
                                        <span>By:</span>
                                        <div class="flex items-center space-x-1">
                                            <div class="w-4 h-4 rounded-full border dark:border-gray-500">
                                                <img :src="conference?.user.image_url" alt="" srcset="">
                                            </div>

                                            <span>{{ conference?.user.full_name }}</span>

                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="p-4 w-16 h-16 bg-green-400 text-black rounded-md flex flex-col justify-center items-center">
                                    <p class="text-2xl font-semibold ">{{ $dayjs(conference?.date).format('DD') }}</p>
                                    <p class="text-md font-semibold ">{{ $dayjs(conference?.date).format('MMM') }}</p>
                                </div>
                            </div>
                            <UDivider label="" class="my-4" />
                            <div class="mb-6">
                                <p>{{ conference?.short_description }}</p>
                            </div>

                            <div>
                                <h2 class="text-xl font-bold mb-2">{{ $t('Description') }}</h2>
                                <p v-html="conference?.full_description"></p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-4 my-4" v-if="item.key === 'animator'">
                            <UCard class="relative" :ui="{ body: 'p-0' }" v-for="animator in conference?.animators ">
                                <div class="h-44 overflow-hidden relative">
                                    <img :src="fallbackImage" alt="" class="rounded-tr-lg rounded-tl-lg" srcset="">
                                    <div
                                        class="absolute top-0 left-0 bg-gradient-to-t from-black/80 to-transparent  opacity-80 w-full h-full">
                                    </div>
                                </div>
                                <div class="p-4 -mt-16 flex items-center space-x-4 z-50 relative">
                                    <UAvatar size="xl" class="border-2 border-slate-800"
                                        :src="animator?.user?.image_url"
                                        :alt="(animator.external_user_email ? animator.external_user_name : animator.user?.full_name)" />
                                    <div class="flex flex-col items-start">
                                        <h2 class="font-bold capitalize text-white">
                                            {{ animator.external_user_email ?
                                                animator.external_user_name :
                                                animator.user?.full_name }}
                                        </h2>

                                    </div>
                                </div>
                                <span v-if="animator?.external_user_name"
                                    class="inline-flex items-center top-2 left-2 absolute  rounded-md bg-[#ffbb0c]/10 px-2 py-1 text-xs font-medium text-[#ffbb0c] ring-1 ring-inset ring-[#ffbb0c]/20">
                                    {{ $t('External user') }}
                                </span>
                                <span v-if="animator?.user"
                                    class="inline-flex items-center top-2 left-2 absolute rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                                    {{ $t('Internal user') }}
                                </span>

                            </UCard>
                        </div>
                    </template>

                </UTabs>

                <UDivider class="my-4" />
                <div class="flex flex-wrap items-center ">
                    <UBadge v-if="conference?.length <= 0" :label="`Domain ${i}`" color="white" size="xs"
                        class="px-3 m-1 text-[10px]" v-for="i in 4" />
                    <UBadge :label="domain.translated_name" color="white" size="xs" class="px-3 m-1 text-[10px] "
                        v-for="domain in conference?.domains" />
                </div>
            </div>

            <div class="md:col-span-2 sticky top-4">
                <div v-if="conference"
                    class="rounded-2xl flex flex-col h-96 overflow-hidden relative bg-white dark:bg-white/5 p-8 ring-2 ring-green-500 xl:p-10">
                    <img src="~/assets/svg/vectors/pattern-rectangle.svg" draggable="false"
                        class="w-12 absolute top-0 right-0" alt="" srcset="">
                    <div class="flex items-center justify-between">
                        <p class="flex items-baseline gap-x-1">
                            <span v-if="conference?.is_subscribed"
                                class="text-4xl font-bold tracking-tight dark:text-white"><sup>$</sup>
                                {{ conference?.price }}
                            </span>
                            <span v-if="!conference?.is_subscribed"
                                class="text-4xl font-bold tracking-tight dark:text-white"><sup>$</sup>
                                {{ conference?.subscribers_price }}
                            </span>
                        </p>

                    </div>
                    <UDivider class="my-2" />
                    <ul role="list" class="space-y-3 text-sm leading-6 dark:text-gray-300 xl:mt-2 flex-1">
                        <li class="flex items-center gap-x-3">
                            <Icon name="tabler:calendar-event" />
                            <span>{{ $t('Date') }} :</span>
                            <span class="font-bold">{{ $dayjs(conference?.date).format('D/M/YYYY hh:mm A') }}</span>
                        </li>

                        <li class="flex items-center gap-x-3">
                            <Icon name="tabler:users" />
                            <span>{{ $t('Places left') }} :</span>
                            <span class="font-bold" :class="conference?.places_left <= 5 ? 'text-red-600' : ''">{{
                                conference?.places_left }} / {{ conference?.max_attendees }}</span>
                        </li>

                        <li class="flex items-center gap-x-3">
                            <Icon name="tabler:language" />
                            <span>{{ $t('Langage') }} :</span>
                            <span class="font-bold">{{ langage }}</span>
                        </li>

                        <li class="flex items-center gap-x-3">
                            <Icon name="tabler:clock-hour-1" />
                            <span>{{ $t('Duration') }} :</span>
                            <span class="font-bold">{{ conference?.duration }} min</span>
                        </li>

                    </ul>

                    <UButton block :loading="submitLoading" size="lg"
                        class="dark:bg-green-500  disabled:dark:bg-green-400 bg-green-500 hover:bg-green-600 dark:hover:bg-green-600 my-4"
                        v-if="!IsPassed && !conference.is_subscribed && !conferenceStarted && user.role.id != 3"
                        @click="subscribeUser" label="Subscribe" />

                    <UButton block :loading="joinRoomLoading" size="lg"
                        class="dark:bg-green-500  disabled:dark:bg-green-400 bg-green-500 hover:bg-green-600 dark:hover:bg-green-600 my-4"
                        v-if="!IsPassed && conferenceStarted && (conference?.is_subscribed || conference?.is_animator || user.role.id === 3)"
                        @click="joinRoom" label="Join" />


                    <UButton block :disabled="true" size="lg"
                        class="dark:bg-green-500 disabled:dark:bg-green-400 disabled:bg-green-400 text-black bg-green-500 hover:bg-green-600 dark:hover:bg-green-600 my-4"
                        v-if="!IsPassed && !conferenceStarted" :label="countdownLabel" />

                    <div v-if="IsPassed" class="flex justify-center mt-4">
                        <UDivider label="Conference end" />
                    </div>

                    <div v-if="!IsPassed && !conference?.is_subscribed && conferenceStarted"
                        class="flex justify-center mt-6">
                        <UDivider label="Conference Started" />
                    </div>
                </div>
                <USkeleton v-else class="w-full h-96" />
            </div>
        </div>
    </div>

</template>

<script setup>
import { showConference, subscribeConference, joinConference } from '~/composables/store/useConference'
import fallbackImage from '~/assets/img/profile-cover.webp'
import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore()

const route = useRoute()
const id = route.params.id
const conference = ref()
const submitLoading = ref(false)
const joinRoomLoading = ref(false)
const countdownLabel = ref('')
const dayjs = useDayjs()
const now = ref()
const videoPlayer = ref(null)
const user = computed(() => authStore.getAuthUser)

const { $videojs } = useNuxtApp()

definePageMeta({
    layout: 'auth',
    title: 'Conference',
    middleware: ['masterclass']
})


const calculateCountdown = () => {
    const totalSeconds = dayjs(conference.value?.date).diff(now.value, 'second')

    const days = (Math.floor(totalSeconds / (60 * 60 * 24)) < 0) ? 0 : Math.floor(totalSeconds / (60 * 60 * 24))
    const hours = (Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)) < 0) ? 0 : Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    const minutes = (Math.floor((totalSeconds % (60 * 60)) / 60) < 0) ? 0 : Math.floor((totalSeconds % (60 * 60)) / 60)
    const seconds = (totalSeconds % 60 < 0) ? 0 : totalSeconds % 60
    countdownLabel.value = `${days}d ${hours}h ${minutes}m ${seconds}s`;

}

let countdownInterval;

const langage = computed(() => {
    return langs.find(lang => lang.value === conference?.value?.lang)?.label
})

const IsPassed = computed(() => {
    const conferenceDate = dayjs(conference.value?.date).local()
    const conferenceEndDate = conferenceDate.add(conference.value?.duration, 'minutes')
    const currentDate = dayjs()

    return conferenceEndDate.isBefore(currentDate)
})

const conferenceStarted = computed(() => {
    const conferenceDate = dayjs(conference.value?.date).local()
    const currentDate = dayjs()
    return currentDate.isAfter(conferenceDate)
})

const items = [{
    key: 'general',
    label: 'General',
    icon: 'i-heroicons-information-circle',
}, {
    key: 'animator',
    label: 'Animators',
    icon: 'i-heroicons-users',
}]


const langs = [
    {
        label: 'French',
        value: 'fr'
    },
    {
        label: 'English',
        value: 'en'
    },
]

const getDataFromApi = async () => {
    const result = await showConference(id)
    if (result?.success) {
        conference.value = result.data
    }
}

watchEffect(() => {
    getDataFromApi();
})

const subscribeUser = async () => {
    submitLoading.value = true
    const result = await subscribeConference(id)
    if (result) {
        submitLoading.value = false
        window.location.replace(result)
    }
}

const joinRoom = async () => {
    joinRoomLoading.value = true
    const result = await joinConference(conference.value.id)
    console.log(result);

    if (result?.success) {

        await navigateTo(
            {
                path: '/room',
                query: {
                    link: result.data.room.link,
                    token: result.data.token
                }
            }
        )
    } else {
        const { data, statusCode } = result.error
        snackbar.add({
            type: 'error',
            text: `${data?.message}`
        })

    }

    joinRoomLoading.value = false
}


onMounted(() => {
    countdownInterval = setInterval(() => {
        now.value = dayjs();
        calculateCountdown();
    }, 1000);
})



watchEffect((onCleanup) => {
    if (videoPlayer.value && conference.value?.video) {
        const player = $videojs(videoPlayer.value, {
            sources: [{
                src: conference.value?.video,
                type: 'video/mp4'
            }],
            poster: conference.value?.video_thumbnail,
            controls: true,
            preload: 'auto'
        });

        onCleanup(() => {
            player.dispose();
        })

        return;
    }
})



onUnmounted(() => {
    clearInterval(countdownInterval);
})

</script>
