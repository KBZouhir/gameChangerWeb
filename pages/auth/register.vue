<script setup>
import schema from '~/schemas/auth/register';

import { register, sendOtp } from '~/composables/store/useApiAuth'
import { handleApiError } from '~/composables/useApiError'
import { useNuxtApp } from '#app';

definePageMeta({
    layout: 'guest',
    title: 'Login Page',
    middleware: ['guest']
})

const { executeRecaptcha } = useGoogleRecaptcha()

let showPassword = ref(false)
let showConfirmationPassword = ref(false)
let isPhoneInput = ref(false)
let setAutoFoucs = ref(false)
let recaptchaToken = ref(null);
let isLoading = ref(false)
const form = ref()


const state = reactive({
    first_name: undefined,
    last_name: undefined,
    email: 'jomuraf@mailinator.com',
    phone: undefined,
    password: undefined,
    password_confirmation: undefined,
})


const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const toggleConfirmationPassword = () => {
    showConfirmationPassword.value = !showConfirmationPassword.value
}

const hidePhoneComp = () => {
    isPhoneInput.value = false
    state.email = ""
    setAutoFoucs.value = true
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

async function onSubmit(event) {
    const { data } = event
    isLoading.value = true
    const result = await register(data);
    isLoading.value = false

    if (!result.data) {
        const error = handleApiError(result.error);
        if (error.status === 422) {
            console.log(error.errors);
            form.value.setErrors(error.errors);
        }
    }

    if (result.data?.success) {
        if (data.email == "0") {
            const { token } = await executeRecaptcha('submit')
            let payload = {
                phoneNumber: state.phone,
                recaptchaToken: token
            }

            const result = await sendOtp(payload);
            console.log("result", result);
        }
        await navigateTo('/auth/validation')
    }
}

</script>

<template>
    <div class="relative min-h-screen py-12 pb-6">
        <div class="mx-3 md:mx-auto max-w-4xl flex justify-center items-center h-full">
            <UCard class="md:w-3/5 w-full p-8 relative">
                <h2 class="text-3xl font-bold">Sign Up Free</h2>
                <p class="text-blueGray-900 dark:text-slate-300">14 day free access to unlimited resources </p>

                <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit" class="mt-8">

                    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <UFormGroup label="First name" name="first_name">
                            <UInput v-model="state.first_name" size="lg" autofocus placeholder="First name" />
                        </UFormGroup>

                        <UFormGroup label="Last name" name="last_name">
                            <UInput v-model="state.last_name" size="lg" placeholder="Last name" />
                        </UFormGroup>
                    </div>

                    <div class="mt-4">
                        <UFormGroup label="Email Address" name="email" v-if="!isPhoneInput">
                            <UInput v-model="state.email" size="lg" :autofocus="setAutoFoucs"
                                placeholder="exmple@mail.com" />
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

                    <div class="mt-4">
                        <UFormGroup v-slot="{ error }" label="Password confirmation" name="password_confirmation"
                            help="It must be a combination of minimum 8 letters, numbers, and symbols.">
                            <UInput :type="(showConfirmationPassword) ? 'text' : 'password'" id="password_confirmation"
                                size="lg" v-model="state.password_confirmation" placeholder="********" autocomplete>
                                <template #trailing>
                                    <UButton @click="toggleConfirmationPassword" :padded="false" color="gray"
                                        variant="link" class="pointer-events-auto "
                                        :class="(error) ? 'text-red-600 hover:text-red-600' : ''"
                                        :icon="(showConfirmationPassword) ? 'i-heroicons-eye-20-solid' : 'i-heroicons-eye-slash-20-solid'" />
                                </template>
                            </UInput>
                        </UFormGroup>
                    </div>

                    <div class="flex justify-between items-center mt-4">
                        <UCheckbox class="text-sm" name="notifications" label="Remember me" />
                    </div>

                    <div class="mt-4">
                        <UButton type="submit" color="green" block :loading="isLoading" class="px-6 py-3 ">
                            Create new account
                        </UButton>
                    </div>


                    <UDivider label="" class="my-6" />
                    <div class="text-center">
                        <NuxtLink to="/auth/login"
                            class="my-6 text-[#001D6C] dark:text-slate-300 hover:underline cursor-pointer text-sm">
                            Already have an account?
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