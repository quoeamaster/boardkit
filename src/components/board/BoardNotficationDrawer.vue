<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'
import BoardNotificationDrawerItem from './BoardNotificationDrawerItem.vue'

const notificationStore = useNotificationStore()

const drawerClasses = computed(() => {
    return notificationStore.getIsDrawerOpen ? 'translate-x-0' : 'translate-x-full'
})

/**
 * Toggles the open state of the notification drawer.
 * Invokes the `toggleDrawer` action from the notification store, which flips
 * the drawer's visibility between open and closed.
 */
const handlerToggleDrawerOpenState = () => {
    notificationStore.toggleDrawer()
}
</script>

<template>
    <!-- backdrop -->
    <div v-if="notificationStore.getIsDrawerOpen" 
        class="fixed inset-0 z-40 bg-black/20"></div>
    
    <!-- drawer `left-0` if want to keep drawer on the left side of the screen instead -->
    <aside :class="drawerClasses" class="fixed inset-y-0 
        mt-16 right-0 z-50 flex w-[400px] max-w-[90vw] flex-col
        border-l border-gray-200 bg-white shadow-xl
        transition-transform duration-300 ease-in-out"
    >
        <header
            class="flex h-14 shrink-0 items-center justify-between
                border-b border-gray-200 px-4"
            >
                <h2 class="text-sm font-semibold text-gray-900">
                    Notifications
                </h2>
                <button
                    class="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                    @click="handlerToggleDrawerOpenState"
                    aria-label="Close notifications"
                >✕</button>
        </header>

        <!-- Notification list -->
        <div class="flex-1 overflow-y-auto">
            <div v-if="notificationStore.getItems.length === 0">
                <p class="text-gray-500 text-[20px] text-center pt-20 cursor-pointer" 
                    @click="handlerToggleDrawerOpenState"
                >👏 Hooray~ All Clean 👏</p>
            </div>
            <BoardNotificationDrawerItem v-for="(item, index) in notificationStore.getItems" 
                :key="index" 
                :item="item" 
                :index="index" />
        </div>
    </aside> 
</template>