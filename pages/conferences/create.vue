<template>
    <div class="max-w-screen-xl mx-auto py-4">
        <div class="pt-8">
            <h1 class="mb-3 text-2xl font-bold">Create conference</h1>
        </div>
        <div class="grid grid-cols-5 gap-4 w-full">
            <div class="col-span-5 py-4">
                <UForm ref="form" :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="Title" name="title">
                        <UInput v-model="state.title" size="lg" autofocus />
                    </UFormGroup>

                    <UFormGroup label="Short description" name="short_description">
                        <UTextarea :rows="4" v-model="state.short_description" size="lg" />
                    </UFormGroup>

                    <UFormGroup label="Full description" name="full_description">
                        <UTextarea :rows="8" v-model="state.full_description" size="lg" />
                    </UFormGroup>

                    <div class="grid grid-cols-2 gap-4">
                        <UFormGroup label="Language" name="lang">
                            <USelect size="lg" v-model="state.lang" :options="langs" />
                        </UFormGroup>

                        <UFormGroup label="Max attendees" name="max_attendees">
                            <UInput v-model="state.max_attendees" v-only-positive-number size="lg">
                                <template #trailing>
                                    <div class="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-md">
                                        <Icon name="tabler:users-group" />
                                    </div>
                                </template>
                            </UInput>
                        </UFormGroup>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <UFormGroup label="Date" name="date">
                            <ClientOnly>
                                <VueDatePicker v-model="state.date" auto-apply :min-date="new Date()"
                                    :dark="$colorMode.value == 'dark' ? true : false">
                                </VueDatePicker>
                            </ClientOnly>
                        </UFormGroup>

                        <UFormGroup label="Duration" name="duration">
                            <UInput v-model="state.duration" maxlength="3" v-only-positive-number="{ max: 120 }"
                                size="lg">
                                <template #trailing>
                                    <div class="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-xs">
                                        <Icon name="tabler:clock" />
                                        <span>{{ $t('Minutes') }}</span>
                                    </div>
                                </template>
                            </UInput>
                        </UFormGroup>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <UFormGroup label="Subscribers price" name="subscribers_price">
                            <UInput v-model="state.subscribers_price" v-price size="lg">
                                <template #trailing>
                                    <div class="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-lg">
                                        <Icon name="tabler:cash" />
                                    </div>
                                </template>
                            </UInput>
                        </UFormGroup>

                        <UFormGroup label="Price" name="price">
                            <UInput v-model="state.price" v-price size="lg">
                                <template #trailing>
                                    <div class="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-lg">
                                        <Icon name="tabler:cash" />
                                    </div>
                                </template>
                            </UInput>
                        </UFormGroup>
                    </div>
                    <UFormGroup label="" name="domains">
                        <SelectDomain v-model="state.domains" />
                    </UFormGroup>


                    <UFormGroup label="Internal animators" name="price">
                        <!-- <MultiselectCom :items="users" v-model="state.internal_animators" :checkInfiniteScroll="true" /> -->
                        <USelectMenu v-model="state.internal_animators" searchable
                            searchable-placeholder="Search a person..." multiple :options="users" size="lg">
                            <template #label>
                                <span v-if="state.internal_animators.length" class="truncate"> {{
                                    state.internal_animators.map(animator => animator.label).join(', ') }}
                                </span>
                                <span v-else>Select people</span>
                            </template>
                        </USelectMenu>
                    </UFormGroup>

                    <div
                        class="border border-gray-300 dark:border-[#374151] dark:bg-transparent bg-white p-6 rounded-md">
                        <div class="flex flex-col mb-4">
                            <h3 class="text-xl font-semibold ">External animators</h3>
                            <p class="text-sm text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Harum fugit optio
                                earum inventore quam vero cupiditate voluptatum, velit saepe reiciendis quod nisi iste,
                                voluptates rem amet
                                doloribus similique incidunt! Quae?</p>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="flex flex-col text-sm space-y-1">
                                <label class="font-semibold " for="full_name">Full name</label>
                                <UInput v-model="externalUserName" id="full_name" size="lg" />
                            </div>

                            <div class="flex flex-col text-sm space-y-1">
                                <label class="font-semibold " for="email">Email</label>
                                <UInput type="email" v-model="externalUserEmail" id="email" size="lg" />
                            </div>
                            <div class="col-span-2">
                                <UButton block @click="addExternalUser" size="lg" color="green" label="Add" />
                            </div>
                            <p v-show="keyExists('externalUserName')" class="text-red-500 text-[10px]">
                                {{ getErrorMessage('externalUserName') }}</p>
                        </div>
                        <UDivider class="my-4" />
                        <div>
                            <div class="grid grid-cols-2 gap-4">
                                <div v-for="(external_animator, index) in state.external_animators"
                                    class="flex justify-between px-4 py-2 items-center bg-white dark:bg-gray-900 border dark:border-slate-700 rounded-md">
                                    <div class="flex flex-col">
                                        <h4 class="font-semibold text-md capitalize">
                                            {{ external_animator.external_user_name }}
                                        </h4>
                                        <p class="text-slate-500 text-xs">
                                            {{ external_animator.external_user_email }}
                                        </p>
                                    </div>
                                    <UButton icon="i-heroicons-x-mark" size="2xs" color="red" @click="removeExternalUser(index)" square
                                    variant="ghost" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <UFormGroup label="Image" name="image">
                        <UInput ref="inputFileImage" type="file"
                            :class="(keyExists('image') && compressedFiles.length <= 0) ? `border border-red-500 rounded-lg` : ``"
                            accept="image/*" @change="onImageFileChange" size="lg" icon="i-heroicons-folder" />
                        <p v-show="keyExists('image') && compressedFiles.length <= 0" class="text-red-500 text-[10px]">
                            {{ getErrorMessage('image') }}</p>
                    </UFormGroup>
                    <div v-if="compressedFiles.length > 0" class="my-4">
                        <div
                            class="flex flex-nowrap overflow-x-auto space-x-4 items-center scrollbar-thin scrollbar-h-2 scrollbar-thumb-rounded-full scrollbar-thumb-slate-300/80 scrollbar-track-slate-100">
                            <div v-for="(file, index) in compressedFiles" :key="index"
                                class="relative group w-32 h-32 flex-none ring-1 ring-gray-200 dark:ring-gray-800 shadow rounded-md overflow-hidden transition-all duration-150 ease-in-out">
                                <div class="w-full h-full overflow-hidden border-e">
                                    <img :src="file.preview" alt="Selected Image" class="object-cover w-full h-full" />
                                </div>
                                <div v-if="file.progress < 100"
                                    class="absolute w-full h-full dark:bg-black/60 bg-white/80 top-0 left-0 flex justify-center items-center">
                                    <UButton loading :color="($colorMode.value != 'light') ? 'white' : 'primary'"
                                        variant="link" disabled>
                                        {{ $t('Compressing...') }}
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
                    <UButton :loading="submitLoading" type="submit" label="Submit"
                        class="dark:bg-emerald-600 disabled:bg-emerald-600 dark:hover:bg-white" color="green"
                        size="md">
                        <template #trailing>
                            <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                        </template>
                    </UButton>
                </UForm>
            </div>

            <div class="col-span-2 py-4 sticky top-0">
                <div>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { createConference } from '~/composables/store/useConference'
