<script setup lang="ts">
import BoardBadge from '@/components/board/BoardBadge.vue'
import BoardNotficationDrawer from '@/components/board/BoardNotficationDrawer.vue'
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()

function layoutLabel(filename: string) {
  return filename.replace(/\.json$/, '')
}
</script>

<template>
  <!-- [lesson] the root div controls the theme NOW -->
  <div class="min-h-screen"
    style="
      background: var(--bk-color-background); 
      color: var(--bk-color-text); ">

    <nav class="border-b px-4 py-3 
      fixed w-full h-16
      bg-white z-20"
    >
      <div class="flex justify-between items-center gap-4">
        <div class="flex gap-4">
          <button
            v-for="layout in configStore.getLayouts"
            :key="layout"
            type="button"
            class="hover:underline"
            :class="{ 'font-semibold': layout === configStore.getCurrentLayout }"
            @click="configStore.selectLayout(layout)"
          >
            {{ layoutLabel(layout) }}
          </button>
        </div>

        <!-- Right side: Icons -->
        <div class="flex items-center gap-3">
          <BoardBadge badgeGlyph="🔔" />
        </div>        
      </div>
    </nav>

    <main class="p-6">
      <div class="overflow-y-auto mt-16">
        <!-- [lesson] the view to be rendered based on the router's current path -->
        <RouterView />
        <BoardNotficationDrawer />
      </div>
    </main>
  </div>
</template>
