<script setup lang="ts">
import { ref, watch } from 'vue'
import DashboardRenderer from '@/components/renderer/DashboardRenderer.vue'
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()
const layoutContent = ref<unknown>(null)

watch(
  () => configStore.getCurrentLayoutUrl,
  async (url) => {
    if (!url) {
      layoutContent.value = null
      return
    }
    const response = await fetch(url)
    layoutContent.value = await response.json()
  },
  { immediate: true },
)
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
    <DashboardRenderer
      :layout-content="layoutContent"
      :layout-file="configStore.getCurrentLayout ?? ''"
    />
</div>
</template>
