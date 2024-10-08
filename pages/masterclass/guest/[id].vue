<template>
    <div class="max-w-screen-xl w-full mx-auto py-4">
        <div class="grid grid-cols-1 md:grid-cols-6 gap-6 p-6">
            <div class="md:col-span-4">
                <div class="rounded-lg overflow-hidden mb-6 h-96">
                    <img v-if="masterclass?.image_url" :src="masterclass?.image_url" draggable="false"
                        class="w-full h-full object-cover" alt="" srcset="">

                    <video ref="videoPlayer" class="video-js vjs-default-skin w-full h-full"></video>

                </div>

                <UTabs :items="items" class="mb-8">
                    <template #item="{ item }">
                        <div v-if="item.key === 'general'">
                            <div class="flex justify-between pt-6">
                                <div>
                                    <div class="flex items-center space-x-2 text-xs mb-4">
                                        <span>By:</span>
                                        <div class="flex items-center space-x-1">
                                            <div class="w-4 h-4 rounded-full border dark:border-gray-500">
                                                <img :src="masterclass?.user?.image_url" alt="" srcset="">
                                            </div>

                                            <span>{{ masterclass?.user?.full_name }}</span>

                                        </div>
                                    </div>

                                    <div class="mb-8">
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
                                <h2 class="text-xl font-bold mb-2">Short description</h2>
                                <p>{{ masterclass?.short_description }}</p>
                            </div>

                            <div>
                                <h2 class="text-xl font-bold mb-2">Description</h2>
                                <p v-html="masterclass?.full_description"></p>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-4 my-4" v-if="item.key === 'animator'">
                            <UCard class="relative" :ui="{ body: 'p-0' }" v-for="animator in masterclass?.animators ">
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
                                    class="inline-flex items-center top-2 left-2 absolute  rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
                                    External user
                                </span>
                                <span v-if="animator?.user"
                                    class="inline-flex items-center top-2 left-2 absolute rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                                    Internal user
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

            <div class="md:col-span-2 sticky top-4 ">
                <div v-if="masterclass">
                    <div
                        class="rounded-2xl h-96 overflow-hidden relative bg-white dark:bg-white/5 p-8 ring-2 ring-green-500 xl:p-10 mb-4">
                        <img src="~/assets/svg/vectors/pattern-rectangle.svg" draggable="false"
                            class="w-12 absolute top-0 right-0" alt="" srcset="">
                        <div class="flex items-center justify-between">
                            <p class="flex items-baseline gap-x-1">
                                <span class="text-4xl font-bold tracking-tight dark:text-white"><sup>$</sup>
                                    {{ masterclass?.price }}
                                </span>
                            </p>

                        </div>
                        <UDivider class="my-2" />
                        <ul role="list" class="space-y-3 text-sm leading-6 dark:text-gray-300 xl:mt-2">
                            <li class="flex items-center gap-x-3">
                                <Icon name="tabler:calendar-event" />
                                <span>{{ $t('Date') }} :</span>
                                <span class="font-bold">{{ $dayjs(masterclass?.date).format('D/M/YYYY hh:mm A')
                                    }}</span>
                            </li>

                            <li class="flex items-center gap-x-3">
                                <Icon name="tabler:users" />
                                <span>{{ $t('Places left') }} :</span>
                                <span class="font-bold" :class="masterclass?.places_left <= 5 ? 'text-red-600' : ''">{{
                                    masterclass?.places_left }} / {{ masterclass?.max_attendees }}</span>
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

                        <div class="py-4">
                            <UButton block :loading="submitLoading" size="lg"
                                class="dark:bg-green-500 hidden disabled:dark:bg-green-400 bg-green-500 hover:bg-green-600 dark:hover:bg-green-600 my-4"
                                v-if="!IsPassed && !masterclassGotStarted" @click="subscribeUser" label="Subscribe" />


                            <UButton block @click="joinMasterClassModal = true" size="lg"
                                class="dark:bg-green-500 disabled:dark:bg-green-400 disabled:bg-green-400 text-black bg-green-500 hover:bg-green-600 dark:hover:bg-green-600 my-4"
                                v-if="!IsPassed" label="Join" />

                            <UButton v-if="!IsPassed && (!paymentSuccess || paymentSuccess != 1) && !masterclassStarted"
                                block variant="outline" color="green" :loading="submitLoading" size="lg" class="my-4"
                                @click="subscribeUser" label="Subscribe" />

                            <div v-if="IsPassed" class="flex justify-center mt-4">
                                <UDivider label="Masterclass end" />
                            </div>

                            <div v-if="!IsPassed">
                                <UDivider label="" class="mb-2" />
                                <UButton block @click="resendCredentialsModal = true" variant="link" color="green"
                                    label="Resend Credentials" />
                            </div>
                        </div>

                    </div>

                    <UAlert v-if="paymentSuccess" icon="i-heroicons-check" color="green" variant="subtle"
                        title="Payment successfully"
                        description="Please check your email for the credentials to join the masterclass." />
                </div>

                <USkeleton v-else class="w-full h-96" />
            </div>
        </div>

        <UModal v-model="isOpen" prevent-close>
            <UCard class="w-full p-8 relative z-50 overflow-hidden">
                <img src="~/assets/svg/vectors/pattern-rectangle.svg" draggable="false"
                    class="w-12 absolute top-0 right-0" alt="" srcset="">
                <div class="flex flex-col items-center justify-center ">
                    <img class="w-1/3 flex dark:hidden" src="~/assets/svg/vectors/masterclass.svg" alt="">
                    <img class="w-1/3 hidden dark:flex" src="~/assets/svg/vectors/masterclass-white.svg" alt="">
                    <h2 class="text-xl md:text-3xl font-bold">{{ $t('Subscribe to masterclass') }}</h2>
                    <p class="text-gray-600 dark:text-slate-300 text-sm text-center">{{
                        $t( 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry') }}
                    </p>
                </div>

                <UForm ref="form" :schema="schema" :state="subscribeState" @submit="submitSubscribeForm"
                    class="mt-8 space-y-4">
                    <UFormGroup label="Name" name="name">
                        <UInput size="lg" v-model="subscribeState.name" />
                    </UFormGroup>

                    <UFormGroup label="Email" name="email">
                        <UInput size="lg" type="email" v-model="subscribeState.email" />
                    </UFormGroup>


                    <div class="flex flex-col justify-between space-y-2">
                        <UButton block :loading="loadingSubmit" size="lg"
                            :color="$colorMode.value == 'dark' ? 'green' : 'primary'" type="submit">
                            {{ $t('Submit') }}
                        </UButton>
                        <UButton block @click="isOpen = false" color="red" size="lg">
                            {{ $t('Close') }}
                        </UButton>
                    </div>
                </UForm>
            </UCard>
        </UModal>


        <UModal v-model="resendCredentialsModal" prevent-close>
            <UCard class="w-full p-8 relative z-50 overflow-hidden">
                <img src="~/assets/svg/vectors/pattern-rectangle.svg" draggable="false"
                    class="w-12 absolute top-0 right-0" alt="" srcset="">
                <div class="flex flex-col items-center justify-center ">
                    <img class="w-1/3 flex dark:hidden" src="~/assets/svg/vectors/masterclass.svg" alt="">
                    <img class="w-1/3 hidden dark:flex" src="~/assets/svg/vectors/masterclass-white.svg" alt="">
                    <h2 class="text-xl md:text-3xl font-bold">{{ $t('Resend Credentials') }}</h2>
                    <p class="text-blueGray-900 dark:text-slate-300">{{ $t('login.please_log_in') }}</p>
                </div>

                <UForm ref="form" :schema="resendCredentialSchema" :state="resendCredentialState"
                    @submit="submitResendCredentials" @error="onError" class="mt-8 space-y-4">

                    <UFormGroup label="Email" name="email">
                        <UInput size="lg" type="email" v-model="resendCredentialState.email" />
                    </UFormGroup>
                    <UFormGroup name="external">
                        <UCheckbox v-model="external" color="green" name="external" label="Animator" />
                    </UFormGroup>


                    <div class="flex flex-col justify-between space-y-2">
                        <UButton block :loading="loadingSubmit" size="lg"
                            :color="$colorMode.value == 'dark' ? 'green' : 'primary'" type="submit">
                            {{ $t('Submit') }}
                        </UButton>
                        <UButton block @click="resendCredentialsModal = false" color="red" size="lg">
                            {{ $t('Close') }}
                        </UButton>
                    </div>
                </UForm>
            </UCard>
        </UModal>

        <UModal v-model="joinMasterClassModal">
            <UCard class="w-full p-0 pt-0 relative z-50 overflow-hidden">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            {{ $t('Join to masterclass') }}
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 z-50"
                            @click="joinMasterClassModal = false" />
                    </div>
                </template>
                <img src="~/assets/svg/vectors/pattern-rectangle.svg" draggable="false"
                    class="w-12 absolute top-0 right-0" alt="" srcset="">
                <div class="flex flex-col items-center justify-center ">
                    <img class="w-1/3 flex dark:hidden" src="~/assets/svg/vectors/masterclass.svg" alt="">
                    <img class="w-1/3 hidden dark:flex" src="~/assets/svg/vectors/masterclass-white.svg" alt="">
                    <h2 class="text-xl md:text-3xl font-bold">{{ $t('Join to masterclass') }}</h2>
                    <p class="text-blueGray-900 dark:text-slate-300">{{ $t('login.please_log_in') }}</p>
                </div>

                <UForm ref="form" :schema="externalUserJoinSchema" :state="externalUserJoinState"
                    @submit="submitExternalUserJoin" class="mt-8 space-y-4 p-4">

                    <UFormGroup label="Email" name="email">
                        <UInput size="lg" type="email" v-model="externalUserJoinState.email" />
                    </UFormGroup>

                    <UFormGroup label="Password" name="password">
                        <UInput size="lg" type="password" v-model="externalUserJoinState.password" />
                    </UFormGroup>

                    <UFormGroup name="external">
                        <UCheckbox v-model="external" color="green" name="external" label="Animator" />
                    </UFormGroup>

                    <div class="flex flex-col justify-between space-y-2">
                        <UButton v-if="masterclassStarted && !IsPassed" block :loading="loadingSubmit" size="lg"
                            :color="$colorMode.value == 'dark' ? 'green' : 'primary'" type="submit">
                            {{ $t('Submit') }}
                        </UButton>

                        <UButton :disabled="true" v-if="!masterclassStarted && !IsPassed" block :loading="loadingSubmit"
                            size="lg" :color="$colorMode.value == 'dark' ? 'green' : 'primary'" type="submit">
                            {{ $t('Masterclass started') }}: {{ countdownLabel }}
                        </UButton>
                    </div>
                    <div v-if="!IsPassed">
                        <UDivider label="" class="my-2" />
                        <UButton block @click="{ joinMasterClassModal = false; resendCredentialsModal = true; }"
                            variant="link" color="green" label="Resend Credentials" />
                    </div>
                </UForm>
            </UCard>
        </UModal>

    </div>
</template>

<script setup>
import { showMasterClass, externalUserJoin, guestSubscribeMasterClass, resendExternalCredentials, resendExternalAnimatorCredentials, externalAnimatorJoin } from '~/composables/store/useMasterClass'
import fallbackImage from '~/assets/img/profile-cover.webp'
import { z } from "zod"


const route = useRoute()
const id = route.params.id
const masterclass = ref()
const submitLoading = ref(false)
const countdownLabel = ref('');
const dayjs = useDayjs()
const now = ref()
const form = ref()
const loadingSubmit = ref(false)
const isOpen = ref(false)
const resendCredentialsModal = ref(false)
const joinMasterClassModal = ref(false)
const paymentSuccess = route.query?.payment_successfully
const masterclassGotStarted = ref(false)
const external = ref(false)
const videoPlayer = ref(null)

const snackbar = useSnackbar();
const { $videojs } = useNuxtApp()

definePageMeta({
    
    title: 'Masterclass',
})


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
    icon: 'i-heroicons-eye-dropper',
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


const schema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
});

const resendCredentialSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email address"),
});

const externalUserJoinSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    password: z.string().min(8, "Must be at least 8 characters"),
});

const subscribeState = reactive({
    name: '',
    email: ''
})

const resendCredentialState = reactive({
    email: ''
})

const externalUserJoinState = reactive({
    email: '',
    password: ''
})


const calculateCountdown = () => {
    const totalSeconds = dayjs(masterclass.value?.date).diff(now.value, 'second')

    const days = (Math.floor(totalSeconds / (60 * 60 * 24)) < 0) ? 0 : Math.floor(totalSeconds / (60 * 60 * 24))
    const hours = (Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)) < 0) ? 0 : Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    const minutes = (Math.floor((totalSeconds % (60 * 60)) / 60) < 0) ? 0 : Math.floor((totalSeconds % (60 * 60)) / 60)
    const seconds = (totalSeconds % 60 < 0) ? 0 : totalSeconds % 60

    countdownLabel.value = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
        masterclassGotStarted.value = true
    }
}



watch(masterclassGotStarted, async (newValue, oldValue) => {
    if (newValue) {
        clearInterval(countdownInterval)
    }
})

const getDataFromApi = async () => {
    const result = await showMasterClass(id)
    if (result?.success) {
        masterclass.value = result.data
    }
}

watchEffect(() => {
    getDataFromApi();
})


