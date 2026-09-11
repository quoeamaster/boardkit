<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

interface Props {
  badgeGlyph: string
}
const props = defineProps<Props>()

const notificationCount = computed(() => {
    return notificationStore.getWarnAndErrorItemsCount
})
</script>

<template>
<button
  class="relative rounded-md p-2 text-gray-600 hover:bg-gray-100 cursor-pointer 
    disabled:opacity-50 disabled:cursor-not-allowed"
  :disabled="notificationCount === 0"
  @click="notificationStore.toggleDrawer()"
>
  <!-- <Bell class="h-5 w-5" /> 
  🔔 << avoid hard-code the "bell" glyph; can always replace by font-awesome etc 
  -->
  <span class="text-xl h-6 w-6">{{ badgeGlyph }}</span>

  <span
    v-if="notificationCount > 0"
    class="absolute -right-1 -top-1
           flex h-5 w-5 items-center justify-center
           rounded-full bg-white
           text-[10px] font-semibold text-red-600
           shadow-sm ring-1 ring-gray-200"
  >
    {{ notificationCount > 99 ? '99+' : notificationCount }}
  </span>
</button>
</template>