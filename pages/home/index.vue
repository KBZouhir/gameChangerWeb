<template>
    <div class="h-full grid grid-cols-4 gap-6 bg-[#F1F5F9] py-8">
        <div class="sticky top-0 hidden md:block">

        </div>

        <div class="flex flex-col col-span-4 md:col-span-2 mx-auto p-2">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div
                    class="md:col-span-3 text-white bg-[url('~/assets/img/announcent.webp')] bg-cover rounded-lg overflow-hidden">
                    <div class="p-8 w-full h-full flex flex-col space-y-4 bg-gradient-to-r from-primary to-transparent">
                        <div>
                            <span class="text-xs">Game changer media </span>
                            <h2 class="text-2xl font-bold">Service banner</h2>
                        </div>
                        <p class="text-sm">In publishing and graphic design, Lorem ipsum is a placeholder text</p>
                        <div>
                            <UButton label="Discover" :ui="{ rounded: 'rounded-full' }" color="white" variant="solid"
                                class="px-4 py-2">
                                <template #trailing>
                                    <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                                </template>
                            </UButton>
                        </div>
                    </div>
                </div>

                <div class="md:col-span-2 p-8  bg-[#FFBB0C] rounded-lg flex flex-col justify-center space-y-6">
                    <div>
                        <h2 class="text-2xl font-semibold">Offer</h2>
                        <p class="text-4xl font-bold">Get 15%</p>
                    </div>
                    <div>
                        <UButton label="Grab Offer" :ui="{ rounded: 'rounded-full' }" color="white" variant="solid"
                            class="px-4 py-2">
                            <template #trailing>
                                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                            </template>
                        </UButton>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-white rounded-xl flex items-center space-x-4 mb-4 mt-8 shadow-sm">
                <div class="w-10 h-10 rounded-full bg-red-100 shadow-sm overflow-hidden">
                    <img :src="user?.image_url" class="object-cover" alt="" srcset="">
                </div>
                <button class="flex-1 text-start" @click="isOpen = true">
                    <span class="pt-2 select-none">Write something ...</span>
                </button>
                <button @click="isOpen = true" type="button"
                    class="rounded-full bg-primary p-2 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                            d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                </button>
            </div>

            <UCard v-for="post in posts" class="my-2">
                <div class="flex justify-between items-center flex-wrap">
                    <div class="flex items-center space-x-4">
                        <div class="w-10 h-10 rounded-full bg-red-100 shadow-sm overflow-hidden">
                            <img :src="post.author?.image_url" class="object-cover" alt="" srcset="">
                        </div>
                        <div class="flex flex-col">
                            <h4 class="font-bold mb-0">{{ post.author.full_name }}</h4>
                            <span class="text-xs -mt-[0.5px]">{{ $moment(post.created_at).fromNow() }}</span>
                        </div>
                    </div>
                    <div class="flex space-x-4" v-if="post.author.id == user.id">
                        {{ user.full_name }}
                    </div>
                </div>
                <div class="my-4">
                    <MoreAndLess :description="post.description" :number="200" />
                </div>

                <ClientOnly fallback-tag="div" fallback="" v-if="post.video">
                    <VideoPlayer :videoSrc="`${post.video.url}${post.video.path}`" :poster="post.video.thumbnail_url" />
                </ClientOnly>
                <div>
                    <!-- <div class="w-full grid  gap-3" :class="(images?.length > 1 ? 'grid-cols-2' : 'grid-cols-1')">
                        <button class="w-full max-h-[250px]" :class="conditionalClass(index)"
                            v-for="(image, index) in images" @click="openLightboxOnSlide(index)">
                            <div class="relative h-full">
                                <img alt="gallery" draggable="false" v-if="index < 4"
                                    class="block h-full w-full rounded-lg object-cover object-center" :src="image" />
                                <div v-if="index == 3 && images.length > 4">
                                    <div
                                        class="absolute top-0 left-0 w-full h-full bg-slate-900 opacity-60 rounded-lg flex justify-center items-center">
                                    </div>
                                    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                                        <span class="font-bold text-3xl text-white absolute">+{{ images.length - 4 }}</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                    <FsLightbox :toggler="toggler" :slide="slide" :showThumbsOnMount="true" :sources="images" /> -->

                    <div class="flex items-center space-x-4 my-4 text-sm">
                        <div class="flex items-center">
                            <UPopover mode="hover" :popper="{ placement: 'top-start' }">
                                <div class="flex items-center space-x-0 font-semibold">
                                    <UButton size="sm" color="primary" square variant="link">
                                        <Icon name="tabler:heart" size="22" />
                                    </UButton>
                                    <span>{{ post.reactions_count }}</span>
                                </div>

                                <template #panel>
                                    <div class="p-2 flex space-x-2">
                                        <div class="flex flex-col items-center"
                                            v-for="reaction in settings.reaction.type">
                                            <UTooltip :text="reaction.label">
                                                <UButton size="sm" color="primary" square variant="link">
                                                    <Icon name="tabler:video" size="22" />
                                                </UButton>
                                            </UTooltip>
                                        </div>
                                    </div>
                                </template>
                            </UPopover>
                        </div>

                        <div class="flex items-center space-x-0 font-semibold">
                            <UButton size="sm" color="primary" square variant="link">
                                <Icon name="tabler:message-dots" size="22" />
                            </UButton>
                            <span>{{ post.comments_count }}</span>
                        </div>
                    </div>

                    <div class="p-2 bg-[#F1F5F9] rounded-xl flex space-x-4">
                        <div class="w-10 h-10 rounded-full bg-red-100 shadow-sm overflow-hidden">
                            <img :src="user?.image_url" class="object-cover" alt="" srcset="">
                        </div>
                        <div class="flex-1">
                            <UTextarea :rows="0" :padded="false" autoresize placeholder="Write a comment" variant="none"
                                class="w-full pt-2" />
                        </div>
                    </div>
                </div>
            </UCard>

            <div v-if="!posts" class="flex flex-1 flex-col items-center justify-center py-4">
                <img src="~/assets/svg/vectors/empty.svg" alt="" draggable="false">
                <h2 class="font-semibold text-2xl">No data founds !</h2>
                <p>You don't have any notification yet.</p>
            </div>

            <ClientOnly fallback-tag="div" fallback="">
                <UModal v-model="isOpen" :ui="{ width: 'w-full sm:w-full' }" prevent-close>
                    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                    Create publication
                                </h3>
                                <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                                    @click="isOpen = false" />
                            </div>
                        </template>
                        <div class="flex flex-col space-y-4 relative">
                            <div class="flex flex-col">
                                <div class="relative"
                                    :class="(keyExists('content') && content.replace(/<[^>]*>/g, '').trim() == '') ? 'border-[1px] border-red-400 rounded-md' : ''">
                                    <QuillEditor :options="options" theme="bubble" @text-change="onTextChange"
                                        v-model:content="content" contentType="html" />
                                    <p class="m-0 absolute bottom-2 right-2 text-[8px] font-semibold"
                                        :class="(charCount >= maxLength) ? 'text-red-400' : 'text-slate-400'">
                                        {{ charCount }} / {{ maxLength }}
                                    </p>
                                </div>
                                <p v-show="keyExists('content') && content.replace(/<[^>]*>/g, '').trim() == ''"
                                    class="text-red-500 text-[10px] mb-2">{{ getErrorMessage('content') }}</p>

                                <VueTagsInput v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />

                                <div v-if="selectedViewFiles.length > 0" class="my-4">
                                    <div
                                        class="flex flex-nowrap overflow-x-auto space-x-4 items-center scrollbar-thin scrollbar-h-2 scrollbar-thumb-rounded-full scrollbar-thumb-slate-300/80 scrollbar-track-slate-100">
                                        <div v-for="(file, index) in selectedViewFiles" :key="index"
                                            class="relative group w-32 h-32 flex-none border-[1px] border-[##f1f1f1] rounded-md overflow-hidden transition-all duration-150 ease-in-out">
                                            <div class="w-full h-full overflow-hidden border-e">
                                                <img :src="file" alt="Selected Image"
                                                    class="object-cover w-full h-full" />
                                            </div>
                                            <div
                                                class="bg-primary/75 w-full h-full absolute top-0 group-hover:flex items-center justify-center hidden">
                                                <UButton @click="removeSelectedImage(index)" icon="i-heroicons-trash"
                                                    class="bg-transparent text-red-400 hover:bg-red-700/5 hover:text-red-500 text-xs"
                                                    size="2xs" color="primary" square variant="soft" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex space-x-4 items-center pt-4">
                                    <input ref="inputFileImage" type="file" id="file-input-image"
                                        @change="onImageFileChange" accept="image/*" hidden multiple />
                                    <UButton @click="triggerFileInput" icon="i-heroicons-photo" size="xs"
                                        color="primary" square variant="ghost"
                                        class="hover:bg-primary hover:text-white px-2" label="Image" />
                                    <UButton icon="i-heroicons-video-camera" size="xs"
                                        class="hover:bg-primary hover:text-white px-2" color="primary" square
                                        variant="ghost" label="Video" />
                                </div>
                            </div>

                        </div>
                        <template #footer>
                            <div class="flex justify-end">

                                <UButton size="lg" @click="submitForm" :loading="isLoading" class="px-4 py-2"
                                    icon="i-heroicons-arrow-right" trailing>Post</UButton>
                            </div>
                        </template>
                    </UCard>
                </UModal>
            </ClientOnly>
        </div>
        <USkeleton class="sticky top-0 hidden md:block">

        </USkeleton>
    </div>