import { handleApiError } from '~/composables/useApiError'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import imageCompression from 'browser-image-compression'

import { usersList } from '~/composables/store/useUser'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const langs = [
    {
        label: 'French',
        value: 'fr'
    },
    {
        label: 'English',
        value: 'en'
    },
]

const users = computed(() => {
    let data = userStore.getUsers
    return data?.data?.map(user => ({
        id: user.id,
        label: user.full_name
    }));
})

const compressedFiles = ref([])
const inputFileImage = ref(null)
const errors = ref([])
const dayjs = useDayjs()
const submitLoading = ref(false)
const form = ref()

const externalUserName = ref()
const externalUserEmail = ref()


definePageMeta({
    layout: 'auth',
    title: 'Service',
    middleware: ['auth']
})


const state = reactive({
    title: undefined,
    short_description: undefined,
    full_description: undefined,
    lang: undefined,
    max_attendees: undefined,
    duration: undefined,
    date: new Date(),
    price: undefined,
    subscribers_price: undefined,
    domains: [],
    internal_animators: [],
    external_animators: [],
})


const getDataFromApi = async () => {
    await usersList()
};

watchEffect(() => {
    getDataFromApi();
});


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

const convertTimeToUTC = (dateTime, format) => {
    const dayjs = useDayjs()
    return dayjs.utc(dateTime).format(format)
}


