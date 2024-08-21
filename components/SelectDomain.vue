<template>
    <div class="flex flex-col space-y-2">
        <label class="block font-medium text-gray-700 dark:text-gray-200">Select domains</label>
        <div :class="(keyExists('domain') && selectedViewDomains.length <= 0) ? `border-red-500` : `border-[#d1d5db] dark:border-[#374151]`"
            class="p-2 py-6 border rounded-md  bg-white  dark:bg-[#111827]">
            <div class="flex flex-col justify-center items-center flex-wrap">
                <div class="flex flex-wrap items-start space-x-4 flex-1 px-4">
                    <span
                        class="flex justify-between items-center space-x-4 px-4 py-2 my-2 dark:bg-slate-900 border border-slate-700 bg-gray-200 rounded-xl"
                        v-for="domain in selectedViewDomains">
                        <span class="text-sm">{{ domain.translated_name }}</span>
                        <UButton icon="i-heroicons-x-mark" size="2xs" color="red" @click="removeDomain(domain)" square
                            variant="ghost" />
                    </span>
                </div>
                <UButton size="sm" @click="isOpen = true" :color="$colorMode.value == 'light' ? 'black' : 'white'"
                    variant="link" label="Select domains" :trailing="false" />
            </div>
        </div>
        <p v-show="keyExists('domain') && selectedViewDomains.length <= 0" class="text-red-500 text-[10px]">{{
            getErrorMessage('domain') }}</p>
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
                        <svg width="10" height="18" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <UButton block :color="$colorMode.value == 'dark' ? 'gray' : 'primary'" size="lg" variant="link"
                        label="Back" @click="{ selectedSector = null; showDomains = false; }" />
                    <UButton block :color="$colorMode.value == 'dark' ? 'white' : 'green'" size="lg" label="Save"
                        @click="dispalyDomains" />
                </div>
            </div>
        </div>
    </USlideover>
</template>

<script setup>
import { useBusinessSectorsStore } from "~/stores/business-sectors"
import { useDomainsStore } from "~/stores/domains"
import { apiGetDomainBySector } from "~/composables/store/useDomains"
import { apiGetBusinessSectors } from "~/composables/store/useBusinessSectors"


const businessSectorStore = useBusinessSectorsStore()
const intrestDomainsStore = useDomainsStore()

const domains = computed(() => intrestDomainsStore.getDomains)
const businessSectors = computed(() => businessSectorStore.getBusinessSectors);

const domainLoading = ref(false)
const isOpen = ref(false)
const selectedDomains = ref([])
const selectedSector = ref(null)
const showDomains = ref(false)
const selectedViewDomains = ref([])

const errors = ref([])

const emit = defineEmits(['update:modelValue']);



const getDataFromApi = async () => {
    await apiGetBusinessSectors()
}

watchEffect(() => {
    getDataFromApi();
})


const getdomain = async (sector) => {
    selectedSector.value = sector
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
    emit('update:modelValue', selectedDomains.value)
}

const isSelected = (domain) => {
    return selectedDomains.value.some((selectedDomain) => selectedDomain.id === domain.id)
}

const removeDomain = (domain) => {
    selectedDomains.value = selectedDomains.value.filter((d) => d.id !== domain.id)
    selectedViewDomains.value = selectedDomains.value
    emit('update:modelValue', selectedDomains.value)
}

const dispalyDomains = () => {
    isOpen.value = false
    selectedViewDomains.value = selectedDomains.value
    emit('update:modelValue', selectedDomains.value)
}

const getErrorMessage = (key) => {
    const error = errors.value.find(error => error.key === key)
    return error ? error.value : ''
}


const keyExists = (key) => {
    return errors.value.some(error => error.key === key)
}

</script>