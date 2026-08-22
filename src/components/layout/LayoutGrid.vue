<script setup lang="ts">
import type { GridLayout } from '@/models/layouts/grid-layout'

interface Props {
    layout: GridLayout
}
const props = defineProps<Props>()

</script>

<template>
<div>Grid Layout: Coming soon...</div>
<div>
    layout type: {{ props.layout.layout }};
    version: {{ props.layout.version }};
    rows involved: {{ props.layout.rows.length }}</div>
</template>
