<template>
    <div class="bg-[#f1f5f9] dark:bg-[#0f172a]">
        <div class="mx-auto w-full max-w-screen-xl px-2 ">
            <div class="pt-8">
                <h1 class="mb-3 text-2xl font-bold">Create Service</h1>
            </div>
            <div class="grid grid-cols-5 gap-4 w-full">
                <div class="col-span-3 py-4">
                    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                        <UFormGroup label="Title" name="title">
                            <UInput v-model="state.title" size="lg" autofocus />
                        </UFormGroup>

                        <UFormGroup label="Description" name="description">
                            <UTextarea v-model="state.description" :rows="8" size="lg" />
                        </UFormGroup>

                        <div class="flex flex-col items-start justify-between space-y-2">
                            <UFormGroup label="Price" name="price" class="flex-1 w-full">
                                <UInput type="number" :disabled="estimate" v-model="state.price" v-price size="lg" />
                            </UFormGroup>
                            <div class="flex h-full items-center">
                                <UCheckbox v-model="estimate" name="notifications" label="Estimate" />
                            </div>
                        </div>

                        <div class="flex flex-col space-y-2">
                            <label class="block font-medium text-gray-700 dark:text-gray-200">Select domains</label>
                            <div
                                class="p-2 py-6 border rounded-md border-[#d1d5db] bg-white dark:border-[#374151] dark:bg-[#111827]">
                                <div class="flex flex-col justify-center items-center flex-wrap">
                                    <div class="flex flex-wrap items-start space-x-4 flex-1 px-4">
                                        <span
                                            class="flex justify-between items-center space-x-4 px-4 py-2 my-2 dark:bg-slate-900 border border-slate-700 bg-gray-200 rounded-xl"
                                            v-for="domain in selectedViewDomains">
                                            <span class="text-sm">{{ domain.translated_name }}</span>
                                            <UButton icon="i-heroicons-x-mark" size="2xs" color="red"
                                                @click="removeDomain(domain)" square variant="ghost" />
                                        </span>
                                    </div>
                                    <UButton size="sm" @click="isOpen = true"
                                        :color="colorMode.value == 'light' ? 'black' : 'white'" variant="link"
                                        label="Select domains" :trailing="false" />
                                </div>
                            </div>
                        </div>

                        <UFormGroup label="Image" name="image">
                            <UInput type="file" accept="image/*" size="lg" icon="i-heroicons-folder" />
                        </UFormGroup>

                        <UButton type="submit" label="Submit"
                            class="dark:bg-emerald-600 disabled:bg-emerald-600 dark:hover:bg-white" color="primary"
                            size="md">
                            <template #trailing>
                                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                            </template>
                        </UButton>
                    </UForm>
                </div>
                <div class="col-span-2 py-4 sticky top-0">
                    <UCard :ui="{ body: 'p-0' }" class="overflow-hidden">
                        <div :class="`h-36 rounded-tr-lg rounded-tl-lg  bg-cover`" :style="`background-image: url(${fallbackImage});`"> </div>
                        <div class="flex justify-end -mt-2 ">
                            <UBadge color="green" size="xs" class="px-4" :ui="{ rounded: 'rounded-none' }">
                                <span v-if="estimate" class="capitalize">estimate</span>
                                <span v-else>{{ state.price || 0 }} $</span> 
                            </UBadge>
                        </div>
                        <div class="p-4">
                            <h3 class="text-lg font-semibold truncate mb-2">{{ state.title || 'Lorem Ipsum Professional Services' }}</h3>
                            <div class="text-xs text-slate-600 dark:text-gray-400 line-clamp-4">{{ state.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}}
                            </div>
                        </div>
                        <template #footer>
                            <div class="flex flex-nowrap items-center">
                                <UBadge v-if="selectedViewDomains.length <= 0" :label="`Domain ${i}`" color="white" size="xs" class="px-3 m-1 text-[10px]" v-for="i in 4"/>
                                <!-- <div class="absolute w-full h-8 bg-gradient-to-t from-white dark:from-slate-900 to-transparent  bottom-0 left-0"></div> -->
                                <UBadge :label="domain.translated_name" color="white" size="xs" class="px-3 m-1 text-[10px]" v-for="domain in selectedViewDomains"/>
                            </div>
                        </template>
                    </UCard>
                </div>
            </div>

            <USlideover v-model="isOpen">
                <Loading v-model="domainLoading" />
                <div class="p-4 flex-1 overflow-y-auto">
                    <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid"
                        class="flex sm:hidden absolute end-5 top-5 z-10" square padded @click="isOpen = false" />
                    <div class="flex flex-col p-2" v-if="!showDomains">
                        <h1 class="text-2xl font-bold">Select your business sector</h1>
                        <p class="text-[#989394]">
                            Select a few of your business sector to match with users who have similar
                            things in common.
                        </p>

                        <div class="flex-1 overscroll-y-auto py-4">
                            <div v-for="businessSector in businessSectors" @click="getdomain(businessSector)"
                                :class="isSectorOnDomain(businessSector) ? 'bg-green-100 dark:bg-slate-800 hover:bg-green-200 border-green-300' : ''"
                                class="border-[1px] dark:border-slate-800 border-blueGray-200 dark:text-white rounded-md flex justify-between items-center mb-3 px-6 py-3 hover:bg-slate-200
                             dark:hover:bg-slate-800 transition-all ease-in-out duration-300 cursor-pointer">
                                <div class="">
                                    <h3 class="font-bold text-md">
                                        {{ businessSector.translated_name }}
                                    </h3>
                                    <small v-if="selectedDomains">
                                        <span v-for="(selectDomain, index) in selectedDomains">
                                            <span v-if="selectDomain.business_sector_id == businessSector.id">
                                                {{ selectDomain.translated_name }},
                                            </span>
                                        </span>
                                    </small>
                                </div>
                                <svg width="10" height="18" viewBox="0 0 12 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.19995 1.80078L10.36 9.96078L2.19995 18.1208" stroke="#0F172A"
                                        stroke-width="2.72" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col p-2" v-if="showDomains">
                        <h1 class="font-bold text-3xl mb-4">
                            #{{ selectedSector.translated_name }}
                        </h1>
                        <h1 class="text-2xl font-bold">Select domains</h1>
                        <p class="text-[#989394]">
                            Select a few of your working domain to match with things in common.
                        </p>

                        <div class="flex-1 overscroll-y-auto py-4">
                            <div v-for="domain in domains" @click="selectDomain(domain)"
                                :class="isSelected(domain) ? 'bg-green-100 dark:bg-slate-800 hover:bg-green-200 border-green-300 text-primary' : ''"
                                class="border-[1px] dark:border-slate-800 border-blueGray-200 rounded-md flex justify-between items-center mb-3 px-6 py-3 dark:hover:bg-slate-800 hover:bg-slate-50 transition-all ease-in-out duration-300 cursor-pointer">
                                <div class="text-[#0F1454] dark:text-white">
                                    <h3 class="font-bold text-md">{{ domain.translated_name }}</h3>
                                </div>
                                <input type="checkbox" name="" :checked="isSelected(domain)" id="" />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4 sticky bottom-0 bg-white py-4 dark:bg-[#111827]">
                            <UButton block :color="colorMode.value == 'dark' ? 'gray' : 'primary'" size="lg"
                                variant="link" label="Back" @click="{ selectedSector = null; showDomains = false; }" />
                            <UButton block :color="colorMode.value == 'dark' ? 'white' : 'green'" size="lg" label="Save"
                                @click="dispalyDomains" />
                        </div>
                    </div>
                </div>
            </USlideover>
        </div>
    </div>

</template>

<script setup>
import { useBusinessSectorsStore } from "~/stores/business-sectors"
import { useDomainsStore } from "~/stores/domains"
import { apiGetDomains, apiGetDomainBySector } from "~/composables/store/useDomains"
import { apiGetBusinessSectors } from "~/composables/store/useBusinessSectors"

import schema from '~/schemas/service'

import fallbackImage from '~/assets/img/profile-cover.webp'

const businessSectorStore = useBusinessSectorsStore()
const intrestDomainsStore = useDomainsStore()

const domains = computed(() => intrestDomainsStore.getDomains)
const businessSectors = computed(() => businessSectorStore.getBusinessSectors);

const colorMode = useColorMode()
const domainLoading = ref(false)
const isOpen = ref(false)
const selectedDomains = ref([])
const selectedSector = ref(null)
const showDomains = ref(false)
const selectedViewDomains = ref([])
const estimate = ref(false)


definePageMeta({
    layout: 'auth',
    title: 'Service',
    middleware: ['auth']
})

const getDataFromApi = async () => {
    await apiGetBusinessSectors()
}

watchEffect(() => {
    getDataFromApi();
})

const state = reactive({
    title: undefined,
    description: undefined,
    price: undefined,
    domains: [],
    image: undefined
})

const getdomain = async (sector) => {
    selectedSector.value = sector;
    const qurey = { business_sector: selectedSector.value.id }
    domainLoading.value = true;
    await apiGetDomainBySector(qurey).then(() => {
        domainLoading.value = false
    })
    showDomains.value = true
}

const isSectorOnDomain = (sector) => {
    return selectedDomains.value.some(
        (selectedDomain) => selectedDomain.business_sector_id === sector.id
    )
}

const selectDomain = (domain) => {
    if (!isSelected(domain)) {
        selectedDomains.value.push(domain)
    } else {
        selectedDomains.value = selectedDomains.value.filter((d) => d.id !== domain.id)
    }
    selectedViewDomains.value = selectedDomains.value
}

const isSelected = (domain) => {
    return selectedDomains.value.some((selectedDomain) => selectedDomain.id === domain.id)
}

const removeDomain = (domain) => {
    selectedDomains.value = selectedDomains.value.filter((d) => d.id !== domain.id);
    selectedViewDomains.value = selectedDomains.value;
}

const dispalyDomains = () => {
    isOpen.value = false;
    selectedViewDomains.value = selectedDomains.value;
}

const onSubmit = () => {
    console.log("submit")
}


</script>