</template>


<script setup>
import { create, index } from '~/composables/store/usePost'
import { usePostStore } from "~/stores/posts"
import FsLightbox from "fslightbox-vue/v3"
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import Compressor from 'compressorjs'
import { useAuthStore } from "~/stores/authStore"
import { useSettings } from "~/stores/settings";


const authStore = useAuthStore()
const settingStore = useSettings()
const postStore = usePostStore()

definePageMeta({
    layout: 'auth',
    title: 'Forgot password',
    middleware: []
})

const toggler = ref(false)
const slide = ref(1)
const isOpen = ref(false)
const maxLength = ref(200);
const charCount = computed(() => countChars(content.value));
const user = computed(() => authStore.getAuthUser);
const settings = computed(() => settingStore.getSettings);
const content = ref('');
const inputFileImage = ref()
const selectedFiles = ref([])
const selectedViewFiles = ref([])
const isLoading = ref(false)
const tag = ref()
const tags = ref([])
const errors = ref([])

const options = ref({
    modules: {
    },
    placeholder: 'What\'s on your mind?',
    theme: 'bubble',
})

defineShortcuts({
    escape: {
        usingInput: true,
        whenever: [isOpen],
        handler: () => { isOpen.value = false }
    }
})

const posts = computed(() => postStore.getPosts);
console.log(user.value);

