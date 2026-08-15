<script setup lang="ts">
</script>

<template>
  <nav class="border-b px-4 py-3">
    <div class="flex gap-4">
      <RouterLink to="/dashboard">
        Dashboard
      </RouterLink>

      <RouterLink to="/tailwind-css-test">
        Tailwind CSS Test
      </RouterLink>

      <!-- RouterLink to="/components">
        Components
      </RouterLink>

      <RouterLink to="/themes">
        Themes
      </RouterLink -->

    </div>
  </nav>

  <main class="p-6">
    <!-- [lesson] the view to be rendered based on the router's current path -->
    <RouterView />
  </main>
</template>