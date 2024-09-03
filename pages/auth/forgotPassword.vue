<script setup>
import schema from '~/schemas/auth/forgotpassword';
import { forgotPassword, VerifyExistencePhone, sendOtp } from '~/composables/store/useApiAuth'
import { handleApiError } from '~/composables/useApiError'

const { $auth, $RecaptchaVerifier } = useNuxtApp();



definePageMeta({
    layout: 'guest',
    title: 'Forgot password',
    middleware: ['guest']
})

const form = ref()
const linkSend = ref(false)
const isPhoneInput = ref(false)
const isLoading = ref(false)
const recaptchaToken = ref()
const snackbar = useSnackbar()

const state = reactive({
    email: undefined,
    phone: undefined,
})


const hidePhoneComp = () => {
    isPhoneInput.value = false
    state.email = ""
}


watch(() => state.email, (newValue) => {
    const regex = /^[+0-9]/;
    if (regex.test(newValue)) {
        isPhoneInput.value = true
        state.phone = state.email
    } else {
        if (isPhoneInput.value) {
            hidePhoneComp()
        }
    }
})


const getRecaptchaToken = async () => {
    try {
        await window.recaptchaVerifier.render();
        const token = await window.recaptchaVerifier.verify();
        recaptchaToken.value = token;
    } catch (error) {
        console.error('Error getting reCAPTCHA token:', error);
    }
}

onMounted(() => {
    window.recaptchaVerifier = new $RecaptchaVerifier($auth, 'recaptcha-container', {
        'size': 'invisible',
    });
})


async function onSubmit(event) {
    let { data } = event;
    isLoading.value = true

    if (isPhoneInput.value) {
        data = { phone: state.phone }

        const result = await VerifyExistencePhone(data);
        if (result?.data?.success) {
            await getRecaptchaToken()
            let payload = {
                phoneNumber: data.phone,
                recaptchaToken: recaptchaToken.value
            }
            await sendOtp(payload);

            await navigateTo({
                path: '/auth/validation',
                query: {
                    forgot_password: 1
                }
            })
            return
        }

        if (!result.data) {
            const error = handleApiError(result.error);
            if (error.status === 422) {
                form.value.setErrors(error.errors);
            }
        }


    } else {
        const result = await forgotPassword(data);
        if (!result.data) {
            const error = handleApiError(result.error);
            if (error.status === 422) {
                form.value.setErrors(error.errors);
            }
        }

        if (result.data?.success) {
            linkSend.value = true
            snackbar.add({
                type: 'success',
                text: result.data?.message
            })
            successAlert(result.data?.status)
        }

        if (result.data?.success == false) {
            snackbar.add({
                type: 'error',
                text: result.data?.message.email
            })
        }
    }
    isLoading.value = false

}

</script>

<template>
    <div class="relative h-screen px-4 md:px-0 py-12">
        <div class="mx-auto max-w-7xl flex justify-center items-center h-full">
            <UCard class="md:w-2/4 w-full p-8 relative overflow-hidden" v-show="!linkSend">
                <img src="~/assets/svg/vectors/pattern-rectangle.svg" draggable="false"
                    class="w-12 absolute top-0 right-0" alt="" srcset="">
                <h2 class="text-3xl font-bold mb-2">Forgotten your password?</h2>
                <p class="text-sm text-blueGray-900 dark:text-slate-300">There is nothing to worry about, we'll send you a
                    message to help you reset your password.</p>

                <UForm ref="form" :state="state" :schema="schema" @submit="onSubmit" class="mt-8">

                    <div class="mt-8">
                        <UFormGroup :label="$t('login.email_address')" name="email" v-if="!isPhoneInput">
                            <UInput v-model="state.email" size="lg" autofocus placeholder="example@mail.com" />
                        </UFormGroup>
                        <UFormGroup name="phone" v-else>
                            <IntlTelInput v-model="state.phone" @hidePhone="hidePhoneComp" />
                        </UFormGroup>
                    </div>


                    <div class="mt-4">
                        <UButton color="green" type="submit" block :loading="isLoading" class="px-6 py-3 ">
                            Send Reset Link</UButton>
                    </div>

                    <UDivider label="" class="my-6" />
                    <div class="text-center">
                        <NuxtLink to="/auth/login"
                            class="my-6 text-[#001D6C] dark:text-slate-300 hover:underline cursor-pointer text-sm">
                            Wait! i Remember my password
                        </NuxtLink>
                    </div>
                    <div id="recaptcha-container"></div>
                </UForm>
            </UCard>

            <UCard class="md:w-2/4 w-full p-8 relative z-50" v-show="linkSend">
                <div class="w-full flex flex-col justify-center items-center">
                    <img class="w-auto h-52" src="~/assets/svg/vectors/check.svg" alt="Game changer">

                    <h3 class="text-2xl font-bold mb-3">Reset password</h3>
                    <p class="text-blueGray-900 dark:text-slate-300 text-center">Reset password link sent on your email.
                    </p>
                </div>




            </UCard>
        </div>

        <div class="absolute top-0 dark:hidden">
            <img src="~/assets/svg/particules/gradient.svg" draggable="false" />
        </div>
    </div>
</template>