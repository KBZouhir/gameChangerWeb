<script setup>

import { useAuthStore } from '~/stores/authStore'
const authStore = useAuthStore()
const user = computed(()=>authStore.getAuthUser)


const generalForm = reactive({
    first_name: user.value?.first_name,
    last_name: user.value?.last_name,
    phone: user.value?.phone,
    email: user.value?.email,
    bio: user.value?.bio
})

</script>

<template>
    <div>
        <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit" class="mt-8 space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <UFormGroup label="First name" name="email">
                    <UInput v-model="generalForm.first_name" size="lg" autofocus />
                </UFormGroup>
                <UFormGroup label="Last name" name="email">
                    <UInput v-model="generalForm.last_name" size="lg" />
                </UFormGroup>
            </div>


            <UFormGroup label="Email" name="email">
                <UInput v-model="generalForm.email" size="lg" />
            </UFormGroup>

            <UFormGroup name="phone">
                <IntlTelInput v-model="generalForm.phone" />
            </UFormGroup>

            <UFormGroup label="Bio" name="email">
                <UTextarea v-model="generalForm.bio" size="lg" />
            </UFormGroup>

            <div class="flex justify-end">
                <UButton type="submit" class="px-4 py-2">
                    Save changes
                </UButton>
            </div>
        </UForm>
    </div>
</template>