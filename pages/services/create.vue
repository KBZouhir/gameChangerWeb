<template>
    <div class="bg-[#f1f5f9] dark:bg-[#0f172a]">
        <div class="mx-auto w-full max-w-screen-xl px-2 ">
            <div class="my-4">
                <nav class="flex w-full" aria-label="Breadcrumb">
                    <ol role="list" class="flex space-x-4 rounded-md bg-white dark:bg-slate-800 px-6 shadow">
                        <li class="flex">
                            <div class="flex items-center">
                                <nuxt-link to="/">
                                    <div class="text-gray-400 hover:text-gray-500">
                                        <Icon name="tabler:home" size="16" color="white" />
                                        <span class="sr-only">{{ $t('Home') }}</span>
                                    </div>
                                </nuxt-link>
                            </div>
                        </li>
                        <li class="flex">
                            <div class="flex items-center">
                                <svg class="h-full w-6 flex-shrink-0 dark:text-slate-900 text-gray-200"
                                    viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor"
                                    aria-hidden="true">
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                                <nuxt-link to="/services">
                                    <div
                                        class="ml-4 text-sm font-medium dark:text-white text-gray-500 hover:text-gray-700">
                                        {{ $t('Services') }}
                                    </div>
                                </nuxt-link>

                            </div>
                        </li>
                        <li class="flex">
                            <div class="flex items-center">
                                <svg class="h-full w-6 flex-shrink-0 dark:text-slate-900 text-gray-200"
                                    viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor"
                                    aria-hidden="true">
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                                <div class="ml-4 text-sm font-medium dark:text-white text-gray-500 hover:text-gray-700"
                                    aria-current="page">
                                    {{ $t('Create Service') }}
                                </div>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div class="pt-2">
                <h1 class="mb-3 text-2xl font-bold">
                    {{ $t('Create Service') }}
                </h1>
            </div>
            <div class="grid md:grid-cols-5 grid-cols-1 gap-4 w-full">
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

                        <SelectDomain v-model="state.domains" />
                        <p v-show="keyExists('domain') && compressedFiles.length <= 0" class="text-red-500 text-[10px]">
                            {{ getErrorMessage('domain') }}</p>
                        <UFormGroup label="Image" name="image">
                            <UInput ref="inputFileImage" type="file"
                                :class="(keyExists('image') && compressedFiles.length <= 0) ? `border border-red-500 rounded-lg` : ``"
                                accept="image/*" @change="onImageFileChange" size="lg" icon="i-heroicons-folder" />
                            <p v-show="keyExists('image') && compressedFiles.length <= 0"
                                class="text-red-500 text-[10px]">{{ getErrorMessage('image') }}</p>
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

                        <div class="my-4">
                            <UButton :loading="submitLoading" type="submit" label="Submit" color="green" size="md">
                                <template #trailing>
                                    <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                                </template>
                            </UButton>
                        </div>

                    </UForm>

                </div>

                <div class="col-span-2 py-4 sticky top-0 hidden md:block">
                    <UCard :ui="{ body: 'p-0' }" class="overflow-hidden">
                        <div :class="`h-64 rounded-tr-lg rounded-tl-lg  bg-cover`"
                            :style="`background-image: url(${compressedFiles[0]?.preview || fallbackImage});`">
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
                                <UBadge v-if="state.domains.length <= 0" :label="`Domain ${i}`" color="white" size="xs"
                                    class="px-3 m-1 text-[10px]" v-for="i in 4" />
                                <UBadge :label="domain.translated_name" color="white" size="xs"
                                    class="px-3 m-1 text-[10px] " v-for="domain in state.domains" />
                            </div>
                        </template>
                    </UCard>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { createService } from "~/composables/store/useService"
import imageCompression from 'browser-image-compression'

import schema from '~/schemas/service'

import fallbackImage from '~/assets/img/profile-cover.webp'


const colorMode = useColorMode()
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
    if (state.domains.length <= 0) {
        errors.value.push({ key: 'domain', value: 'Domains can not be empty' })
    }

    if (compressedFiles.value.length <= 0) {
        errors.value.push({ key: 'image', value: 'Image can not be empty' })
    }

    return errors.value.length <= 0
}

const onSubmit = async () => {

    if (!validationData()) return

    submitLoading.value = true

    let formData = new FormData()

    formData.append('title', state.title)
    formData.append('description', state.description)
    formData.append('image', compressedFiles.value[0].file)

    if (!estimate.value) {
        formData.append('price', state.price)
    }

    state.domains.forEach((domain) => {
        formData.append('domains[]', domain.id)
    })

    const result = await createService(formData)

    if (result.success) {
        submitLoading.value = false
        await navigateTo(`/services/details/${result?.service?.id}`)
    }
}


</script>