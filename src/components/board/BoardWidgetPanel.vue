<script setup lang="ts">
import type { GridWidget } from '@/models/widgets/grid-widget'

interface Props {
    widget: GridWidget
}

const props = defineProps<Props>()

</script>

<template>
<div class="border p-2 m-0 h-full panel">
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