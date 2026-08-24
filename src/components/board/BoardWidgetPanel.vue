<script setup lang="ts">
import type { GridWidget } from '@/models/widgets/grid-widget'

interface Props {
    widget: GridWidget
}

const props = defineProps<Props>()

</script>

<template>
<div class="border p-2 m-0 h-full panel">
    <!-- top level menu-bar -->
    <div class="border-b border-gray-200 mb-2 flex h-8 items-center justify-between">
        <!-- Title -->
        <div class="panel-menu-bar-title">BoardKit</div>

        <!-- Window controls -->
        <div class="flex h-full items-center gap-1 px-1.5">
            <!-- <button class="px-1">
            _
            </button>
            <button class="px-1">
            ☐
            </button> -->
            <button class="panel-menu-bar-icon">
            ✎
            </button>
        </div>
    </div>

    <span>{{ props.widget }}</span>
    <slot />
</div>
</template>

<style scoped>
/* determines the border color in general */
.panel {
  border-color: var(--bk-color-border);
  border-radius: var(--bk-radius-md);
}
</style>