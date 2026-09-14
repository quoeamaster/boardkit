<script setup lang="ts">
import { computed, ref } from 'vue';
import { useNotificationStore } from '@/stores/notification';
import { type Notification } from '@/models/notification/notification';

const notificationStore = useNotificationStore()

interface Props {
    index: number
    item: Notification
}
const props = defineProps<Props>()
const isClicked = ref(false)

const handlerOnClick = () => {
    notificationStore.updateItemByIndex(props.index, {
        ...props.item,
        isRead: true,
    })
    // toggling
    isClicked.value = !isClicked.value
}

const itemLevelEmoji = computed(() => {
    switch (props.item.level) {
        case 'error':
            return '💥'
        case 'warning':
            return '⚠'
        case 'info':
            return 'ℹ'
        default:
            // should not happen though...
            return '𝍔'
    }
})

const itemClass = computed(() => {
    const fontClass = isClicked.value ? 'text-sm font-bold' : 'text-sm'
    switch (props.item.level) {
        case 'error':
            return 'bg-red-400/10 text-red-800 ' + fontClass
        case 'warning':
            return 'bg-yellow-400/10 text-yellow-800 ' + fontClass
        case 'info':
            return 'bg-blue-400/10 text-blue-800 ' + fontClass
    }
})

const itemDetailsClass = computed(() => {
    let classList = itemClass.value
    if (isClicked.value) {
        classList += ' block'
    } else {
        classList += ' hidden'
    }
    return classList
})

const itemMessageTrimmed = computed(() => {
    if (isClicked.value) {
        return props.item.message
    }
    return props.item.message.length > 42 ? props.item.message.substring(0, 42) + '...' : props.item.message
})

</script>

<template>
    <div @click="handlerOnClick" class="p-0.5 cursor-pointer">
        <!-- 
        💣 or 💥 | 𝍔 | ⚠ | ℹ (deduced by level property)
        see https://emojipedia.org/
        message => trimmed to 20 characters
        on-click
            - show timestamp
            - show details
            - isRead property toggled to true
        -->
        <div class="flex items-center gap-2 py-0.5" :class="itemClass">
            <div class="w-8 flex-none text-right pr-2">{{ itemLevelEmoji }}</div>
            <div class="w-64 flex-1 
                border-b border-gray-200 pb-0.5">{{ itemMessageTrimmed }}</div>
        </div>
        <div class="flex items-center gap-2 py-0.5" :class="itemDetailsClass">
            <div class="w-8 flex-none">&nbsp;</div>
            <div>
                <div>At {{ props.item.time }}</div>
                <div>
                    <div>Details:</div>
                    <div class="pl-2">{{ props.item.details }}</div>
                </div>
            </div>
        </div>
    </div>
</template>