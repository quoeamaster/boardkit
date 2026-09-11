import { defineStore } from 'pinia'
import type { Notification } from '@/models/notification/notification'

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        // list of notification items
        items: null as Notification[] | null,

        // determine if the drawer UI should be shown or not
        isDrawerOpen: false as boolean | false,
    }),

    // for
    // compute derived values
    getters: {
        getItems: (state): Notification[] => {
            // sort items by time in descending order (makes sense for notifications)
            return (state.items ?? []).slice().reverse()
        },
        // regular function so `this` is the store; other getters are values, not fns
        getItemByIndex(): (index: number) => Notification | null {
            return (index) => this.getItems[index] ?? null
        },
        // return all items count
        getItemsCount: (state): number => state.items?.length ?? 0,
        // return warning and error items count
        getWarnAndErrorItemsCount: (state): number => {
            return (state.items ?? []).filter(item => item.level === 'warning' || item.level === 'error').length
        },
        getIsDrawerOpen: (state): boolean => state.isDrawerOpen,
    },

    // for 
    // 1. update state variables
    // 2. run async fn()
    actions: {
        // append a new item to the list
        addItem(item: Notification) {
            this.items?.push(item)
        },
        // remove everything. It would not make sense to remove individual items as that already break integrity; 
        // so it is more into all-or-nothing approach.
        clearItems() {
            this.items = null
        },
        // toggle the drawer UI state - isDrawerOpen
        toggleDrawer() {
            this.isDrawerOpen = !this.isDrawerOpen
        },
    },
})
