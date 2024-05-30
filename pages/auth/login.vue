<script setup>
import { z } from "zod";
import { useAuthStore } from '~/stores/auth'

definePageMeta({
    layout: 'guest',
    title: 'Login Page'
})

let showPassword = ref(false)
const authStore = useAuthStore()

const state = reactive({
    email: undefined,
    phone: undefined,
    password: undefined
})

let isPhoneInput = ref(false)
const form = ref()


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const hidePhoneComp = () => {
    isPhoneInput.value = false
    state.email = ""
}

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

async function onSubmit(event) {
    let data = event.data
    form.value.clear()
    await authStore.login(data).then(async (result) => {
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

                    <div class="flex justify-between items-center mt-4">
                        <UCheckbox class="text-sm" name="notifications" label="Remember me" />
                        <NuxtLink to="forgotpassword"
                            class="text-[#001D6C] dark:text-slate-300 hover:underline cursor-pointer text-sm">
                            Forgot Password?
                        </NuxtLink>
                    </div>

                    <div class="mt-4">
                        <UButton type="submit" block class="px-6 py-3 bg-emerald-400">Log In</UButton>
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
                </UForm>
            </UCard>
        </div>

        <div class="absolute top-0 dark:hidden">
            <img src="~/assets/svg/particules/gradient.svg" draggable="false" />
        </div>
    </div>
</template>