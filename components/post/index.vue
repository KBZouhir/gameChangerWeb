<template>
    <UCard :ui="{ body: 'p-0' }"
        class="overflow-hidden bg-white rounded-xl text-sm font-medium dark:bg-slate-800 shadow-sm p-4">
        <div>
            <div class="flex justify-between items-center flex-wrap">
                <div class="flex items-center space-x-4">
                    <nuxt-link :to="post?.author.id == user?.id
                        ? `profile/update`
                        : `profile/${post?.author.id}`
                        ">
                        <UAvatar :src="post?.author.image_url" :alt="post?.author.full_name" size="md" />
                    </nuxt-link>

                    <div class="flex flex-col">
                        <h4 class="font-bold mb-0">{{ post?.author.full_name }}</h4>
                        <span class="text-xs -mt-[0.5px]">
                            {{ $dayjs(post?.created_at).fromNow() }}
                        </span>
                    </div>
                </div>
                <div class="flex space-x-4" v-if="post?.author.id == user?.id">
                    <UDropdown :items="postDropDown" :ui="{ item: { disabled: 'cursor-text select-text' } }"
                        :popper="{ placement: 'bottom-start' }">
                        <UButton icon="i-heroicons-ellipsis-vertical" size="sm"
                            :color="$colorMode.value == 'dark' ? 'white' : 'black'" variant="link" :trailing="false" />

                        <template #item="{ item }">
                            <button class="w-full flex items-center justify-between" @click="item.function(post)">
                                <span class="truncate">{{ item.label }}</span>
                                <UIcon :name="item.icon"
                                    class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                            </button>
                        </template>
                    </UDropdown>
                </div>
            </div>
            <div class="my-4">
                <MoreAndLess :description="post?.description" :number="200" />
            </div>

            <ClientOnly fallback-tag="div" fallback="" v-if="post?.video">
                <!-- `https://gc-dev.informatikab.com/api/v1${post?.video?.path}` -->
                <!-- <VideoPlayerJS :videoSrc="`${post?.video?.url}`" /> -->
                <VideoPlayer :videoSrc="`${post?.video?.url}`" :poster="post?.video.thumbnail_url" />
            </ClientOnly>
            <div>
                <ImageView v-if="post?.image" :url="`${post?.image.url}`" />

                <div class="flex items-center space-x-4 mt-4 text-sm">
                    <div class="flex items-center">
                        <UPopover mode="hover" :popper="{ placement: 'top-start' }">
                            <div class="flex items-center space-x-0 font-semibold">
                                <div v-if="post?.reaction">
                                    <UButton v-if="post?.reaction == '1'" @click="togglePostReaction(1)" size="sm"
                                        color="primary" square variant="link">
                                        <Icon name="tabler:thumb-up-filled" class="text-green-600" size="22" />
                                    </UButton>
                                    <UButton v-if="post?.reaction == '2'" @click="togglePostReaction(2)" size="sm"
                                        color="primary" square variant="link">
                                        <Icon name="tabler:heart-filled" class="text-red-600" size="22" />
                                    </UButton>
                                    <UButton v-if="post?.reaction == '3'" @click="togglePostReaction(3)" size="sm"
                                        color="primary" square variant="link">
                                        <Icon name="tabler:mood-smile-filled" class="text-orange-500" size="22" />
                                    </UButton>
                                </div>
                                <UButton v-else size="sm" @click="togglePostReaction(2)" color="primary" square
                                    variant="link">
                                    <Icon name="tabler:heart" size="22" class="dark:text-white text-primary" />
                                </UButton>
                                <span @click="getPostReactions(post?.id)">
                                    {{ post?.reactions_count }}
                                </span>
                            </div>

                            <template #panel>
                                <div class="p-2 flex space-x-2">
                                    <div class="flex flex-col items-center" v-for="reaction in settings.reaction.type">
                                        <UTooltip :text="reaction.label">
                                            <UButton size="sm" color="primary" square variant="link">
                                                <Icon v-if="reaction.case == 'LIKE'"
                                                    @click="togglePostReaction(1)"
                                                    name="tabler:thumb-up-filled" class="text-green-600" size="22" />
                                                <Icon v-if="reaction.case == 'LOVE'"
                                                    @click="togglePostReaction(2)" name="tabler:heart-filled"
                                                    class="text-red-600" size="22" />
                                                <Icon v-if="reaction.case == 'HAHA'"
                                                    @click="togglePostReaction(3)"
                                                    name="tabler:mood-smile-filled" class="text-orange-500" size="22" />
                                            </UButton>
                                        </UTooltip>
                                    </div>
                                </div>
                            </template>
                        </UPopover>
                    </div>

                    <UButton @click="getPostComments(post?.id)" size="sm" color="primary" square variant="link"
                        class="flex items-center space-x-0 font-semibold cursor-pointer hover:no-underline">
                        <Icon name="tabler:message-dots" class="dark:text-white text-primary" size="22" />
                        <span class="dark:text-white text-black hover:no-underline">{{
                            post?.comments_count
                        }}</span>
                    </UButton>
                </div>
            </div>
        </div>
    </UCard>
</template>

<script setup>
import { useSettings } from "~/stores/settings"
import { toogleReaction } from "~/composables/store/usePost"

const settingStore = useSettings()

const settings = computed(() => settingStore.getSettings)


const emits = defineEmits(['deletePostFun', 'deletePostFunc']);


const props = defineProps({
    post: { type: String, required: true },
    user: { type: String, required: true },
})


const togglePostReaction = async (reaction_id) => {

    if (props.post.reaction === reaction_id) {
        props.post.reaction = null;
        props.post.reactions_count -= 1;
    } else {
        if (props.post.reaction === null) {
            props.post.reactions_count += 1;
        }
        props.post.reaction = reaction_id;
        console.log(props.post.reaction);
    }

    await toogleReaction(props.post.id, { type: reaction_id });
};


const editPostFun = (post) => {
    emits('deletePostFun', post);
};

const deletePostFun = (post) => {
    emits('deletePostFunc', post);
};


const postDropDown = [
    [
        {
            label: "Edit",
            icon: "i-heroicons-pencil-square",
            function: editPostFun,
        },
        {
            label: "Delete",
            icon: "i-heroicons-trash",
            function: deletePostFun,
        },
    ],
];


</script>