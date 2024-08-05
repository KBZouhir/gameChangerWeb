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
                                <UInput :disabled="estimate" v-model="state.price" v-price size="lg" />
                            </UFormGroup>
                            <div class="flex h-full items-center">
                                <UCheckbox v-model="estimate" @change="checkPrice" name="notifications"
                                    label="Estimate" />
                            </div>
                        </div>

                        <div class="flex flex-col space-y-2">
                            <label class="block font-medium text-gray-700 dark:text-gray-200">Select domains</label>
                            <div  :class="(keyExists('domain') && selectedViewDomains.length <= 0) ? `border-red-500` : `border-[#d1d5db] dark:border-[#374151]`" class="p-2 py-6 border rounded-md  bg-white  dark:bg-[#111827]">
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
                            <p v-show="keyExists('domain') && selectedViewDomains.length <= 0"class="text-red-500 text-[10px]">{{ getErrorMessage('domain') }}</p>
                        </div>

                        <UFormGroup label="Image" name="image">
                            <UInput ref="inputFileImage" type="file" :class="(keyExists('image') && compressedFiles.length <= 0) ? `border border-red-500 rounded-lg` : ``" accept="image/*" @change="onImageFileChange" size="lg"
                                icon="i-heroicons-folder" />
                                <p v-show="keyExists('image') && compressedFiles.length <= 0"class="text-red-500 text-[10px]">{{ getErrorMessage('image') }}</p>
                        </UFormGroup>
                       

                        <div v-if="compressedFiles.length > 0" class="my-4">
                            <div
                                class="flex flex-nowrap overflow-x-auto space-x-4 items-center scrollbar-thin scrollbar-h-2 scrollbar-thumb-rounded-full scrollbar-thumb-slate-300/80 scrollbar-track-slate-100">
                                <div v-for="(file, index) in compressedFiles" :key="index"
                                    class="relative group w-32 h-32 flex-none ring-1 ring-gray-200 dark:ring-gray-800 shadow rounded-md overflow-hidden transition-all duration-150 ease-in-out">
                                    <div class="w-full h-full overflow-hidden border-e">
                                        <img :src="file.preview" alt="Selected Image"
                                            class="object-cover w-full h-full" />
                                    </div>
                                    <div v-if="file.progress < 100"
                                        class="absolute w-full h-full dark:bg-black/60 bg-white/80 top-0 left-0 flex justify-center items-center">
                                        <UButton loading :color="(colorMode.value != 'light') ? 'white' : 'primary'"
                                            variant="link" disabled>
                                            Compressing...
                                        </UButton>
                                    </div>
                                    <div
                                        class="bg-primary/75 w-full h-full absolute top-0 group-hover:flex items-center justify-center hidden">
                                        <UButton @click="removeImage(index)" icon="i-heroicons-trash"
                                            class="bg-transparent text-red-400 hover:bg-red-700/5 hover:text-red-500 text-xs dark:text-white"
                                            size="2xs" color="primary" square variant="soft" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <UButton :loading="submitLoading" type="submit" label="Submit" class="dark:bg-emerald-600 disabled:bg-emerald-600 dark:hover:bg-white" color="primary" size="md">
                            <template #trailing>
                                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                            </template>
                        </UButton>
                    </UForm>

                </div>

                <div class="col-span-2 py-4 sticky top-0">
                    <UCard :ui="{ body: 'p-0' }" class="overflow-hidden">
                        <div :class="`h-64 rounded-tr-lg rounded-tl-lg  bg-cover`"
                            :style="`background-image: url(${ compressedFiles[0]?.preview || fallbackImage});`">
                        </div>
                        <div class="flex justify-end -mt-2 ">
                            <UBadge color="green" size="xs" class="px-4" :ui="{ rounded: 'rounded-none' }">
                                <span v-if="estimate" class="capitalize">estimate</span>
                                <span v-else>{{ state.price || 0 }} $</span>
                            </UBadge>
                        </div>
                        <div class="p-4">
                            <h3 class="text-lg font-semibold truncate mb-2">{{ state.title || `Lorem Ipsum Professional
                                Services` }}
                            </h3>
                            <div class="text-xs text-slate-600 dark:text-gray-400 line-clamp-4">{{ state.description ||
                                `Lorem ipsum
                                dolor sit amet, consectetur adipiscing elit.Sed do eiusmod tempor incididunt ut labore
                                et dolore magna
                                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo
                                consequat.`}}
                            </div>
                        </div>
                        <template #footer>
                            <div class="flex flex-wrap items-center">
                                <UBadge v-if="selectedViewDomains.length <= 0" :label="`Domain ${i}`" color="white"
                                    size="xs" class="px-3 m-1 text-[10px]" v-for="i in 4" />
                                <UBadge :label="domain.translated_name" color="white" size="xs"
                                    class="px-3 m-1 text-[10px] " v-for="domain in selectedViewDomains" />
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
import { apiGetDomainBySector } from "~/composables/store/useDomains"
import { createService } from "~/composables/store/useService"
import { apiGetBusinessSectors } from "~/composables/store/useBusinessSectors"
import imageCompression from 'browser-image-compression'

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
const compressedFiles = ref([])
const inputFileImage = ref(null)
const submitLoading = ref(false)
const errors = ref([])


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
    price: 0,
    domains: [],
    image: undefined
})

const checkPrice = () => {
    if (estimate.value) state.price = 0
}

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


const onImageFileChange = async (event) => {

    for (const file of event) {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: 'image/webp',
            onProgress: (progress) => {
                const index = compressedFiles.value.findIndex(f => f.originalFile === file)
                if (index !== -1) {
                    compressedFiles.value[index].progress = progress
                }
            }
        }

        const newFileObj = { originalFile: file, progress: 0, preview: '' }
        compressedFiles.value.push(newFileObj)

        try {
            const index = compressedFiles.value.findIndex(f => f.originalFile === file)
            const preview = URL.createObjectURL(file)
            compressedFiles.value[index].preview = preview
            const compressedFile = await imageCompression(file, options)
            compressedFiles.value[index].file = compressedFile
        } catch (error) {
            console.error('Error compressing file:', error);
        }
    }
}

const removeImage = (index) => {
    compressedFiles.value.splice(index, 1);
    if (compressedFiles.value.length === 0) {
        inputFileImage.value.value = null;
    }
}

const keyExists = (key) => {
    return errors.value.some(error => error.key === key)
}

const getErrorMessage = (key) => {
    const error = errors.value.find(error => error.key === key)
    return error ? error.value : ''
}

const validationData = () => {
    if(selectedDomains.value.length <= 0){
        errors.value.push({ key: 'domain', value: 'Domains can not be empty' })
    }

    if(compressedFiles.value.length <= 0){
        errors.value.push({ key: 'image', value: 'Image can not be empty' })
    }

    return errors.value.length <= 0 
}

const onSubmit = async () => {
    
    if(!validationData()) return

    submitLoading.value = true

    let formData = new FormData()

    formData.append('title', state.title)
    formData.append('description', state.description)
    formData.append('image', compressedFiles.value[0].file)

    if(!estimate.value){
        formData.append('price', state.price)
    }

    selectedDomains.value.forEach((domain) => {
        formData.append('domains[]', domain.id)
    })

    const result = await createService(formData)
    if(result.success){
        submitLoading.value = false
    }
}


</script>