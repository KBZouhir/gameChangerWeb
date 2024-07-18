<script setup>
import { z } from "zod";
import { resetPassword } from '~/composables/store/useApiAuth'
import { handleApiError } from '~/composables/useApiError'
import schema from '~/schemas/auth/resetPassword'

definePageMeta({
    layout: 'guest',
    title: 'Login Page',

})

const route = useRoute()


let showPassword = ref(false)
let showConfirmationPassword = ref(false)

let isLoading = ref(false)

const state = reactive({
    token: route.query.token,
    email: route.query.email,
    password: undefined,
    password_confirmation: undefined
})

const form = ref()

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const toggleConfirmationPassword = () => {
    showConfirmationPassword.value = !showConfirmationPassword.value
}

async function onSubmit(event) {
    const { data } = event;
    const result = await resetPassword(state);

    if (!result.data) {
        const error = handleApiError(result.error);
        if (error.status === 422) {
            form.value.setErrors(error.errors);
        }
    }

    if (result.data?.success) {
        await navigateTo({ path: '/' });
    }

    if (!result.data?.success) {
        warningAlert(result.data?.status);
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
                        <UFormGroup label="Email Address" name="email">
                            <UInput v-model="state.email" disabled size="lg" autofocus placeholder="example@mail.com" />
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
                        <NuxtLink to="forgotpassword"
                            class="text-[#001D6C] dark:text-slate-300 hover:underline cursor-pointer text-sm">
                            Forgot Password?
                        </NuxtLink>
                    </div>

                    <div class="mt-4">
                        <UButton type="submit" block :loading="isLoading" class="px-6 py-3 bg-emerald-400">
                            Reset password
                        </UButton>
                    </div>

                    <UDivider label="" class="my-6" />
                    <div class="text-center">
                        <NuxtLink to="/auth/login"
                            class="my-6 text-[#001D6C] dark:text-slate-300 hover:underline cursor-pointer text-sm">
                            Wait! i Remember my password
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