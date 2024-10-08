<template>
    <div class="max-w-screen-xl w-full mx-auto py-4">
        <div class="grid grid-cols-1 md:grid-cols-6 gap-6 p-6">
            <div class="md:col-span-4">
                <div class="rounded-lg overflow-hidden mb-6 h-96">
                    <img v-if="masterclass?.image_url" :src="masterclass?.image_url" draggable="false"
                        class="w-full h-full object-cover" alt="" srcset="">

                    <video ref="videoPlayer" class="video-js vjs-default-skin w-full h-full"></video>

                </div>
            </div>

            <div class="md:col-span-2 sticky top-4">
                <div v-if="masterclass"
                    class="rounded-2xl flex flex-col h-96 overflow-hidden relative bg-white dark:bg-white/5 p-8 ring-2 ring-green-500 xl:p-10">
                    <img src="~/assets/svg/vectors/pattern-rectangle.svg" draggable="false"
                        class="w-12 absolute top-0 right-0" alt="" srcset="">
                    <div class="flex items-center justify-between">
                        <p class="flex items-baseline gap-x-1">
                            <span v-if="masterclass?.is_subscribed"
                                class="text-4xl font-bold tracking-tight dark:text-white">
                                {{ masterclass?.price }}
                                <sup>€</sup>
                            </span>
                            <span v-if="!masterclass?.is_subscribed"
                                class="text-4xl font-bold tracking-tight dark:text-white">
                                {{ masterclass?.subscribers_price }}
                                <sup>€</sup>
                            </span>
                        </p>

                        <span v-if="masterclass?.places_left > 0 && !masterclass?.is_subscribed"
                            class="font-semibold text-sm"
                            :class="masterclass?.places_left <= 5 ? 'text-red-600' : 'text-green-400'">
                            {{ masterclass?.places_left }} places left
                        </span>
                        <span v-else-if="masterclass?.places_left == 0" class="font-semibold text-sm text-red-600">
                            {{ $t('No places left') }}
                        </span>

                        <span v-else-if="masterclass?.is_subscribed" class="font-semibold text-sm text-green-400">
                            {{ $t('Subscribed') }}
                        </span>
                    </div>
                    <UDivider class="my-2" />
                    <ul role="list" class="space-y-3 text-sm leading-6 dark:text-gray-300 xl:mt-2 flex-1">
                        <li class="flex items-center gap-x-3">
                            <Icon name="tabler:calendar-event" />
                            <span>{{ $t('Date') }} :</span>
                            <span class="font-bold">{{ $dayjs(masterclass?.date).format('D/M/YYYY hh:mm A') }}</span>
                        </li>


                        <li class="flex items-center gap-x-3">
                            <Icon name="tabler:language" />
                            <span>{{ $t('Langage') }} :</span>
                            <span class="font-bold">{{ langage }}</span>
                        </li>

                        <li class="flex items-center gap-x-3">
                            <Icon name="tabler:clock-hour-1" />
                            <span>{{ $t('Duration') }} :</span>
                            <span class="font-bold">{{ masterclass?.duration }} min</span>
                        </li>

                    </ul>

                    <UButton block :loading="submitLoading" size="lg"
                        class="dark:bg-green-500  disabled:dark:bg-green-400 bg-green-500 hover:bg-green-600 dark:hover:bg-green-600 my-4"
                        v-if="!IsPassed && !masterclass.is_subscribed && !masterclassStarted && user.role.id != 3"
                        @click="subscribeUser" label="Subscribe" />

                    <UButton block :loading="joinRoomLoading" color="green" size="lg" class="my-4"
                        v-if="!IsPassed && (masterclassStarted || countIsDown) && (masterclass?.is_subscribed || masterclass?.is_animator || user.role.id === 3)"
                        @click="joinRoom" label="Join masterclass" />

                    <div v-if="!IsPassed && !countIsDown && (masterclass?.is_subscribed || user.role.id == 3)"
                        class="grid grid-cols-3 border-green-400 p-4 rounded-lg text-green-400">
                        <div class="flex items-start justify-center">
                            <h4 class="text-3xl font-semibold">{{ countdownLabel?.days }}</h4>
                            <sup class="text-xs">Days</sup>
                        </div>

                        <div class="flex items-start justify-center">
                            <h4 class="text-3xl font-semibold">{{ countdownLabel?.hours }}</h4>
                            <sup class="text-xs">Hours</sup>
                        </div>

                        <div class="flex items-start justify-center">
                            <h4 class="text-3xl font-semibold">{{ countdownLabel?.minutes }}</h4>
                            <sup class="text-xs">Min</sup>
                        </div>
                    </div>

                    <div v-if="IsPassed" class="flex justify-center mt-4">
                        <UDivider label="Masterclass end" />
                    </div>

                    <div v-if="!IsPassed && !masterclass?.is_subscribed && masterclassStarted"
                        class="flex justify-center mt-6">
                        <UDivider label="Masterclass Started" />
                    </div>
                </div>
                <USkeleton v-else class="w-full h-96" />
            </div>
        </div>

        <UTabs :items="items" class="mb-8">
            <template #item="{ item }">
                <div v-if="item.key === 'general'">
                    <div class="flex justify-between pt-6">
                        <div>
                            <UAvatarGroup size="sm" :max="4" class="mb-2">
                                <UAvatar v-for="attendant in masterclass?.user_attendees" :key="attendant.id"
                                :src="attendant.image_url"
                                :alt="attendant.full_name"
                                />
                            </UAvatarGroup>
                            <div class="mb-2">
                                <h1 class="text-2xl font-bold">{{ masterclass?.title }}</h1>
                            </div>

                        </div>
                        <div
                            class="p-4 w-16 h-16 bg-green-400 text-black rounded-md flex flex-col justify-center items-center">
                            <p class="text-2xl font-semibold ">{{ $dayjs(masterclass?.date).format('DD') }}</p>
                            <p class="text-md font-semibold ">{{ $dayjs(masterclass?.date).format('MMM') }}</p>
                        </div>
                    </div>

                    <div class="mb-6">
                        <p>{{ masterclass?.short_description }}</p>
                    </div>

                    <div>
                        <h2 class="text-xl font-bold mb-2">{{ $t('Description') }}</h2>
                        <p v-html="masterclass?.full_description"></p>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-4 my-4" v-if="item.key === 'animator'">
                    <UCard class="relative" :ui="{ body: 'p-0' }" v-for="animator in masterclass?.animators ">
                        <div class="h-44 overflow-hidden relative">
                            <img :src="fallbackImage" alt="" class="rounded-tr-lg rounded-tl-lg h-full object-cover"
                                srcset="">
                            <div
                                class="absolute top-0 left-0 bg-gradient-to-t from-black to-transparent  opacity-80 w-full h-full">
                            </div>
                        </div>
                        <div class="p-4 -mt-16 flex items-center space-x-4 z-50 relative">
                            <UAvatar size="xl" class="border-2 border-slate-800" :src="animator?.user?.image_url"
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
            <UBadge v-if="masterclass?.length <= 0" :label="`Domain ${i}`" color="white" size="xs"
                class="px-3 m-1 text-[10px]" v-for="i in 4" />
            <UBadge :label="domain.translated_name" color="white" size="xs" class="px-3 m-1 text-[10px] "
                v-for="domain in masterclass?.domains" />
        </div>
    </div>