const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const addExternalUser = () => {
    errors.value = errors.value.filter(error => error.key !== 'externalUserName');
    if (externalUserName.value && isValidEmail(externalUserEmail.value)) {
        state.external_animators.push({ external_user_name: externalUserName.value, external_user_email: externalUserEmail.value })
        externalUserName.value = ""
        externalUserEmail.value = ""
    } else {
        errors.value.push({ key: 'externalUserName', value: 'Invalid Full name or email.' })
    }
}


const removeExternalUser = (index) => {
    if (index > -1 && index < state.external_animators.length) {
        state.external_animators.splice(index, 1);
    }
}

const validationData = () => {
    errors.value = []
    if (state.domains.length <= 0) {
        errors.value.push({ key: 'domain', value: 'Domains can not be empty' })
    }
}

const onSubmit = async () => {
    validationData()
    let formData = new FormData()

    for (const key in state) {
        if (state.hasOwnProperty(key)) {
            if (Array.isArray(state[key])) {
                if (key === 'internal_animators') {
                    state[key].forEach((item, index) => {
                        formData.append(`${key}[${index}][user_id]`, (item?.id) ? item.id : item);
                    })
                } if (key === 'external_animators') {
                    state[key].forEach((item, index) => {
                        formData.append(`${key}[${index}][external_user_name]`, (item?.external_user_name))
                        formData.append(`${key}[${index}][external_user_email]`, (item?.external_user_email))
                    })
                } else {
                    if (key != 'external_animators' && key != 'internal_animators') {
                        state[key].forEach((item, index) => {
                            formData.append(`${key}[${index}]`, (item?.id) ? item.id : item);
                        })
                    }
                }
            } else if (key === 'date') {
                const formattedDate = convertTimeToUTC(state[key], 'YYYY-MM-DD HH:mm:ss')
                formData.append(key, formattedDate);
            } else {
                formData.append(key, state[key]);
            }
        }
    }

    if (compressedFiles.value[0].file) {
        formData.append('image', compressedFiles.value[0].file)
    }
    submitLoading.value = true
    const result = await createConference(formData)
    if (result?.success) {
        // redicrect to conferences
        await navigateTo('/conferences')
    } else {
        if (result.error.statusCode == 422) {
            const error = handleApiError(result.error);
            console.log(error);

            form.value.setErrors(error.errors);
        }
    }

    submitLoading.value = false
}

</script>


<style>
.dp__theme_dark {
    --dp-background-color: #111827;
    --dp-text-color: #fff;
    --dp-hover-color: #484848;
    --dp-hover-text-color: #fff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #34d399;
    --dp-primary-disabled-color: #61a8ea;
    --dp-primary-text-color: #fff;
    --dp-secondary-color: #a9a9a9;
    --dp-border-color: #374151;
    --dp-menu-border-color: #2d2d2d;
    --dp-border-color-hover: #374151;
    --dp-border-color-focus: #34d399;
    --dp-disabled-color: #232323;
    --dp-disabled-color-text: #d0d0d0;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: #00701a;
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #959595;
    --dp-danger-color: #e53935;
    --dp-marker-color: #e53935;
    --dp-tooltip-color: #3e3e3e;
    --dp-highlight-color: rgb(0 92 178 / 20%);
    --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
    --dp-range-between-border-color: var(--dp-hover-color, #fff);
}

.dp__theme_light {
    --dp-background-color: #fff;
    --dp-text-color: #212121;
    --dp-hover-color: #f3f3f3;
    --dp-hover-text-color: #212121;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #34d399;
    --dp-primary-disabled-color: #6bacea;
    --dp-primary-text-color: #f8f5f5;
    --dp-secondary-color: #c0c4cc;
    --dp-border-color: #ddd;
    --dp-menu-border-color: #ddd;
    --dp-border-color-hover: #aaaeb7;
    --dp-border-color-focus: #aaaeb7;
    --dp-disabled-color: #f6f6f6;
    --dp-scroll-bar-background: #f3f3f3;
    --dp-scroll-bar-color: #959595;
    --dp-success-color: #76d275;
    --dp-success-color-disabled: #a3d9b1;
    --dp-icon-color: #959595;
    --dp-danger-color: #ff6f60;
    --dp-marker-color: #ff6f60;
    --dp-tooltip-color: #fafafa;
    --dp-disabled-color-text: #8e8e8e;
    --dp-highlight-color: rgb(25 118 210 / 10%);
    --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
    --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}
</style>
