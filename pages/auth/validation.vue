<script setup>

import { validationMail, ResendValidationMail, sendOtp } from '~/composables/store/useApiAuth'
import {useAuthStore} from "~/stores/authStore";
import VOtpInput from "vue3-otp-input";




definePageMeta({
    layout: 'auth',
    title: 'Validation',
    middleware: 'auth'
})

const error = ref(false)
const timeLeft = ref(30)
const form = ref()
const loading = ref(false)
let intervalId = null

const authStore = useAuthStore();

const state = reactive({
    code: undefined,
})


onMounted(() => {
    counter()
})

const padTime = (value) => {
    return String(value).padStart(2, '0');
};

const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60);
    const seconds = timeLeft.value % 60;
    return `${padTime(minutes)}:${padTime(seconds)}`;
});

const counter = () => {
    intervalId = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value -= 1;
        } else {
            clearInterval(intervalId);
        }
    }, 1000);
}


async function validationOtp() {
    loading.value = true
    form.value.setErrors([])
    const result = null
    const { is_email_verified, is_phone_verified, phone, email } = authStore.user

    if (state.code.length <= 5) {
        error.value = true
        return
    }

    if(!is_email_verified && email && !phone) {
        console.log("validation mail");
        result = await validationMail(state);
        loading.value = false
        console.log(result);
    }

    // if (!result.data) {
    //     console.log("oioiezoipoipzaoizaeoizeaoizaeiopzaeopiezaopizaoizaopizeaoipezaoip");
    //     const error = handleApiError(result.error);
    //     if (error.status === 422) {
    //         form.value.setErrors(error.errors);
    //     }
    // }

    // if (result.data?.success) {
    //     await navigateTo({ path: '/' })
    // }
}

async function resendOtp() {
    clearInterval(intervalId);
    timeLeft.value = 30
    counter()

    const result = ResendValidationMail()
    if (!result.data) {
        const error = handleApiError(result.error);
        if (error.status === 422) {
            form.value.setErrors(error.errors);
        }
    }
}

</script>

<template>
    <div class="relative bg-slate-100 dark:bg-slate-800 h-full py-12">
        <div class="mx-auto max-w-7xl flex justify-center items-center h-full">
            <UCard class="md:w-3/5 w-full p-8 relative z-50">
                <h2 class="text-3xl font-bold">Verification code</h2>
                <p class="text-blueGray-900 dark:text-slate-300">
                    We just send you a verify code. Check your inbox to get them.
                </p>
                <UForm ref="form" :state="state" class="mt-8">
                    <div class="mt-8">
                        <UFormGroup name="code">
                            <VOtpInput input-classes="otp-input" separator="" inputType="numeric" :num-inputs="6"
                                v-model:value="state.code" :should-auto-focus="true" :should-focus-order="true" />
                            <span class="text-red-500 text-sm" v-if="error">invalid verification code</span>
                        </UFormGroup>
                    </div>


                    <div class="mt-4">
                        <UButton type="submit" block class="px-6 py-3 bg-emerald-400 dark:text-white dark:bg-green-400 dark:hover:bg-emerald-500 dark:disabled:bg-emerald-300" :loading="loading"
                            @click="validationOtp" :disabled="!state.code || state.code.length < 6">Continue</UButton>
                    </div>

                    <UDivider label="" class="my-6" />
                    <div class="text-center">
                        <span v-if="timeLeft != 0" class="my-6 text-[#001D6C] dark:text-slate-300 text-sm">
                            Re-send code in <span class="font-semibold">{{ formattedTime }}</span>
                        </span>
                        <span v-else @click="resendOtp()"
                            class="my-6 text-[#001D6C] dark:text-slate-300 hover:underline cursor-pointer text-sm">
                            Re-send code
                        </span>
                    </div>
                </UForm>
            </UCard>
        </div>

        <div class="absolute top-0 dark:hidden">
            <img src="~/assets/svg/particules/gradient.svg" draggable="false" />
        </div>
    </div>
</template>

<style>
.otp-input-container {
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 1rem;
    text-align: center;
}

.otp-input {
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 0.25rem;
    border-width: 1px;
    text-align: center;
}

.otp-input:focus {
    outline-color: #4ade80;
}

.otp-input.is-complete {
    background-color: #e4e4e4;
}

.dark .otp-input.is-complete {
    background-color: #1e293b;
}

.dark .otp-input  {
    border-color: #1e293b;
}

.otp-input.error {
    border: 1px solid red !important;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>