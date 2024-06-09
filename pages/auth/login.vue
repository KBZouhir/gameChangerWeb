<script setup>
import { useNuxtApp } from '#app';
import { z } from "zod";
import { login, ResendValidationMail, sendOtp } from '~/composables/store/useApiAuth'
import { handleApiError } from '~/composables/useApiError'
const { $auth, $RecaptchaVerifier } = useNuxtApp();

definePageMeta({
    layout: 'guest',
    title: 'Login Page',
    middleware: 'guest'
})

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
});

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
});


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
        console.log(token);
    } catch (error) {
        console.error('Error getting reCAPTCHA token:', error);
    }
};

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
        const { is_completed, is_email_verified, is_phone_verified, phone, email } = result.data.user
        if (is_completed && (is_email_verified || is_phone_verified)) {
            // go to dashboard
             navigateTo('dashboard')
            return
        }

        if (!is_completed && (is_email_verified || is_phone_verified)) {
            // go to complete-profile
            navigateTo('/auth/complete-profile')
            return
        }

        if (!is_email_verified && email && !phone) {
            await ResendValidationMail();
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

}

</script>

<template>
    <div class="relative bg-slate-100 dark:bg-slate-800 h-full py-12">
        <div class="mx-auto max-w-7xl flex justify-center items-center h-full">
            <UCard class="md:w-3/5 w-full p-8 relative z-50">
                <h2 class="text-3xl font-bold">Welcome Back</h2>
                <p class="text-blueGray-900 dark:text-slate-300">Please log in to continue</p>

                <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit" class="mt-8">
                    <div class="mt-8">
                        <UFormGroup label="Email Address" name="email" v-if="!isPhoneInput">
                            <UInput v-model="state.email" size="lg" autofocus placeholder="exmple@mail.com" />
                        </UFormGroup>
                        <UFormGroup name="phone" v-else>
                            <IntlTelInput v-model="state.phone" @hidePhone="hidePhoneComp" />
                        </UFormGroup>

                    </div>

                    <div class="mt-4">
                        <UFormGroup v-slot="{ error }" label="Password" name="password"
                            help="It must be a combination of minimum 8 letters, numbers, and symbols.">
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
                        <UCheckbox class="text-sm" name="notifications" label="Remember me" />
                        <NuxtLink to="forgotpassword"
                            class="text-[#001D6C] dark:text-slate-300 hover:underline cursor-pointer text-sm">
                            Forgot Password?
                        </NuxtLink>
                    </div>

                    <div class="mt-4">
                        <UButton type="submit" block :loading="isLoading" class="px-6 py-3 bg-emerald-400">Log
                            In</UButton>
                    </div>

                    <UDivider label="" class="my-6 border-blueGray-700" />

                    <p class="mb-6 mt-4 text-center text-sm">Or log in with:</p>
                    <div class="grid grid-cols-2 gap-6">
                        <MediaButton type="google" @click="googleLogin()" />
                        <MediaButton type="twitter" />
                    </div>

                    <UDivider label="" class="my-6" />
                    <div class="text-center">
                        <NuxtLink to="/auth/register"
                            class="my-6 text-[#001D6C] dark:text-slate-300 hover:underline cursor-pointer text-sm">
                            No account yet? Sign Up
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