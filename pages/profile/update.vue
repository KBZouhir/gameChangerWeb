<template>
    <div class="bg-[#F1F5F9] dark:bg-slate-900">
        <div class="mx-auto w-full max-w-screen-xl py-4 px-4 lg:px-0">
            <div class="flex flex-col">
                <div class="rounded-tr-md rounded-tl-md h-96 w-full overflow-hidden relative">
                    <div class="h-full w-full ">
                        <img v-if="!selectedCoverImage" :src="user.cover_image_url || fallbackImage"
                            class="w-full h-full object-cover" draggable="false" alt="">

                        <img v-if="selectedCoverImage" :src="selectedCoverImage" class="w-full h-full object-cover"
                            draggable="false" alt="">
                    </div>
                    <div class="flex space-x-2 items-center absolute  bottom-4 right-4">

                        <UButton label="Submit" :loading="uploadCoverLoading" size="md" color="green" class="px-4"
                            v-if="selectedCoverImage" @click="uploadCoverImageFun" :ui="{ rounded: 'rounded-full' }">
                        </UButton>

                        <button @click="triggerFileUpload"
                            class="flex space-x-3  rounded-full hover:bg-primary text-xs cursor-pointer transition-all duration-150 hover:shadow-md px-4 py-2 backdrop-blur-md bg-white/30">
                            <img src="~/assets/svg/icons/image-edit.svg" alt="" srcset="">
                            <span class="text-white hidden md:block">Modifier la Couverture</span>
                        </button>

                    </div>

                    <input ref="uploadCoverInput" accept="image/*" type="file" hidden @change="updateCoverpage">
                </div>

                <UCard class="pb-4 w-full shadow-sm ">
                    <div
                        class="flex md:flex-row flex-col items-center md:items-start space-x-4 space-y-2 w-3/4 mx-auto ">
                        <div
                            class="w-32 h-32 bg-white dark:bg-slate-900 shadow-sm p-1 rounded-2xl relative -mt-12 md:mx-0 mx-auto md:block">
                            <img v-if="!selectedProfileImage && user?.image_url" :src="user?.image_url"
                                class="w-full h-full object-cover rounded-2xl" :alt="user.full_name">
                            <div v-if="!user?.image_url && !selectedProfileImage"
                                class="w-full h-full flex items-center justify-center text-2xl font-bold">{{
                                getInitials(user.full_name) }}</div>
                            <img v-if="selectedProfileImage" :src="selectedProfileImage"
                                class="w-full h-full object-cover rounded-2xl" :alt="user.full_name">
                            <UButton @click="triggerProfileUpload" :ui="{ rounded: 'rounded-full' }"
                                icon="i-heroicons-pencil-square" size="xs"
                                class="absolute bottom-0 right-0 backdrop-blur-md bg-white/30 hover:bg-primary" square
                                variant="solid">
                                <template #leading>
                                    <img src="~/assets/svg/icons/image-edit.svg" alt="" srcset="">
                                </template>
                            </UButton>
                            <input ref="uploadPictureCoverInput" accept="image/*" type="file" hidden
                                @change="updateProfilePictureFun">
                        </div>
                        <UButton :loading="uploadProfileLoading" size="md" color="green" class="px-4"
                            v-if="selectedProfileImage" @click="uploadProfilePictureFun"
                            :ui="{ rounded: 'rounded-full' }">Submit</UButton>
                        <div class="pb-4 pt-2 md:w-2/4 w-full max-h-32 overflow-hidden text-center md:text-start">
                            <h1 class="font-bold text-xl">{{ user.full_name }}</h1>
                            <p class="text-xs cut-text relative">
                                {{ user.bio }}
                            </p>
                        </div>
                    </div>
                </UCard>

            </div>

            <div class="flex flex-col md:flex-row items-start space-y-4 md:space-x-4 md:space-y-0 my-4  lg:px-0">

                <UCard class="top-0 md:top-4 sticky md:w-3/12 w-full rounded-md shadow-sm z-50">
                    <div class="px-3 overflow-y-auto">
                        <ul class="font-medium text-sm flex flex-row md:flex-col items-center lg:space-y-2 lg:space-x-0 space-x-2">
                            <li class="w-full">
                                <UButton label="General" variant="link" class="hover:no-underline"
                                    :color="currentStep == 0 ? 'green' : 'white'" @click="currentStep = 0">
                                    <!-- <template #leading>
                                        <Icon name="tabler:info-circle" />
                                    </template> -->
                                </UButton>
                            </li>
                            <li class="w-full">
                                <UButton label="Password" variant="link" class="hover:no-underline"
                                    :color="currentStep == 1 ? 'green' : 'white'" @click="currentStep = 1">
                                    <!-- <template #leading>
                                        <Icon name="tabler:shield-lock" />
                                    </template> -->
                                </UButton>
                            </li>
                            <li class="w-full">
                                <UButton label="Interests" variant="link" class="hover:no-underline"
                                    :color="currentStep == 2 ? 'green' : 'white'" @click="currentStep = 2">
                                    <!-- <template #leading>
                                        <Icon name="tabler:shield-lock" />
                                    </template> -->
                                </UButton>
                            </li>
                            <li class="w-full">

                                <UButton label="Domains" variant="link" class="hover:no-underline"
                                    :color="currentStep == 3 ? 'green' : 'white'" @click="currentStep = 3">
                                    <!-- <template #leading>
                                        <Icon name="tabler:shield-lock" />
                                    </template> -->
                                </UButton>

                            </li>
                            <li class="w-full">
                                <UButton label="Address" variant="link" class="hover:no-underline"
                                    :color="currentStep == 4 ? 'green' : 'white'" @click="currentStep = 4">
                                    <!-- <template #leading>
                                        <Icon name="tabler:map-2" />
                                    </template> -->
                                </UButton>
                            </li>

                        </ul>
                    </div>
                </UCard>

                <UCard class=" md:w-9/12 w-full p-4 rounded-md shadow-sm">
                    <div v-if="currentStep == 0" class="py-4">
                        <h1 class="text-xl font-bold mb-2">Update your Informations</h1>
                        <p class="text-xs text-[#989394]">
                            Select a few of your interest to match with users who have similar things in common.
                        </p>
                        <profileGeneral />
                    </div>

                    <div v-if="currentStep == 1" class="py-4">
                        <h1 class="text-xl font-bold mb-2">Update your password</h1>
                        <p class="text-xs text-[#989394]">
                            Select a few of your interest to match with users who have similar things in common.
                        </p>
                        <profilePassword />
                    </div>

                    <div v-if="currentStep == 2" class="py-4">
                        <h1 class="text-xl font-bold mb-2">Update your Interest</h1>
                        <p class="text-xs text-[#989394]">
                            Select a few of your interest to match with users who have similar things in common.
                        </p>
                        <profileInterests />
                    </div>

                    <div v-if="currentStep == 3" class="py-4">
                        <h1 class="text-xl font-bold mb-2">Update your Interest</h1>
                        <p class="text-xs text-[#989394]">
                            Select a few of your interest to match with users who have similar things in common.
                        </p>
                        <profileDomains />
                    </div>

                    <div v-if="currentStep == 4" class="py-4">
                        <h1 class="text-xl font-bold mb-2">Update your address</h1>
                        <p class="text-xs text-[#989394] mb-4">
                            Select a few of your interest to match with users who have similar things in common.
                        </p>
                        <Map />
                    </div>
                </UCard>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useAuthStore } from '~/stores/authStore'

