<script setup>
definePageMeta({
    layout: "auth",
    title: "Login Page",
});

</script>

<template>
    <div class="bg-[#F1F5F9]">
        <div class="mx-auto w-full max-w-screen-xl py-4">
            <div class="flex flex-col">
                <div class="rounded-tr-md rounded-tl-md h-96 w-full overflow-hidden relative">
                    <div class="h-full w-full ">
                        <img src="https://random-image-pepebigotes.vercel.app/api/random-image"
                            class="w-full h-full object-cover" alt="">
                    </div>
                    <div
                        class="flex space-x-3 absolute  bottom-4 right-4 rounded-full hover:bg-primary text-xs cursor-pointer transition-all duration-150 hover:shadow-md px-4 py-2 backdrop-blur-md bg-white/30">
                        <img src="~/assets/svg/icons/image-edit.svg" alt="" srcset="">
                        <span class="text-white hidden md:block">Modifier la Couverture</span>
                    </div>
                </div>

                <div class="pb-4 w-full shadow-sm bg-white">
                    <div class="flex md:flex-row flex-col items-center md:items-start space-x-4 space-y-2 w-3/4 mx-auto ">
                        <div class="w-32 h-32 bg-white shadow-sm p-1 rounded-2xl relative -mt-12 md:mx-0 mx-auto md:block">
                            <img src="https://random-image-pepebigotes.vercel.app/api/random-image"
                                class="w-full h-full object-cover rounded-2xl" alt="">
                            <UButton :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-pencil-square" size="xs"
                                class="absolute bottom-0 right-0 backdrop-blur-md bg-white/30 hover:bg-primary" square
                                variant="solid">
                                <template #leading>
                                    <img src="~/assets/svg/icons/image-edit.svg" alt="" srcset="">
                                </template>
                            </UButton>
                        </div>
                        <div class="pb-4 pt-2 md:w-2/4 w-full max-h-32 overflow-hidden text-center md:text-start">
                            <h1 class="font-bold text-xl">Zouhir Kouider </h1>
                            <p class="text-xs">
                                I’m the most awesome person I know. A professional Product, Website and UI/UX Designer +
                                God
                                fearing.
                                I’m the most awesome person I know. A professional Product, Website and UI/UX Designer +
                                God
                                fearing.
                                I’m the most awesome person I know. A professional Product, Website and UI/UX Designer +
                                God
                                fearing.
                            </p>
                        </div>

                        <div class="space-x-4 items-center flex md:hidden my-4">
                            <UButton icon="i-heroicons-plus" size="sm" class="py-2 px-4" color="primary" variant="solid"
                                label="Create" :trailing="false" />
                            <UButton icon="i-heroicons-pencil-square" class="hover:bg-primary/5 py-2 px-4" size="sm"
                                color="primary" variant="outline" label="Update profile" :trailing="false" />
                        </div>
                    </div>
                </div>

            </div>
            <div class="my-2 px-4 py-4 bg-white flex flex-wrap justify-between items-center">
                <ul class="flex space-x-4 items-center flex-1 overflow-auto">
                    <li class="pb-2 border-b-4 border-primary font-semibold text-primary">Feed</li>
                    <li class="pb-2">Announces</li>
                    <li class="pb-2">Masterclass</li>
                    <li class="pb-2">Conferences</li>
                    <li class="pb-2">Podcast</li>
                </ul>
                <div class="space-x-4 items-center hidden md:flex">
                    <UButton icon="i-heroicons-plus" size="sm" class="py-2 px-4" color="primary" variant="solid"
                        label="Create" :trailing="false" />
                    <nuxt-link to="update">
                        <UButton icon="i-heroicons-pencil-square" class="hover:bg-primary/5 py-2 px-4" size="sm"
                        color="primary" variant="outline" label="Update profile" :trailing="false" />
                    </nuxt-link>
                    <UButton icon="i-heroicons-ellipsis-horizontal" size="sm" class="hover:bg-primary/5 py-2 px-2"
                        color="primary" square variant="outline" />
                </div>
            </div>
        </div>
    </div>
</template>