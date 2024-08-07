<script setup>
import { updateGeneral } from '~/composables/store/useProfile'
import { useAuthStore } from '~/stores/authStore'
import schema from '~/schemas/profile/general'

const authStore = useAuthStore()
const user = computed(() => authStore.getAuthUser)

const loading = ref(false)

const generalForm = reactive({
    first_name: user.value?.first_name,
    last_name: user.value?.last_name,
    phone: user.value?.phone,
    email: user.value?.email,
    bio: user.value?.bio
})

const onSubmit = async () => {
    loading.value = true
    const result = await updateGeneral(generalForm)
    loading.value = false
}

</script>

<template>
    <div>
        <UForm ref="form" :schema="schema" :state="generalForm" @submit="onSubmit" class="mt-8 space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <UFormGroup label="First name" name="first_name">
                    <UInput v-model="generalForm.first_name" size="lg" autofocus></UInput>
                </UFormGroup>
                <UFormGroup label="Last name" name="last_name">
                    <UInput v-model="generalForm.last_name" size="lg" />
                </UFormGroup>
            </div>

            <UFormGroup label="Email" name="email">
                <UInput v-model="generalForm.email" size="lg">
                    <template #trailing>
                        <span v-if="user.is_email_verified" class="flex space-x-4 text-[#34d399] text-xs">
                            Verified
                            <Icon name="tabler:circle-check" size="18"  />
                        </span>
                        <span v-else class="text-amber-600 text-xs">
                            Not verified
                            <Icon name="tabler:alert-octagon" size="18"  />
                        </span>
                    </template>
                </UInput>
            </UFormGroup>

            <UFormGroup name="phone">
                <IntlTelInput v-model="generalForm.phone" />
            </UFormGroup>

            <UFormGroup label="Bio" name="bio">
                <UTextarea v-model="generalForm.bio" size="lg" />
            </UFormGroup>

            <div class="flex justify-end">
                <UButton type="submit" :loading="loading" class="px-4 py-2 disabled:bg-[#34d399] dark:bg-[#34d399] dark:hover:bg-green-400">
                    Save changes
                </UButton>
            </div>
        </UForm>
    </div>
</template>