<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import DashboardRenderer from '@/components/renderer/DashboardRenderer.vue'
import { useConfigStore } from '@/stores/config'

const layoutContent = ref<unknown>(null)
const configStore = useConfigStore()

// computed property to get the render file name (check main.ts for more details)
const renderFile = computed(() => {
  const value = configStore.getRenderFile ?? 'default'
  return `${value}.json`
})

onMounted(async () => {
  // [note] use the queryString parameter to get the render file name instead of hard-coding it
  const response = await fetch(`${import.meta.env.BASE_URL}/layouts/${renderFile.value}`)
  layoutContent.value = await response.json()
})

</script>

<template>
<div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold">
        Dashboard (render demo)
      </h1>

      <p class="text-gray-500">
        Integrating with a Rendering Engine
      </p>
    </div>
    <!-- include the dashboard renderer component here -->
    <DashboardRenderer :layout-content="layoutContent" :layout-file="renderFile" />
</div>
</template>