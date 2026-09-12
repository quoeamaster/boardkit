<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification';
import { type Notification } from '@/models/notification/notification';

const notificationStore = useNotificationStore()

interface Props {
    index: number
    item: Notification
}
const props = defineProps<Props>()

const handlerOnClick = () => {
    notificationStore.updateItemByIndex(props.index, {
        ...props.item,
        isRead: true,
    })
}

</script>

<template>
    <div @click="handlerOnClick">
        <!-- 
        💣 or 💥 | 𝍔 | ⚠ | ℹ (deduced by level property)
        see https://emojipedia.org/
        message => trimmed to 20 characters
        on-click
            - show timestamp
            - show details
            - isRead property toggled to true
        -->
        {{ props.item.time }} - {{ props.item.isRead }}
    </div>
</template>