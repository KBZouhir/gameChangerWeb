<template>
    <div class="max-w-screen-md mx-auto py-4">
        <div
            class="p-4 px-6 ring-1 relative cursor-pointer hover:shadow-lg ease-in-out duration-150 transition-all overflow-hidden ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 rounded-xl flex flex-col space-y-6 mb-4">
            <img src="~/assets/svg/vectors/pattern-rectangle.svg" draggable="false" class="w-12 absolute top-0 right-0"
                alt="" srcset="">
            <div class="flex justify-between items-center">
                <h2 class="font-bold">{{ $t('Notifications List') }}</h2>
                <UButton @click="markAllNotifyAsRead" size="md" color="green" variant="link" label="Mark all as read"
                    class="hover:no-underline hover:bg-green-500/5" :trailing="false">
                    <template #leading>
                        <Icon name="tabler:checks" />
                    </template>
                </UButton>

            </div>
            <UDivider label="" />

            <ul v-if="notifications?.data?.length > 0" role="list" class="">
                <li v-for="(notification, index) in notifications?.data" :key="index"
                    class="flex items-start p-4 shadow mb-4 rounded-md relative bg-transparent border dark:border-slate-800/40">
                    
                    <div class="flex-1">
                        <div class="flex items-center space-x-4 ">
                            <UAvatar v-if="notification.data.image_url" :src="notification.data.image_url" alt="" size="md" />
                            <div v-else class="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                <img  alt="user" :src="user" className="inline-block dark:hidden" />
                                <img  alt="user" :src="userWhite" className="hidden dark:inline-block" />
                            </div>
                            

                            <div class="flex flex-col">
                                <h4 class="font-bold mb-0">{{ notification.data.message }}</h4>
                                
                                <span class="text-xs -mt-[0.5px]">
                                    {{ timego(notification.created_at) }}
                                </span>
                            </div>

                        </div>
                        <div v-if="!notification.read_at"
                            class="w-[6px] h-1/2 rounded-tr-md rounded-br-md bg-green-600 absolute top-1/2 -translate-y-1/2 left-0">
                        </div>
                    </div>
                    <div>
                        <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
                            :popper="{ placement: 'bottom-start' }">
                            <UButton icon="i-heroicons-ellipsis-vertical" size="sm"
                                :color="($colorMode.value == 'dark') ? 'white' : 'black'" variant="link"
                                :trailing="false" />

                            <template #item="{ item }">
                                <UButton size="xs"
                                    :disabled="(item.key == 'as-read' && notification.read_at) ? true : false"
                                    :color="(item.key == 'as-delele') ? 'red' : 'black'" variant="link"
                                    class="hover:no-underline w-full flex items-center justify-between"
                                    @click="item.function(notification)">
                                    <span class="truncate">{{ item.label }}</span>
                                    <UIcon :name="item.icon"
                                        :class="(item.key == 'as-delele') ? 'text-red-400' : 'dark:text-blacktext-white '"
                                        class="flex-shrink-0 h-4 w-4  ms-auto" />
                                </UButton>
                            </template>
                        </UDropdown>
                    </div>
                </li>
                <InfiniteLoading @infinite="fetchMoreNotifications">
                    <template #spinner>
                        <div class="flex justify-center w-full">
                            <LoadingIcon />
                        </div>
                    </template>
                    <template v-if="services?.data?.length > 0" #complete>
                        <div class="flex justify-center my-4">
                            <span>No more data found!</span>
                        </div>
                    </template>
                </InfiniteLoading>
            </ul>
            

            <ul v-if="loadingNotification" role="list" class="">
                <li v-for="(notification, index) in 4" :key="index" class="py-4">
                    <div class="flex items-center space-x-4">
                        <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
                        <div class="flex-1 space-y-2">
                            <USkeleton class="h-4" />
                            <USkeleton class="h-4 w-11/12" />
                        </div>
                    </div>
                </li>
            </ul>
            
            <div v-if="notifications?.data?.length == 0 && !loadingNotification"
                class="flex flex-col justify-center items-center space-y-2">
                <ClientOnly>
                    <img :src="$colorMode.value == 'dark' ? bellWhite : bell" alt="" srcset="">
                    <h2 class="font-semibold text-xl uppercase">{{ $t('No notifications') }}</h2>
                </ClientOnly>

            </div>
        </div>
    </div>
</template>

<script setup>

import { getNotifications, markAsRead, deleteNotification, markAllAsRead } from '~/composables/store/useNotifications'
import { getPaginationsComments } from '~/composables/store/usePost'
import { useNotificationsStore } from "~/stores/notifications"
import bell from '~/assets/svg/vectors/bell.svg'
import bellWhite from '~/assets/svg/vectors/bell-white.svg'
import user from '~/assets/svg/icons/user.svg'
import userWhite from '~/assets/svg/icons/user-white.svg'
import { useDayjs } from '#dayjs'

const store = useNotificationsStore()
const notifications = computed(() => store.getNotifications)
const loadingNotification = ref(false)
const dayjs = useDayjs()

definePageMeta({
    layout: "auth",
    title: "Notification Page",
    middleware: ['auth']
})

const timego = (dateTime) => {
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return dayjs.utc(dateTime).tz(localTimezone).fromNow()
}


const markAllNotifyAsRead = async () => {
    const result = await markAllAsRead();
    if (result?.success) {
        notifications.value.data = notifications.value.data.map(notify => ({
            ...notify,
            read_at: new Date()
        }));
    }
}

const markNotifyAsRead = async (notification) => {
    if (!notification?.read_at) {
        const result = await markAsRead(notification.id);
        if (result?.success) {
            const notifyIndex = notifications.value.data.findIndex(notify => notify.id === notification.id);
            if (notifyIndex !== -1) {
                notifications.value.data[notifyIndex].read_at = new Date();
            }
        }
    }
}

const deleteNotify = async (notification) => {
    const result = await deleteNotification(notification.id);
    if (result?.success) {
        notifications.value.data = notifications.value.data.filter(notify => notify.id !== notification.id);
    }
}


const getDataFromApi = async () => {
    loadingNotification.value = true
    await getNotifications()
    loadingNotification.value = false
}

const fetchMoreNotifications = async $state => {
    console.log("fetch more data");

    if (notifications.value?.links?.next == null) { $state.complete(); return }
    try {
        const result = await getPaginationsComments(notifications.value.links.next)
        notifications.value.data.push(...result.data)
        notifications.value.links = result.links
        if (result.data.length < 10) $state.complete()

    } catch (error) {
        $state.error()
    }
}

const items = [
    [
        {
            key: 'as-read',
            label: 'Mark as read',
            icon: 'i-heroicons-check',
            function: markNotifyAsRead
        }, {
            key: 'as-delele',
            label: 'Delete',
            icon: 'i-heroicons-trash',
            function: deleteNotify
        }
    ]
]

watchEffect(() => {
    getDataFromApi()
})

</script>
