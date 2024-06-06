<script setup>

import { handleApiError } from '~/composables/useApiError'


definePageMeta({
    layout: 'auth',
    title: 'Login Page',
    middleware: 'auth'
})

const selectedPlan = ref()
const plans = [
    {id: 0, name: 'Basic', isBest: true},
    {id: 1, name: 'Basic 01', isBest: false},
]

</script>

<template>
    <div class="relative bg-slate-100 dark:bg-slate-800 h-full py-12">
        <div class="mx-auto max-w-7xl flex justify-center items-center h-full">
            <UCard class="md:w-3/5 w-full p-8 relative z-50 overflow-hidden">
                <img src="~/assets/svg/particules/rounded-pattern.svg" width="50" class="mb-4 absolute top-0 right-0" alt="" srcset="">
                <div class="flex flex-col justify-center items-center">
                    <img src="~/assets/svg/vectors/payment.svg" width="240" class="mb-4" alt="" srcset="">
                    <h2 class="text-4xl font-bold mb-2">Subscribe now</h2>
                    <p class="text-blueGray-900 dark:text-slate-300">Unlock all the power of this mobile tool and enjoy digital experience like never before!</p>
                </div>

                <div class="flex flex-col space-y-4 py-6">
                    <CustomPlanRadioButton v-for="plan in plans" :key="plan.id" v-model="selectedPlan" :value="plan" />
                </div>
                <UButton block class="my-6 py-4 uppercase" size="lg">Start now</UButton>

                <img src="~/assets/svg/particules/pattern.svg"  class="mb-4 w-full absolute -bottom-4 left-0" alt="" srcset="">
            </UCard>
        </div>

        <div class="absolute top-0 dark:hidden">
            <img src="~/assets/svg/particules/gradient.svg" draggable="false" />
        </div>
    </div>
</template>