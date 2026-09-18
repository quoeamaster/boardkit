<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DashboardRenderer from '@/components/renderer/DashboardRenderer.vue'

const layoutContent = ref<unknown>(null)

onMounted(async () => {
  // [note] hard-code for poc ONLY
  const response = await fetch(`${import.meta.env.BASE_URL}/layouts/default.json`)
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
    <DashboardRenderer :layout-content="layoutContent" layout-file="default.json" />
</div>
</template>