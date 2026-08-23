<script setup lang="ts">
// import { computed } from 'vue'
import type { GridLayout } from '@/models/layouts/grid-layout'
import type { GridSize } from '@/models/layouts/grid-layout'
import type { GridWidget } from '@/models/widgets/grid-widget'

interface Props {
    layout: GridLayout
}
const props = defineProps<Props>()

// helper function to get the size defaults (useful for class declaration)
function getSizeDefaults() {
    return props.layout?.size_defaults
}

function getRows() {
    return props.layout?.rows
}

// function to get the cols-12 classes based on the width value
const sizeWidthClasses: Record<NonNullable<GridSize['width']>, string> = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
}
// function to get the height classes based on the height value
const sizeHeightClasses: Record<NonNullable<GridSize['height']>, string> = {
    small: 'h-[120px]',
    medium: 'h-[300px]',
    large: 'h-[500px]',
}

function getRowWidgetMaxHeight(row: GridLayout['rows'][number]) {
    // default is SMALL
    let max_height = sizeHeightClasses.small
    const sizeDefaults = getSizeDefaults()

    for (const widget of row.widgets) {
        let widget_height = widget.size?.height || sizeDefaults?.height
        if (widget_height === 'large') {
            max_height = sizeHeightClasses.large
        } else if (widget_height === 'medium') {
            max_height = sizeHeightClasses.medium
        }
    }
    return max_height
}

function computeWidgetSizeClasses(widget: GridWidget, row: GridLayout['rows'][number]) {
    const sizeDefaults = getSizeDefaults()
    let widget_width = widget.size?.width || sizeDefaults?.width
    let widget_height_class = getRowWidgetMaxHeight(row)

    return `${sizeWidthClasses[widget_width]} ${widget_height_class}`
}

</script>

<template>
<div v-for="(row, index) in getRows()" :key="`row-${index}`" class="grid grid-cols-12 gap-2 mb-1
    border border-gray-300 rounded-md p-2"
>
    <div v-for="(widget, index) in row.widgets" :key="`widget-${index}`" :class="computeWidgetSizeClasses(widget, row)">
        <span>{{ widget.name }} -> {{ widget.id }} => {{ computeWidgetSizeClasses(widget, row) }}</span>
    </div>
    <!-- span class="col-span-6">{{ index }}</span>
    <span class="col-span-6">widgets size: {{ row.widgets.length }}</span -->
</div>

<!-- _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- -->
<!--                 [debug]                  -->
<!-- _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- -->
<div v-if="$isDebugModeOn()" class="debug-container">
    <div class="debug-label">
        DEBUG_MODE_ON = {{ $isDebugModeOn() }} - LayoutGrid.vue
    </div>
    <div>
        layout type: {{ props.layout.layout }};
        version: {{ props.layout.version }};
        <div class="pt-2 font-bold text-md">rows related:</div>
        <ul class="list-disc list-inside">
            <li>rows involved: {{ props.layout.rows.length }}</li>
            <li>size defaults: {{ getSizeDefaults() }}</li>
            <li>rows: 
                <span v-if="getRows().length > 0">&nbsp;row-0 => <p/>{{ getRows()[0] }}</span>
                <span v-else>no rows available for this config...</span>
            </li>
        </ul>
    </div>
</div>
</template>
