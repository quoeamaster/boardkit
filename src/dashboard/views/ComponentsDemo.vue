<script setup lang="ts">
import { componentRegistry } from '@/registry/component-registry'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold">
        Components
      </h1>

      <p class="text-gray-500">
        Registered BoardKit components
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="definition in componentRegistry"
        :key="definition.type"
        class="rounded-lg border p-4"
      >
        <h2 class="font-medium">
          {{ definition.name }}
        </h2>

        <p class="mt-1 text-sm text-gray-500">
          {{ definition.description }}
        </p>

        <code class="mt-3 block text-xs">
          {{ definition.type }}
        </code>
      </div>
    </div>
  </div>
</template>