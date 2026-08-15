<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';

// [lesson] get the store instance
const themeStore = useThemeStore();
</script>

<template>
    <div class="text-2xl font-bold">Dashboard</div>
    <div class="italic">Current theme: {{ themeStore.current }}</div>
    <button class="button button-primary" @click="themeStore.setTheme('default')">Default</button>&nbsp;
    <button class="button button-secondary" @click="themeStore.setTheme('dark')">Dark</button>
</template>