import { updateCoverPage, updateProfilePicture } from '~/composables/store/useProfile'

const authStore = useAuthStore()
const snackbar = useSnackbar()
const user = computed(() => authStore.getAuthUser)

import fallbackImage from '~/assets/img/profile-cover.webp'


const uploadCoverInput = ref(null)
const selectedCoverImage = ref(null)
const uploadCoverLoading = ref(false)
const file = ref()

const uploadPictureCoverInput = ref(null)
const selectedProfileImage = ref(null)
const uploadProfileLoading = ref(false)
const filePicture = ref()

const currentStep = ref(0)

const items = [{
    label: 'Tab1',
    icon: 'i-heroicons-information-circle'
},
{
    label: 'Tab2',
    icon: 'i-heroicons-arrow-down-tray'
},
{
    label: 'Tab3',
    icon: 'i-heroicons-eye-dropper',
},
{
    label: 'Tab2',
    icon: 'i-heroicons-arrow-down-tray'
},
{
    label: 'Tab2',
    icon: 'i-heroicons-arrow-down-tray'
}
]

definePageMeta({
    layout: "auth",
    title: "Login Page",
    middleware: ['auth']
})

const triggerFileUpload = () => {
    uploadCoverInput.value.click();
}

const updateCoverpage = (event) => {
    file.value = event.target.files[0];
    if (file.value) {
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedCoverImage.value = e.target.result;
        };
        reader.readAsDataURL(file.value);
    }
}

const uploadCoverImageFun = async () => {
    uploadCoverLoading.value = true
    let formData = new FormData()

    formData.append('cover_image', file.value)

    const result = await updateCoverPage(formData)

    if (result?.success) {
        selectedCoverImage.value = null
        snackbar.add({
            type: 'success',
            text: 'Cover image updated successfuly'
        })
    }
    uploadCoverLoading.value = false
}


const triggerProfileUpload = () => {
    uploadPictureCoverInput.value.click();
}

const updateProfilePictureFun = (event) => {
    filePicture.value = event.target.files[0];
    if (filePicture.value) {
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedProfileImage.value = e.target.result;
        };
        reader.readAsDataURL(filePicture.value);
    }
}

const uploadProfilePictureFun = async () => {
    uploadProfileLoading.value = true
    let formData = new FormData()

    formData.append('image', filePicture.value)

    const result = await updateProfilePicture(formData)

    if (result?.success) {

        snackbar.add({
            type: 'success',
            text: 'Cover image updated successfuly'
        })
    }
    uploadProfileLoading.value = false
}


const getInitials = (fullName) => {
    return fullName
        .split(' ')
        .map(name => name[0])
        .join('');
}

</script>

<style scoped>
/* .cut-text::before{
    content: '';
    width: 100%;
    position: absolute;
    background: linear-gradient(0deg, white, transparent);
    height: 50px;
    bottom: 0;
} */
</style>