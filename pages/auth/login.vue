<script setup>

definePageMeta({
    layout: 'guest',
    title: 'Login Page'
})

let showPassword = ref(false)

const state = reactive({
    email: undefined,
    phone: undefined,
    password: undefined
})

let isPhoneInput = ref(false)


const togglePassword = () => {
    showPassword.value = !showPassword.value
}

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
        hidePhoneComp()
    }
})

async function onSubmit(event) {
    console.log(event);
}


</script>

<template>
    <div class="relative bg-slate-100 dark:bg-slate-800 h-full py-12">
        <div class="mx-auto max-w-7xl flex justify-center items-center h-full">
            <UCard class="md:w-2/4 w-full p-8 relative z-50">
                <h2 class="text-3xl font-bold">Welcome Back</h2>
                <p class="text-blueGray-900 dark:text-slate-300">Please log in to continue</p>

                <UForm ref="form" :state="state" @submit="onSubmit" class="mt-8">
                    <div class="mt-8">
                        <template v-if="!isPhoneInput">
                            <label for="email" class="text-blueGray-900 dark:text-slate-300 text-sm font-semibold">
                                Email Address
                            </label>
                            <UInput type="email" id="email" size="lg" class="mt-2" v-model="state.email" autofocus
                                placeholder="exmple@mail.com" />
                        </template>

                        <template v-else>
                            <IntlTelInput v-model="state.phone" @hidePhone="hidePhoneComp" />
                        </template>
                    </div>

                    <div class="mt-4">
                        <label for="password"
                            class="text-blueGray-900 dark:text-slate-300 text-sm font-semibold">Password</label>
                        <UInput :type="(showPassword) ? 'text' : 'password'" id="password" size="lg" class="mt-2"
                            placeholder="********">
                            <template #trailing>
                                <UButton @click="togglePassword" :padded="false" color="gray" variant="link"
                                    class="pointer-events-auto"
                                    :icon="(showPassword) ? 'i-heroicons-eye-20-solid' : 'i-heroicons-eye-slash-20-solid'" />
                            </template>
                        </UInput>
                        <small class="text-[#697077]">
                            It must be a combination of minimum 8 letters, numbers, and symbols.
                        </small>
                    </div>

                    <div class="flex justify-between items-center mt-4">
                        <UCheckbox class="text-sm" name="notifications" label="Remember me" />
                        <a href=""
                            class="text-[#001D6C] dark:text-slate-300 hover:underline cursor-pointer text-sm">Forgot
                            Password?</a>
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
                    <p
                        class="my-6 text-center text-[#001D6C] dark:text-slate-300 hover:underline cursor-pointer text-sm">
                        No account yet? Sign Up
                    </p>
                </UForm>
            </UCard>
        </div>

        <div class="absolute top-0 dark:hidden">
            <img src="~/assets/svg/particules/gradient.svg" draggable="false" />
        </div>
    </div>
</template>