const getDataFromApi = async () => {
    await index()
};

watchEffect(() => {
    getDataFromApi();
});

const conditionalClass = (index) => {
    let classList = []
    if (index > 3) {
        classList.push('hidden')
    }

    if (index == images.value.length - 1 && images.value.length && images.value.length % 2 != 0) {
        classList.push('col-span-2')
    }

    return classList
}

const openLightboxOnSlide = (number) => {
    slide.value = number + 1;
    toggler.value = !toggler.value;
}

const keyExists = (key) => {
    return errors.value.some(error => error.key === key)
}

const getErrorMessage = (key) => {
    const error = errors.value.find(error => error.key === key)
    return error ? error.value : ''
}

const removeSelectedImage = (index) => {
    selectedFiles.value.splice(index, 1);
    selectedViewFiles.value.splice(index, 1);
}

const countChars = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    return textContent.length;
};

const onTextChange = (delta, oldDelta, source) => {
    if (charCount.value > maxLength.value) {
        return
    }
};

const triggerFileInput = () => {
    inputFileImage.value.click()
}

const onImageFileChange = (event) => {
    if (event.target.files) {
        Object.entries(event.target.files).forEach(([key, value]) => {
            selectedFiles.value.push(value)
            new Compressor(value, {
                quality: 0.6,
                success(result) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        const img = new Image();
                        img.src = e.target.result;
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = img.width;
                            canvas.height = img.height;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0);
                            selectedViewFiles.value.push(canvas.toDataURL('image/webp'))
                        };
                    }
                    reader.readAsDataURL(value);

                },
                error(err) {
                    console.log(err.message);
                },
            })
        });
    }
}


const validationData = () => {
    if (content.value.replace(/<[^>]*>/g, '').trim() == "") {
        errors.value.push({ key: 'content', value: 'Content can not be empty' })
    }
}

const submitForm = async () => {
    let hashtags = []
    isLoading.value = true
    validationData()
    if (errors.value.length > 0) {
        isLoading.value = false
        return
    }

    tags.value.forEach((tag) => {
        hashtags.push(tag.text)
    })

    let formData = new FormData();
    formData.append('description', content.value);
    formData.append('hashtags', hashtags);
    formData.append('image', selectedFiles.value[0]);

    const result = await create(formData)

    isLoading.value = false
}


</script>

<style scoped lang="css">
:deep(.ql-editor) {
    min-height: 200px;
    border: 1px solid #f1f1f1;
    border-radius: 8px;
    padding-bottom: 26px;
}


:deep(.ql-container) {
    font-size: 12px;
}

:deep(.ql-toolbar.ql-snow) {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

:deep(.ql-container.ql-snow) {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

:deep(.vue-tags-input.ti-focus) {
    max-width: 100% !important;
}

:deep(.vue-tags-input.ti-focus > .ti-input) {
    margin-top: 10px !important;
    border: 1px solid #f1f1f1 !important;
    border-radius: 6px !important;
}

:deep(input.ti-valid.ti-new-tag-input) {
    font-size: 10px !important;
}

:deep(.ti-valid.ti-tag) {
    background-color: #0f172a !important;
}

:deep(.ti-tag-center span) {
    font-size: 10px !important;
    line-height: inherit !important;
}

:deep(.ti-icon-close:before) {
    font-size: 10px !important;
}
</style>
