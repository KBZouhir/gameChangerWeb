<template>
    <div class="relative h-screen bg-slate-100 dark:bg-slate-800  py-12">
        <div class="mx-auto max-w-7xl flex justify-center items-center h-full">
            <UCard class="md:w-3/5 w-full p-8 relative z-50 overflow-hidden">
                <img src="~/assets/svg/vectors/pattern-rectangle.svg" draggable="false"
                        class="w-12 absolute top-0 right-0" alt="" srcset="">
                <div class="flex flex-col items-center justify-center ">
                    <img class="w-1/3" src="~/assets/svg/vectors/masterclass.svg" alt="">
                    <h2 class="text-3xl font-bold">{{ $t('Subscribe to masterclass') }}</h2>
                    <p class="text-blueGray-900 dark:text-slate-300">{{ $t('login.please_log_in') }}</p>
                </div>

                <UForm ref="form" :schema="schema" :state="state" @submit="submitForm" class="mt-8 space-y-4">
                    <UFormGroup label="Name" name="name">
                        <UInput size="lg" v-model="state.name" />
                    </UFormGroup>

                    <UFormGroup label="Email" name="email">
                        <UInput size="lg" type="email" v-model="state.email" />
                    </UFormGroup>


                    <UButton :loading="loadingSubmit" size="lg" type="submit">
                        {{ $t('Submit') }}
                    </UButton>
                </UForm>
            </UCard>
        </div>

        <div class="absolute top-0 dark:hidden">
            <img src="~/assets/svg/particules/gradient.svg" draggable="false" />
        </div>
    </div>
</template>

<script setup>
import { handleApiError } from '~/composables/useApiError'
import { guestSubscribeMasterClass } from '~/composables/store/useMasterClass'
import { z } from "zod"


const route = useRoute()

const id = route.query.id
const form = ref()
const loadingSubmit = ref(false)



const schema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
});

const state = reactive({
    name: '',
    email: ''
})



const submitForm = async () => {
    // loadingSubmit.value = true
    // const result = await guestSubscribeMasterClass(id,state)
    // loadingSubmit.value = false
    window.reload()
}
</script>