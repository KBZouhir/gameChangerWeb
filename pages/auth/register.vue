<script setup>

definePageMeta({
    layout: 'guest'
})

let showPassword = ref(false)

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

</script>

<template>
    <div class="relative bg-slate-100 h-full py-12">
        <div class="mx-auto max-w-7xl flex justify-center items-center h-full">
            <UCard class="md:w-2/4 w-full p-8 relative z-50">
                <h2 class="text-3xl font-bold">Sign Up Free</h2>
                <p class="text-blueGray-900">14 day free access to unlimited resources </p>

                <div class="mt-8">
                    <div class="mt-8">
                        <label for="email" class="text-blueGray-900 text-sm font-semibold">Full Name</label>
                        <UInput type="text" id="email" size="lg" class="mt-2" placeholder="John doe" />
                    </div>

                    <div class="mt-4">
                        <label for="email" class="text-blueGray-900 text-sm font-semibold">Email</label>
                        <UInput type="email" id="email" size="lg" class="mt-2" placeholder="exmple@mail.com" />
                    </div>

                    <div class="mt-4">
                        <label for="password" class="text-blueGray-900 text-sm font-semibold">Password</label>
                        <UInput :type="(showPassword) ? 'text' : 'password'" id="password" size="lg" class="mt-2" placeholder="**********">
                            <template #trailing>
                                <UButton
                                    @click="togglePassword"
                                    :padded="false"
                                    color="gray"
                                    variant="link"
                                    class="pointer-events-auto"
                                    :icon="(showPassword) ? 'i-heroicons-eye-20-solid' : 'i-heroicons-eye-slash-20-solid'"
                                />
                            </template>
                        </UInput>
                        <small class="text-[#697077]">
                            It must be a combination of minimum 8 letters, numbers, and symbols.
                        </small>
                    </div>

                    <div class="flex justify-between items-center mt-4">
                        <UCheckbox class="text-sm font-light" v-model="selected" name="notifications" label="Agree to the Terms of use & Privacy Policy" />
                    </div>

                    <div class="mt-4">
                        <UButton block class="px-6 py-3 bg-emerald-400">Create new account</UButton>
                    </div>

                    <UDivider label="" class="my-6 border-blueGray-700" />

                    <p class="mb-6 mt-4 text-center text-sm">Or log in with:</p>
                    <div class="grid grid-cols-2 gap-6">
                        <MediaButton type="google" />
                        <MediaButton type="twitter" />
                    </div>

                    <UDivider label="" class="my-6" />
                    <p class="my-6 text-center text-[#001D6C] hover:underline cursor-pointer text-sm">
                        Already have an account?
                    </p>
                </div>
            </UCard>
        </div>

        <div class="absolute top-0">
            <img src="~/assets/svg/particules/gradient.svg" draggable="false" />
        </div>
    </div>
</template>