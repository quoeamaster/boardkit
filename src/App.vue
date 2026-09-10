<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

</script>

<template>
  <!-- [lesson] the root div controls the theme NOW -->
  <div class="min-h-screen"
    style="
      background: var(--bk-color-background); 
      color: var(--bk-color-text); ">

    <nav class="border-b px-4 py-3">
      <div class="flex justify-between items-center gap-4">
        <div class="flex gap-4">
        <!-- [note] as there is a breaking change in the BoardBarChart component, hence not showing this tab for the moment -->
        <!-- RouterLink to="/dashboard">
          Dashboard
        </RouterLink -->
        <RouterLink to="/dashboard-render-demo">
          Dashboard Render Demo
        </RouterLink>

        <RouterLink to="/themes-demo">
          Themes Demo
        </RouterLink>

        <RouterLink to="/components-demo">
          Components Demo
        </RouterLink>
        </div>

        <!-- Right side: Icons -->
        <div class="flex items-center gap-3">
          <!-- Place your icon components or SVGs here -->
          <!-- button class="p-1 hover:bg-gray-100 rounded">🔍</button>
          <button class="p-1 hover:bg-gray-100 rounded">⚙️</button -->
            
          {{ notificationStore.getItemsCount }}

        </div>        
      </div>
    </nav>

    <main class="p-6">
      <!-- [lesson] the view to be rendered based on the router's current path -->
      <RouterView />
    </main>
  </div>
</template>