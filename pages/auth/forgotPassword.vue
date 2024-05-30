<script setup>
import schema from '~/schemas/auth/forgotpassword';
import { useAuthStore } from '~/stores/auth'

definePageMeta({
    layout: 'guest',
    title: 'Forgot password'
})

const authStore = useAuthStore()
const form = ref()
const linkSend = ref(false)
const state = reactive({
    email: undefined,
    phone: undefined,
    password: undefined
})


async function onSubmit(event) {
    let data = event.data;
    form.value.clear();
    const result = await authStore.sendResetPasswordLink(data);
    if (result.success) {
        if (result.data.data.success) {
            linkSend.value = {
                status: true,
                message: result.data.data.message
            }
        }
    } else {
        if (result.data.response.status === 422) {
            const errors = result.data.response.data.errors;
            const formattedErrors = Object.entries(errors).flatMap(([key, messages]) =>
                messages.map(message => ({ path: key, message }))
            );
            form.value.setErrors(formattedErrors);
        }
    }
}

</script>

<template>
    <div class="relative bg-slate-100 dark:bg-slate-800 h-full py-12">
        <div class="mx-auto max-w-7xl flex justify-center items-center h-full">
            <UCard class="md:w-2/4 w-full p-8 relative z-50" v-show="!linkSend.status">
                <h2 class="text-3xl font-bold">Forgotten your password?</h2>
                <p class="text-blueGray-900 dark:text-slate-300">There is nothing to worry about, we'll send you a
                    message to help you reset your password.</p>

                <UForm ref="form" :state="state" :schema="schema" @submit="onSubmit" class="mt-8">
                    <div class="mt-8">
                        <UFormGroup label="Email Address" name="email">
                            <UInput v-model="state.email" size="lg" autofocus placeholder="exmple@mail.com" />
                        </UFormGroup>
                    </div>


                    <div class="mt-4">
                        <UButton type="submit" block class="px-6 py-3 bg-emerald-400">Send Reset Link</UButton>
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

            <UCard class="md:w-2/4 w-full p-8 relative z-50" v-show="linkSend.status">
                <div class="w-full flex flex-col justify-center items-center">
                    <img class="w-auto h-52" src="~/assets/svg/vectors/check.svg" alt="Game changer">

                    <h3 class="text-2xl font-bold mb-3">Reset password</h3>
                    <p class="text-blueGray-900 dark:text-slate-300 text-center">{{ linkSend.message }}</p>
                </div>




            </UCard>
        </div>

        <div class="absolute top-0 dark:hidden">
            <img src="~/assets/svg/particules/gradient.svg" draggable="false" />
        </div>
    </div>
</template>