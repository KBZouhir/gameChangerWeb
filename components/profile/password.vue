<script setup>

const passwordForm = reactive({
    old_password: '',
    password: '',
    password_confirmation: ''
})

</script>

<template>
    <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit" class="mt-8 space-y-4">
        <UFormGroup label="Current password" name="email">
            <UInput type="password" v-model="passwordForm.old_password" size="lg" autofocus />
        </UFormGroup>

        <UFormGroup label="New password" name="email">
            <UInput type="password" v-model="passwordForm.password" size="lg" />
        </UFormGroup>

        <UFormGroup label="Confirm password" name="email">
            <UInput type="password" v-model="passwordForm.password_confirmation" size="lg" />
        </UFormGroup>

        <div class="flex justify-end">
            <UButton type="submit" class="px-4 py-2">
                Save changes
            </UButton>
        </div>
    </UForm>
</template>