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
                <div class="flex space-x-4">
                    <UDropdown :items="(post?.is_mine) ? minePostDropDown : otherPostDropDown"
                        :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-end' }">
                        <UButton icon="i-heroicons-ellipsis-vertical" size="sm"
                            :color="$colorMode.value == 'dark' ? 'white' : 'black'" variant="link" :trailing="false" />

                        <template #item="{ item }">
                            <button class="w-full flex items-center justify-between" @click="item.function()">
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

                <div class="flex items-center justify-between">
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
                                        <div class="flex flex-col items-center"
                                            v-for="reaction in settings.reaction.type">
                                            <UTooltip :text="reaction.label">
                                                <UButton size="sm" color="primary" square variant="link">
                                                    <Icon v-if="reaction.case == 'LIKE'" @click="togglePostReaction(1)"
                                                        name="tabler:thumb-up-filled" class="text-green-600"
                                                        size="22" />
                                                    <Icon v-if="reaction.case == 'LOVE'" @click="togglePostReaction(2)"
                                                        name="tabler:heart-filled" class="text-red-600" size="22" />
                                                    <Icon v-if="reaction.case == 'HAHA'" @click="togglePostReaction(3)"
                                                        name="tabler:mood-smile-filled" class="text-orange-500"
                                                        size="22" />
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
                    <UButton @click="shareLink()" size="sm" color="primary" square variant="link"
                        class="flex items-center space-x-0 font-semibold cursor-pointer hover:no-underline">
                        <Icon name="tabler:share-3" class="dark:text-white text-primary" size="22" />
                    </UButton>
                </div>
            </div>
        </div>
    </UCard>

    <!-- list of reactions -->
    <UModal v-model="showReactions">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div v-if="postReactions">
                    <span class="text-sm">{{ postReactions.meta.total }} Reaction'(s)</span>
                </div>
                <div v-else>
                    <span class="text-sm">0 Reaction'(s)</span>
                </div>
            </template>

            <div class="flex flex-col space-y-4" v-if="postReactions">
                <div v-for="reaction in postReactions.data">
                    <div
                        class="flex items-center space-x-2.5 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600">
                        <div
                            class="avatar h-10 w-10 relative dark:bg-slate-800 bg-slate-300 rounded-full flex justify-center items-center">
                            <img v-if="reaction.user.image_url" class="rounded-full object-cover w-full h-full"
                                :src="reaction.user.image_url" alt="avatar" />
                            <UAvatar v-else :alt="reaction.user.full_name" size="sm" />
                            <UButton size="xs" color="primary" square variant="link"
                                class="absolute -right-1 -bottom-1 p-0">
                                <Icon v-if="reaction.type == 1" name="tabler:thumb-up-filled" class="text-green-600"
                                    size="16" />
                                <Icon v-if="reaction.type == 2" name="tabler:heart-filled" class="text-red-600"
                                    size="16" />
                                <Icon v-if="reaction.type == 3" name="tabler:mood-smile-filled" class="text-orange-500"
                                    size="16" />
                            </UButton>
                        </div>
                        <h4>{{ reaction.user.full_name }}</h4>
                    </div>
                </div>

                <div v-if="postReactions.meta.total == 0">
                    <img class="flex dark:hidden mx-auto" src="~/assets/svg/vectors/empty.svg" draggable="false" alt=""
                        srcset="" />
                    <img class="hidden dark:flex mx-auto" src="~/assets/svg/vectors/empty-white.svg" draggable="false"
                        alt="" srcset="" />
                    <div class="my-4 text-center">
                        <h2 class="text-xl font-semibold">{{ $t("No reactions on post") }}</h2>
                    </div>
                </div>
            </div>

            <div class="flex flex-col space-y-4" v-else>
                <div v-for="i in 3"
                    class="flex items-center space-x-2.5 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600">
                    <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
                    <div class="flex flex-1 flex-col space-y-3">
                        <USkeleton class="h-4" />
                        <USkeleton class="h-4 w-2/5" />
                    </div>
                </div>
            </div>

            <template #footer v-if="postReactions && postReactions.meta.total > 10">
                <UPagination v-model="page" :page-count="10" :total="postReactions.meta.total" />
            </template>
        </UCard>
    </UModal>

    <!-- list of commnets -->
    <UModal v-model="showComments">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div v-if="postCommnets">
                    <span class="text-sm">{{ postCommnets.meta.total }} Comment'(s)</span>
                </div>
                <div v-else>
                    <span class="text-sm">0 Comment'(s)</span>
                </div>
            </template>

            <div class="flex flex-col space-y-2 h-[350px] overflow-auto is-scrollbar-hidden" v-if="postCommnets">
                <div v-for="comment in postCommnets.data">
                    <div class="flex items-center justify-between">
                        <div
                            class="flex items-center space-x-2.5 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600">
                            <UAvatar :src="comment.user.image_url" :alt="comment.user.full_name" size="md" />
                            <div class="flex flex-1 flex-col items-start">
                                <div
                                    class="flex flex-col px-3 py-2 text-sm bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-md">
                                    <h4 class="font-bold">{{ comment.user.full_name }}</h4>
                                    <p>{{ comment.description }}</p>
                                </div>
                                <span class="text-xs">{{ $moment(comment.created_at).fromNow() }}</span>
                            </div>
                        </div>
                        <div v-if="comment.mine">
                            <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
                                :popper="{ placement: 'bottom-start' }">
                                <UButton icon="i-heroicons-ellipsis-vertical" size="sm"
                                    :color="$colorMode.value == 'dark' ? 'white' : 'black'" variant="link"
                                    :trailing="false" />

                                <template #item="{ item }">
                                    <button class="w-full flex items-center justify-between"
                                        @click="item.function(comment)">
                                        <span class="truncate">{{ item.label }}</span>
                                        <UIcon :name="item.icon"
                                            class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                                    </button>
                                </template>
                            </UDropdown>
                        </div>
                    </div>
                </div>

                <InfiniteLoading @infinite="fetchMoreComments">
                    <template #spinner>
                        <div class="flex justify-center w-full">
                            <LoadingIcon />
                        </div>
                    </template>
                    <template v-if="postCommnets.data.length > 0" #complete>
                        <span>No more data found!</span>
                    </template>
                </InfiniteLoading>

                <div class="flex justify-center items-center w-full h-full" v-if="postCommnets.meta.total == 0">
                    <div>
                        <img class="flex dark:hidden mx-auto" src="~/assets/svg/vectors/empty.svg" draggable="false"
                            alt="" srcset="" />
                        <img class="hidden dark:flex mx-auto" src="~/assets/svg/vectors/empty-white.svg"
                            draggable="false" alt="" srcset="" />
                        <div class="my-4 text-center">
                            <h2 class="text-xl font-semibold">No comment on post</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col space-y-4 h-[350px] overflow-auto is-scrollbar-hidden" v-else>
                <div v-for="i in 8"
                    class="flex items-center space-x-2.5 py-2.5 font-inter hover:bg-slate-150 dark:hover:bg-navy-600">
                    <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
                    <div class="flex flex-1 flex-col space-y-3">
                        <USkeleton class="h-4" />
                        <USkeleton class="h-4 w-2/5" />
                    </div>
                </div>
            </div>

            <template #footer>
                <UInput v-model="comment" @keyup.enter="sendComment" class="flex-1" size="lg"
                    placeholder="Write a comment...">
                    <template #trailing>
                        <UButton size="sm" :color="$colorMode.value == 'dark' ? 'white' : 'black'" square
                            variant="link">
                            <Icon name="tabler:send-2" size="22" />
                        </UButton>
                    </template>
                </UInput>
            </template>
        </UCard>
    </UModal>

    <UModal v-model="showReport">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <h2 class="text-lg font-semibold">{{ $t("Report Post") }}</h2>
            </template>
            <UForm :schema="schema" :state="state" @submit="sendReport" class="flex flex-col space-y-4">
                <UFormGroup label="Description" name="description">
                    <UTextarea v-model="state.description" rows="10" size="lg" placeholder="Write a report..." />
                </UFormGroup>

                <UButton type="submit" :loading="loading" size="lg" color="green" block>{{ $t("Send Report") }}
                </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>

