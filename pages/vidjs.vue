<script setup >

import { showMasterClass, externalUserJoin, guestSubscribeMasterClass, resendExternalCredentials } from '~/composables/store/useMasterClass'
import { z } from "zod"

const state = reactive({
  email: undefined,
  password: undefined
})

const externalUserJoinSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    password: z.string().min(8, "Must be at least 8 characters"),
});

async function onSubmit () {

  const result = await showMasterClass(state.email)
    if (result?.success) {
        masterclass.value = result.data
    }
}

async function onError (event) {
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<template>
  <UForm :schema="externalUserJoinSchema" :state="state" class="space-y-4" @submit="onSubmit" @error="onError">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit" color="green">
      Submit
    </UButton>
  </UForm>
</template>