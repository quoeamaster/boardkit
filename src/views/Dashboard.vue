<script setup lang="ts">
import { componentRegistry } from '@/registry/component-registry'

// [lesson] at this moment, the component to be render is hard-coded... 
// [todo] next step: load a dynamic layout (json file etc) to define the components through runtime to be rendered (adds flexibility as no need to recompile the code base)
const BarChart = componentRegistry.barchart.component

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const values = [120, 180, 150, 230, 190, 260]

// -------------------------------------------------------------

import { ref, watch } from 'vue'
import QbSelect from '@/components/board/BoardSelect.vue'

const layoutOptions = [
  { label: 'Default', value: 'default.json' },
  { label: 'Multi Dashboard', value: 'multi_dashboard.json' },
]

const selectedLayout = ref(layoutOptions[0].value)
const layoutContent = ref<unknown>(null)
const isLoading = ref(false)
const errorMsg = ref<string | null>(null)

async function fetchLayout(filename: string) {
  isLoading.value = true
  errorMsg.value = null

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}/layouts/${filename}`)
    if (!response.ok) {
      throw new Error(
        `Failed to load layout: ${response.status} ${response.statusText}`
      )
    }
    // get the json content
    layoutContent.value = await response.json()

  } catch (err) {
    errorMsg.value = err instanceof Error ? err.message : 'An unknown error occurred'
    layoutContent.value = null

  } finally {
    isLoading.value = false
  }
}

watch(
  selectedLayout,
  (filename) => {
    fetchLayout(filename)
  },
  {
    immediate: true,
  }
)

// -------------------------------------------------------------
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold">
        Dashboard
      </h1>

      <p class="text-gray-500">
        BoardKit (dynamic) component demonstration
      </p>
    </div>

    <!-- [section] layout selection -->
    <div>
      <span class="text-gray-500">choose a layout:</span>
      <!-- [lesson] the attribute `id` is optional but recommended for accessibility 
       (you might end up seeing a warning or error if misisng id) -->
      <qb-select
        id="layout-select"
        :options="layoutOptions"
        v-model="selectedLayout"
        placeholder="Select layout"
        class="mt-2"
      />
    </div>

    <div v-if="isLoading">
      Loading layout...
    </div>

    <div v-else-if="errorMsg">
      {{ errorMsg }}
    </div>

    <div v-else class="text-xs text-gray-500 width-full max-h-80 overflow-auto">
      <pre>{{ JSON.stringify(layoutContent as unknown, null, 2) }}</pre>
    </div>

    <!-- [section] hard-code dashboard showing a barchart -->

    <div class="rounded-lg border p-6">
      <!-- [lesson] the component is rendered dynamically based on the type (MAGIC here) -->
      <component
        :is="BarChart"
        :labels="labels"
        :values="values"
        title="Monthly Revenue"
      />
    </div>
  </div>
</template>

<!--
[todo]
- load a json file dynamically (layout.json)
- based on the json definition, render the components 1 by 1...
-->