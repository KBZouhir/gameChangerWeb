<template>
    <div class="relative flex items-center h-full py-12">
        <div class="mx-auto max-w-screen-md flex justify-center items-center p-4">
            <UCard class="md:w-3/5 w-full p-8 relative z-50 overflow-hidden">
                <img src="~/assets/svg/particules/rounded-pattern.svg" width="50" class="mb-4 absolute top-0 right-0"
                    alt="" srcset="">
                <div class="flex flex-col justify-center items-center">
                    <img v-if="$colorMode.value == 'light'" src="~/assets/svg/vectors/check.svg" width="240" class="mb-8" alt="" srcset="">
                    <img v-if="$colorMode.value == 'dark'" src="~/assets/svg/vectors/check-white.svg" width="240" class="mb-8" alt="" srcset="">
                    <h2 class="text-2xl font-bold mb-6 ">{{ $t('Subscribe successfully') }}</h2>
                    <p class="text-blueGray-900 text-sm dark:text-slate-300">
                        {{ $t('You have subscribed to the master class with success, you can now go to the page') }}
                    </p>
                </div>
                
                <nuxt-link to="/masterclass/4">
                    <UButton block class="py-4 uppercase dark:bg-green-500 disabled:dark:bg-green-400 bg-green-500 hover:bg-green-600 dark:hover:bg-green-600 my-4" size="lg">{{ $t('Start now') }}</UButton>
                </nuxt-link>
                <img src="~/assets/svg/particules/pattern.svg" class="mb-4 w-full absolute -bottom-4 left-0" alt=""
                    srcset="">
            </UCard>
        </div>

        <div class="absolute top-0 dark:hidden">
            <img src="~/assets/svg/particules/gradient.svg" draggable="false" />
        </div>
    </div>
</template>


<script setup>
import { apiSubscription } from "~/composables/store/useSubscriptions";
import { useSubscriptionsStore } from "~/stores/subscriptions";
import { handleApiError } from '~/composables/useApiError'


const subscriptionStore = useSubscriptionsStore();

const getDataFromApi = async () => {
    await apiSubscription();
};

watchEffect(() => {
    getDataFromApi();
});


definePageMeta({
    layout: 'auth',
    title: 'Login Page',
    middleware: ''
})

const selectedPlan = ref()


// const plans = computed(() => subscriptionStore.getPlans);


const plans = [
    { id: 0, name: 'Basic', isBest: false },
    { id: 1, name: 'Basic 01', isBest: true },
]

</script>