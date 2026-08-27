<script setup lang="ts">
</script>

<template>
  <!-- [lesson] the root div controls the theme NOW -->
  <div class="min-h-screen"
    style="
      background: var(--bk-color-background); 
      color: var(--bk-color-text); ">

    <nav class="border-b px-4 py-3">
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

    </nav>

    <main class="p-6">
      <!-- [lesson] the view to be rendered based on the router's current path -->
      <RouterView />
    </main>
  </div>
</template>