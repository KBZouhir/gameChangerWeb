<script setup>

import schema from '~/schemas/auth/register';

import { useAuthStore } from '~/stores/auth'

definePageMeta({
    layout: 'guest',
    title: 'Login Page'
})

let showPassword = ref(false)
let showConfirmationPassword = ref(false)
let isPhoneInput = ref(false)
let setAutoFoucs = ref(false)
const form = ref()


const authStore = useAuthStore()

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
    let data = event.data
    form.value.clear()
    await authStore.register(data).then(async (result) => {
        if (result.success) {
            await navigateTo({ path: '/auth/validation' })
        } else {
            if (result.data.response.status == 422) {
                const errors = result.data.response.data.errors;
                const formattedErrors = Object.entries(errors).flatMap(([key, messages]) =>
                    messages.map(message => ({ path: key, message }))
                );
                form.value.setErrors(formattedErrors);
            }
        }

    })
}

</script>

<template>
    <div class="relative bg-slate-100 dark:bg-slate-800 h-full py-12">
        <div class="mx-auto max-w-7xl flex justify-center items-center h-full">
            <UCard class="md:w-2/4 w-full p-8 relative z-50">
                <h2 class="text-3xl font-bold">Sign Up Free</h2>
                <p class="text-blueGray-900 dark:text-slate-300">14 day free access to unlimited resources </p>

                <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit" class="mt-8">

                    <div class="mt-4 grid grid-cols-2 gap-4">
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
                                v-model="state.password" placeholder="********">
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
                                size="lg" v-model="state.password_confirmation" placeholder="********">
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
                        <UButton type="submit" block :loading="authStore.loading" class="px-6 py-3 bg-emerald-400">
                            Create new
                            account</UButton>
                    </div>

                    <UDivider label="" class="my-6 border-blueGray-700" />

                    <p class="mb-6 mt-4 text-center text-sm">Or sign up with:</p>
                    <div class="grid grid-cols-2 gap-6">
                        <MediaButton type="google" @click="googleLogin()" />
                        <MediaButton type="twitter" />
                    </div>

                    <UDivider label="" class="my-6" />
                    <div class="text-center">
                        <NuxtLink to="/auth/login"
                            class="my-6 text-[#001D6C] dark:text-slate-300 hover:underline cursor-pointer text-sm">
                            Already have an account?
                        </NuxtLink>
                    </div>

                </UForm>
            </UCard>
        </div>

        <div class="absolute top-0 dark:hidden">
            <img src="~/assets/svg/particules/gradient.svg" draggable="false" />
        </div>
    </div>
</template>