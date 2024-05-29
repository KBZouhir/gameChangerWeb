<script setup>

import { useAuthStore } from '~/stores/auth'

definePageMeta({
    layout: 'guest',
    title: 'Validation'
})

const error = ref(false)
const timeLeft = ref(30)
const authStore = useAuthStore()
const form = ref()
let intervalId = null

const state = reactive({
    code: undefined,
})


onMounted(() => {
    counter()
})

watch(() => state.code, (newValue) => {
    if (newValue) {
        validationOtp()
    }
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
    form.value.clear()

    if (!state.code) {
        error.value = true
        return
    }
    
    await authStore.validationMail(state).then(async (result) => {
        if (result.success) {
            alert('valid')
        } else {
            if (result.data.response.status == 422) {
                let errors = result.data.response.data.errors;
                let formattedErrors = [];

                for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        errors[key].forEach(message => {
                            formattedErrors.push({
                                path: key,
                                message: message
                            });
                        });
                    }
                }
                form.value.setErrors(formattedErrors);
            }
        }

    })

}

async function resendOtp() {
    clearInterval(intervalId);
    timeLeft.value = 30
    counter()
}

</script>

<template>
    <div class="relative bg-slate-100 dark:bg-slate-800 h-full py-12">
        <div class="mx-auto max-w-7xl flex justify-center items-center h-full">
            <UCard class="md:w-2/4 w-full p-8 relative z-50">
                <h2 class="text-3xl font-bold">Verification code</h2>
                <p class="text-blueGray-900 dark:text-slate-300">
                    We just send you a verify code. Check your inbox to get them.
                </p>

                <UForm ref="form" :state="state" @submit="validationOtp" class="mt-8">
                    <div class="mt-8">
                        <UFormGroup name="code">
                            <OtpInput v-model="state.code" :fields="6"></OtpInput>
                            <span class="text-red-500 text-sm" v-if="error">invalid verification code</span>
                        </UFormGroup>
                    </div>


                    <div class="mt-4">
                        <UButton type="submit" block class="px-6 py-3 bg-emerald-400" :loading="useAuthStore.loading"
                            :disabled="state.code == null">Continue</UButton>
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