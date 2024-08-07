<script setup>
import { updatePassword } from '~/composables/store/useProfile'
import { handleApiError } from '~/composables/useApiError'
import { z } from "zod";

const showConfirmPassword = ref(false)
const showOldPassword = ref(false)
const showPassword = ref(false)
const form = ref()


const toggleShowPassword = (target) => {
    switch (target) {
        case 1: showOldPassword.value = !showOldPassword.value; break;
        case 2: showPassword.value = !showPassword.value; break;
        case 3: showConfirmPassword.value = !showConfirmPassword.value; break;
    }
}


const passwordForm = reactive({
    old_password: '',
    password: '',
    password_confirmation: ''
})


const schema = z.object({
    old_password: z.string().nonempty("Old password is required"),
    password: z.string().min(8, "New password must be at least 8 characters long").nonempty("New password is required"),
    password_confirmation: z.string().min(8, "New password must be at least 8 characters long").nonempty("Password confirmation is required"),
}).refine(data => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"], // This specifies the path of the error
}).refine(data => data.old_password !== data.password, {
    message: "New password must be different from the old password",
    path: ["password"], // This specifies the path of the error
});


async function onSubmit(event) {
    const result = await updatePassword(passwordForm)
    if (!result.data) {
        const error = handleApiError(result.error);
        if (error.status === 422) {
            form.value.setErrors(error.errors);
        }
    }
}

</script>

<template>
    <UForm ref="form" :schema="schema" :state="passwordForm" @submit="onSubmit" class="mt-8 space-y-4">
        <UFormGroup label="Current password" name="old_password">
            <UInput :type="(showOldPassword) ? 'text' : 'password'" id="old_password" size="lg" autofocus
                v-model="passwordForm.old_password" placeholder="********" autocomplete>
                <template #trailing>
                    <UButton @click="toggleShowPassword(1)" :padded="false" color="gray" variant="link"
                        class="pointer-events-auto " :class="(error) ? 'text-red-600 hover:text-red-600' : ''"
                        :icon="(showOldPassword) ? 'i-heroicons-eye-20-solid' : 'i-heroicons-eye-slash-20-solid'" />
                </template>
            </UInput>
        </UFormGroup>

        <UFormGroup label="New password" name="password">
            <UInput :type="(showPassword) ? 'text' : 'password'" id="password" size="lg" v-model="passwordForm.password"
                placeholder="********">
                <template #trailing>
                    <UButton @click="toggleShowPassword(2)" :padded="false" color="gray" variant="link"
                        class="pointer-events-auto " :class="(error) ? 'text-red-600 hover:text-red-600' : ''"
                        :icon="(showPassword) ? 'i-heroicons-eye-20-solid' : 'i-heroicons-eye-slash-20-solid'" />
                </template>
            </UInput>
        </UFormGroup>

        <UFormGroup label="Confirm password" name="password_confirmation">
            <UInput :type="(showConfirmPassword) ? 'text' : 'password'" id="password_confirmation" size="lg"
                v-model="passwordForm.password_confirmation" placeholder="********">
                <template #trailing>
                    <UButton @click="toggleShowPassword(3)" :padded="false" color="gray" variant="link"
                        class="pointer-events-auto " :class="(error) ? 'text-red-600 hover:text-red-600' : ''"
                        :icon="(showConfirmPassword) ? 'i-heroicons-eye-20-solid' : 'i-heroicons-eye-slash-20-solid'" />
                </template>
            </UInput>
        </UFormGroup>

        <div class="flex justify-end">
            <UButton type="submit" class="px-4 py-2 dark:bg-[#34d399] dark:hover:bg-green-400">
                Save changes
            </UButton>
        </div>
    </UForm>
</template>