</template>

<script setup>
import { showMasterClass, subscribeMasterClass, joinMasterClass } from '~/composables/store/useMasterClass'
import fallbackImage from '~/assets/img/profile-cover.webp'
import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore()

const route = useRoute()
const id = route.params.id
const masterclass = ref()
const submitLoading = ref(false)
const joinRoomLoading = ref(false)
const countdownLabel = ref()
const countIsDown = ref(false)
const dayjs = useDayjs()
const now = ref()
const videoPlayer = ref(null)
const user = computed(() => authStore.getAuthUser)



const { $videojs } = useNuxtApp()

definePageMeta({
    layout: 'auth',
    title: 'Masterclass',
    middleware: ['masterclass']
})


const calculateCountdown = () => {
    const totalSeconds = dayjs(masterclass.value?.date).diff(now.value, 'second')

    const days = (Math.floor(totalSeconds / (60 * 60 * 24)) < 0) ? 0 : Math.floor(totalSeconds / (60 * 60 * 24))
    const hours = (Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)) < 0) ? 0 : Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    const minutes = (Math.floor((totalSeconds % (60 * 60)) / 60) < 0) ? 0 : Math.floor((totalSeconds % (60 * 60)) / 60)
    const seconds = (totalSeconds % 60 < 0) ? 0 : totalSeconds % 60
    if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
        countIsDown.value = true
    }
    countdownLabel.value = {
        days,
        hours,
        minutes
    }
}

let countdownInterval;

const langage = computed(() => {
    return langs.find(lang => lang.value === masterclass?.value?.lang)?.label
})

const IsPassed = computed(() => {
    const masterclassDate = dayjs(masterclass.value?.date).local()
    const masterclassEndDate = masterclassDate.add(masterclass.value?.duration, 'minutes')
    const currentDate = dayjs()

    return masterclassEndDate.isBefore(currentDate)
})

const masterclassStarted = computed(() => {
    const masterclassDate = dayjs(masterclass.value?.date).local()
    const currentDate = dayjs()
    return currentDate.isAfter(masterclassDate)
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
    const result = await showMasterClass(id)
    if (result?.success) {
        masterclass.value = result.data
    }
}

watchEffect(() => {
    getDataFromApi();
})

const subscribeUser = async () => {
    submitLoading.value = true
    const result = await subscribeMasterClass(id)
    if (result) {
        submitLoading.value = false
        window.location.replace(result)
    }
}

const joinRoom = async () => {
    joinRoomLoading.value = true
    const result = await joinMasterClass(masterclass.value.id)
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
    if (videoPlayer.value && masterclass.value?.video) {
        const player = $videojs(videoPlayer.value, {
            sources: [{
                src: masterclass.value?.video,
                type: 'video/mp4'
            }],
            poster: masterclass.value?.video_thumbnail,
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