const submitSubscribeForm = async () => {
    loadingSubmit.value = true;

    try {
        const result = await guestSubscribeMasterClass(id, subscribeState)
        loadingSubmit.value = false

        if (result.status) {
            form.value.clear()
            window.location.replace(result.data)
        } else {
            const { data } = result.data
            snackbar.add({
                type: 'error',
                text: data.message
            })

        }
    } catch (error) {
        loadingSubmit.value = false
        console.error('Error during subscription:', error)
    }
}

const submitResendCredentials = async () => {
    loadingSubmit.value = true;
    let result
    try {
        if (external.value) {
            result = await resendExternalAnimatorCredentials(id, resendCredentialState)
        } else {
            result = await resendExternalCredentials(id, resendCredentialState)
        }


        if (result?.success) {
            console.log(result.data)
        } else {
            const { data, statusCode } = result.data
            snackbar.add({
                type: 'error',
                text: `${data?.message}`
            })
        }

    } catch (error) {
        console.error('Error during resend credentials:', error)
    }
    loadingSubmit.value = false
}

const submitExternalUserJoin = async () => {
    loadingSubmit.value = true;
    let result
    try {
        if (external.value) {
            result = await externalAnimatorJoin(id, externalUserJoinState)
        } else {
            result = await externalUserJoin(id, externalUserJoinState)
        }

        loadingSubmit.value = false

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
            const { data, statusCode } = result.data
            snackbar.add({
                type: 'error',
                text: `${data?.message}`
            })

        }

    } catch (error) {
        loadingSubmit.value = false
        console.error('Error during subscription:', error)
    }
}


async function onError(event) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const subscribeUser = async () => {
    isOpen.value = true
}

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


onMounted(() => {
    setInterval(() => {
        now.value = dayjs();
        calculateCountdown();
    }, 1000);
})


onUnmounted(() => {
    clearInterval(countdownInterval);
})

</script>
