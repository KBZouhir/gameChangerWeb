<template>
    <div>
        <div class="flex items-center justify-between">
            <div class="w-full flex items-center space-x-2.5  font-inter hover:bg-slate-150 dark:hover:bg-navy-600">
                <div class="border dark:border-slate-800 w-4"></div>
                <UAvatar v-if="!comment.mine" :src="comment.user.image_url" :alt="comment.user.full_name" size="md" />
                <UAvatar v-else :src="user.image_url" :alt="user.full_name" size="md" />
                <div class="flex flex-1 flex-col items-start">
                    <div
                        class="flex flex-col px-3 py-2 text-sm bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-md">
                        <h4 v-if="!comment.mine" class="font-bold">{{ comment.user.full_name }}</h4>
                        <h4 v-else class="font-bold">{{ user.full_name }}</h4>
                        <p>{{ comment.description }}</p>
                    </div>
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center space-x-2">
                            <UButton :label="$moment(comment.created_at).fromNow()" size="xs" color="white" square
                                variant="link"></UButton>
                            <UPopover mode="hover" :popper="{ placement: 'top-start' }">
                                <div class="flex items-center space-x-0 font-semibold">
                                    <span v-if="comment.reactions_count" class="text-xs hover:underline" :class="reactionColor"
                                        @click="showReactionList()">({{ comment.reactions_count }})</span>
                                    <div v-if="comment?.reaction">
                                        <UButton v-if="comment?.reaction == 1" @click="toggleCommentReactionFun(1)"
                                            size="xs" :label="`Like`" color="green" square variant="link" />
                                        <UButton v-if="comment?.reaction == 2" @click="toggleCommentReactionFun(2)"
                                            size="xs" :label="`Love`" color="red" square variant="link" />
                                        <UButton v-if="comment?.reaction == 3" @click="toggleCommentReactionFun(3)"
                                            size="xs" :label="`Haha`" color="yellow" square variant="link" />
                                    </div>
                                    <UButton v-else size="xs" label="Like" @click="toggleCommentReactionFun(2)"
                                        color="white" square variant="link">
                                    </UButton>
                                </div>

                                <template #panel>
                                    <div class="p-2 flex space-x-2">
                                        <div class="flex flex-col items-center"
                                            v-for="reaction in settings.reaction.type">
                                            <UTooltip :text="reaction.label">
                                                <UButton size="sm" color="primary" square variant="link">
                                                    <Icon v-if="reaction.case == 'LIKE'"
                                                        @click="toggleCommentReactionFun(1)"
                                                        name="tabler:thumb-up-filled" class="text-green-600"
                                                        size="22" />
                                                    <Icon v-if="reaction.case == 'LOVE'"
                                                        @click="toggleCommentReactionFun(2)" name="tabler:heart-filled"
                                                        class="text-red-600" size="22" />
                                                    <Icon v-if="reaction.case == 'HAHA'"
                                                        @click="toggleCommentReactionFun(3)"
                                                        name="tabler:mood-smile-filled" class="text-orange-500"
                                                        size="22" />
                                                </UButton>
                                            </UTooltip>
                                        </div>
                                    </div>
                                </template>
                            </UPopover>
                            <!-- <UButton label="Reply" size="xs" color="white" square variant="link"></UButton> -->
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="comment.mine">
                <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
                    :popper="{ placement: 'bottom-start' }">
                    <UButton icon="i-heroicons-ellipsis-vertical" size="sm"
                        :color="$colorMode.value == 'dark' ? 'white' : 'black'" variant="link" :trailing="false" />

                    <template #item="{ item }">
                        <button class="w-full flex items-center justify-between" @click="item.function(comment)">
                            <span class="truncate">{{ item.label }}</span>
                            <UIcon :name="item.icon"
                                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
                        </button>
                    </template>
                </UDropdown>
            </div>
        </div>
        <!-- list of reactions -->
        <UModal v-model="showReactions">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div v-if="commentReactions">
                        <span class="text-sm">{{ commentReactions.meta.total }} Reaction'(s)</span>
                    </div>
                    <div v-else>
                        <span class="text-sm">0 Reaction'(s)</span>
                    </div>
                </template>

                <div class="flex flex-col space-y-4" v-if="commentReactions">
                    <div v-for="reaction in commentReactions.data">
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
                                    <Icon v-if="reaction.type == 3" name="tabler:mood-smile-filled"
                                        class="text-orange-500" size="16" />
                                </UButton>
                            </div>
                            <h4>{{ reaction.user.full_name }}</h4>
                        </div>
                    </div>

                    <div v-if="commentReactions.meta.total == 0">
                        <img class="flex dark:hidden mx-auto" src="~/assets/svg/vectors/empty.svg" draggable="false"
                            alt="" srcset="" />
                        <img class="hidden dark:flex mx-auto" src="~/assets/svg/vectors/empty-white.svg"
                            draggable="false" alt="" srcset="" />
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

                <template #footer v-if="commentReactions && commentReactions.meta.total > 10">
                    <UPagination v-model="page" :page-count="10" :total="commentReactions.meta.total" />
                </template>
            </UCard>
        </UModal>
    </div>
</template>


<script setup>

import { toggleCommentReaction, getCommentReactions } from '~/composables/store/usePost'
import { useSettings } from "~/stores/settings"


const settingStore = useSettings()


const settings = computed(() => settingStore.getSettings)

const props = defineProps({
    comment: { type: String, required: true },
    user: { type: String, required: true },
})

const reactionColor = computed(() => {
    if (props.comment?.reaction) {
        if (props.comment?.reaction == 1) {
            return 'text-green-400'
        } else if (props.comment?.reaction == 2) {
            return 'text-red-400'
        } else if (props.comment?.reaction == 3) {
            return 'text-yellow-400'
        }
    }
    return 'text-gray-400'
})


const showReactions = ref(false)
const commentReactions = ref()



const editPostCommnet = (comment) => {
    console.log(comment)
}

const deletePostCommnet = (comment) => {
    console.log(comment)
}

const toggleCommentReactionFun = async (reaction) => {
    const payload = {
        type: reaction,
    }
    const result = await toggleCommentReaction(props.comment.id, payload)
    if (result?.success) {
        if (result?.reaction) {
            if (!props.comment.reaction) {
                props.comment.reactions_count += 1
            }
            props.comment.reaction = result?.reaction
        } else {
            props.comment.reaction = null
            props.comment.reactions_count -= 1
        }

    }
}

const showReactionList = async () => {
    commentReactions.value = null
    const result = await getCommentReactions(props.comment.id)

    showReactions.value = true
    commentReactions.value = result
}

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
