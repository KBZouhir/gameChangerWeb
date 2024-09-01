<script setup>
import { useNuxtApp } from '#app';
import { z } from "zod";
import { login, ResendValidationMail, sendOtp, loginWithGoogle } from '~/composables/store/useApiAuth'
import { handleApiError } from '~/composables/useApiError'
const { $auth, $RecaptchaVerifier } = useNuxtApp();

definePageMeta({
    layout: 'guest',
    title: 'Login Page',
    middleware: 'guest'
})

const snackbar = useSnackbar()

let showPassword = ref(false)

const state = reactive({
    email: 'user@app.com',
    phone: undefined,
    password: 'password1A@'
})

let isPhoneInput = ref(false)
let isLoading = ref(false)
let recaptchaToken = ref(null);


const form = ref()

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const hidePhoneComp = () => {
    isPhoneInput.value = false
    state.email = ""
}


onMounted(() => {
    window.recaptchaVerifier = new $RecaptchaVerifier($auth, 'recaptcha-container', {
        'size': 'invisible',
    });
})

const schema = z.object({
    email: z.string().optional().refine((val) => val === "0" || val === undefined || emailRegex.test(val), { message: "Invalid email" }),
    phone: z.string().optional(),
    password: z.string().min(8, "Must be at least 8 characters"),
}).superRefine((data, ctx) => {
    if (data.email !== "0" && !data.email && !data.phone) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Either email or phone must be provided",
            path: ["email", "phone"],
        });
    }
})


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

const hendleLoginData = async (data, result) => {
    const { is_completed, is_email_verified, is_phone_verified, phone, email, role } = data

    if ((is_completed && (is_email_verified || is_phone_verified)) || role.id == 3) {

        snackbar.add({
            type: 'success',
            text: result.data?.message
        })
        await navigateTo('/')
        return
    }

    if (!is_completed && (is_email_verified || is_phone_verified)) {
        // go to complete-profile
        navigateTo('/auth/complete-profile')
        return
    }

    if (!is_email_verified && email && !phone) {
        await ResendValidationMail();
        navigateTo('/auth/validation')
        return
    }

    if (!is_phone_verified && phone && !email) {
        await getRecaptchaToken()
        let payload = {
            phoneNumber: data.phone,
            recaptchaToken: recaptchaToken.value
        }
        await sendOtp(payload);
    }
}

async function onSubmit(event) {
    isLoading.value = true;
    const { data } = event
    const result = await login(data);
    isLoading.value = false;

    if (!result.data) {
        const error = handleApiError(result.error);
        if (error.status === 422) {
            form.value.setErrors(error.errors);
        }

    }
    if (result.data?.success) {
        hendleLoginData(result.data.user, result)
    } else {
        const { error } = result
    }
}

const signInWithGoogle = async () => {
    const result = await loginWithGoogle()

    if (result?.success) {
        hendleLoginData(result.user, result)
    }
}

</script>

<template>
    <div class="relative  h-full py-12">
        <div class="mx-auto max-w-7xl flex justify-center items-center h-full">
            <UCard class="md:w-3/5 w-full p-8 relative overflow-hidden z-50">
                <img src="~/assets/svg/vectors/pattern-rectangle.svg" draggable="false"
                    class="w-12 absolute top-0 right-0" alt="" srcset="">
                <h2 class="text-3xl font-bold">{{ $t('login.welcome_back') }}</h2>
                <p class="text-blueGray-900 dark:text-slate-300">{{ $t('login.please_log_in') }}</p>

                <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit" class="mt-8">
                    <div class="mt-8">
                        <UFormGroup :label="$t('login.email_address')" name="email" v-if="!isPhoneInput">
                            <UInput v-model="state.email" size="lg" autofocus placeholder="example@mail.com" />
                        </UFormGroup>
                        <UFormGroup name="phone" v-else>
                            <IntlTelInput v-model="state.phone" @hidePhone="hidePhoneComp" />
                        </UFormGroup>
                    </div>

                    <div class="mt-4">
                        <UFormGroup v-slot="{ error }" :label="$t('login.password')" name="password"
                            :help="$t('login.password_help')">
                            <UInput :type="(showPassword) ? 'text' : 'password'" id="password" size="lg"
                                v-model="state.password" placeholder="********" autocomplete>
                                <template #trailing>
                                    <UButton @click="togglePassword" :padded="false" color="gray" variant="link"
                                        class="pointer-events-auto "
                                        :class="(error) ? 'text-red-600 hover:text-red-600' : ''"
                                        :icon="(showPassword) ? 'i-heroicons-eye-20-solid' : 'i-heroicons-eye-slash-20-solid'" />
                                </template>
                            </UInput>
                        </UFormGroup>
                    </div>

                    <div class="flex justify-between items-center mt-4">
                        <UCheckbox class="text-sm" name="notifications" :label="$t('login.remember_me')" />
                        <NuxtLink to="forgotpassword"
                            class="text-[#001D6C] dark:text-slate-300 hover:underline cursor-pointer text-sm">
                            {{ $t('login.forgot_password') }}
                        </NuxtLink>
                    </div>

                    <div class="mt-4">
                        <UButton type="submit" block :loading="isLoading" color="green" class="px-6 py-3 ">
                            {{ $t('login.login_button') }}
                        </UButton>
                    </div>

                    <UDivider label="" class="my-6 border-blueGray-700" />

                    <p class="mb-6 mt-4 text-center text-sm">{{ $t('login.or_log_in_with') }}</p>
                    <div class="flex justify-center space-x-4">
                        <UButton @click="signInWithGoogle" size="lg" square
                            class="bg-[#d14938] hover:bg-[#d14938] dark:bg-transparent dark:hover:bg-white/5">
                            <template #leading>
                                <Icon name="tabler:brand-google-filled" size="20" class="text-white" />
                            </template>
                        </UButton>

                        <UButton size="lg" square
                            class="bg-[#1877f2] hover:bg-[#1877f2] dark:bg-transparent dark:hover:bg-white/5">
                            <template #leading>
                                <Icon name="tabler:brand-facebook-filled" size="20"
                                    class="dark:text-white text-white" />
                            </template>
                        </UButton>

                        <UButton size="lg" square
                            class="bg-[#0f6ac5] hover:bg-[#0f6ac5] dark:bg-transparent dark:hover:bg-white/5">
                            <template #leading>
                                <Icon name="tabler:brand-linkedin" size="20" class="text-white" />
                            </template>
                        </UButton>

                        <!-- <MediaButton type="google" @click="googleLogin()" />
                        <MediaButton type="twitter" /> -->
                    </div>

                    <UDivider label="" class="my-6" />
                    <div class="text-center">
                        <NuxtLink to="/auth/register"
                            class="my-6 text-[#001D6C] dark:text-slate-300 hover:underline cursor-pointer text-sm">
                            {{ $t('login.no_account') }}
                        </NuxtLink>
                    </div>

                    <div id="recaptcha-container"></div>
                </UForm>
            </UCard>
        </div>

        <div class="absolute top-0 dark:hidden">
            <img src="~/assets/svg/particules/gradient.svg" draggable="false" />
        </div>
    </div>
</template>