<script setup>
import { useSettings } from "~/stores/settings"
import { z } from 'zod'
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { toogleReaction, getReactions, createComment, editComment, deleteComment, getComments, getPaginationsComments } from "~/composables/store/usePost"
import { report } from "~/composables/store/useReport"

const settingStore = useSettings()
const snackbar = useSnackbar()

const settings = computed(() => settingStore.getSettings)

const showComments = ref(false)
const showReactions = ref(false)
const showReport = ref(false)
const postReactions = ref(null)
const postCommnets = ref(null)
const comment = ref("");
const selectedComment = ref(null)
const page = ref(1)
const loading = ref(false)

const emits = defineEmits(['deletePostFun', 'deletePostFunc'])


const schema = z.object({
    description: z.string().nonempty("Description is required"),
})


const props = defineProps({
    post: { type: String, required: true },
    user: { type: String, required: true },
})

const state = reactive({
    description: "",
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
}

const getPostReactions = async (id) => {
    postReactions.value = null;
    showReactions.value = true;
    const result = await getReactions(id);
    if (result) {
        postReactions.value = result;
    }
}

const getPostComments = async (id) => {
    showComments.value = true;
    postCommnets.value = null;
    comment.value = "";
    const result = await getComments(props.post?.id);
    if (result) {
        postCommnets.value = result;
    }
}

const sendComment = async () => {
    if (comment.value.trim() == "") return;
    const payload = { description: comment.value };
    let result = "";
    if (selectedComment.value) {
        result = await editComment(props.post?.id, selectedComment.value.id, payload);
        let commentIndex = postCommnets.value.data.findIndex(
            (comment) => comment.id === selectedComment.value.id
        );
        postCommnets.value.data[commentIndex].description = comment.value;
    } else {
        result = await createComment(props.post?.id, payload);
        if (result.success) {
            getPostComments(props.post?.id);
            props.post.value.comments_count += 1;
            // const index = posts.value.data.findIndex((post) => post.id === props.post?.id);
            // post.value.data[index].comments_count += 1;
        }
    }
    selectedComment.value = null;
    comment.value = "";
}

const editPostCommnet = (data) => {
    comment.value = data.description;
    selectedComment.value = data;
}

const deletePostCommnet = async (comment) => {
    const result = await deleteComment(props.post?.id, comment.id);
    if (result.success) {
        postCommnets.value.data = postCommnets.value.data.filter(
            (item) => item.id !== comment.id
        );
        postCommnets.value.meta.total -= 1;
        const index = posts.value.data.findIndex((post) => post.id === props.post?.id);
        posts.value.data[index].comments_count -= 1;
    }
}

const fetchMoreComments = async ($state) => {
    if (postCommnets.value?.links?.next == null) {
        $state.complete();
        return;
    }
    try {
        const result = await getPaginationsComments(postCommnets.value.links.next);
        postCommnets.value.data.push(...result.data);
        postCommnets.value.links = result.links;
        if (result.data.length < 10) $state.complete();
    } catch (error) {
        $state.error();
    }
}


const editPostFun = () => {
    emits('editPostFun', props.post);
}

const deletePostFun = () => {
    emits('deletePostFunc', props.post);
}

const reportPostFun = () => {
    showReport.value = true
    emits('reportPostFunc');
}

const sendReport = async () => {
    const payload = { description: state.description, type: 1 }
    loading.value = true
    const result = await report('posts', props.post?.id, payload)
    loading.value = false
    if (result?.success) {
        snackbar.add({
            type: 'success',
            text: 'Report sent successfully',
        })
        showReport.value = false
        state.description = ""
    } else {
        snackbar.add({
            type: 'error',
            text: 'Report failed to send',
        })
    }
}

const shareLink = () => {
    const url = `${window.location.origin}/post/${props.post?.id}`
    navigator.clipboard.writeText(url)
    snackbar.add({
        type: 'success',
        text: 'Link copied to clipboard',
    })
}

const minePostDropDown = [
    [
        {
            key: "edit",
            label: "Edit",
            icon: "tabler:pencil",
            function: editPostFun,
        },
        {
            key: "delete",
            label: "Delete",
            icon: "tabler:trash",
            function: deletePostFun,
        },
    ],
]

const otherPostDropDown = [
    [
        {
            key: "report",
            label: "Report",
            icon: "tabler:alert-octagon",
            function: reportPostFun,
        },
    ],
]

const items = [
    [
        {
            label: "Edit",
            icon: "i-heroicons-pencil-square",
            function: editPostCommnet,
        },
        {
            label: "Delete",
            icon: "i-heroicons-trash",
            function: deletePostCommnet,
        },
    ],
]

</script>