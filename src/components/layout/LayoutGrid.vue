<script setup lang="ts">
import { computed } from 'vue'
import type { GridLayout } from '@/models/layouts/grid-layout'
import type { GridSize } from '@/models/layouts/grid-layout'
import type { GridWidget } from '@/models/widgets/grid-widget'
import BoardWidgetPanel from '@/components/board/BoardWidgetPanel.vue'

interface Props {
    layout: GridLayout,
    layoutFile: string
}
const props = defineProps<Props>()

// helper function to get the size defaults (useful for class declaration)
function getSizeDefaults() {
    return props.layout?.size_defaults
}

function getRows() {
    //return props.layout?.rows
    return resolvedLayout.value?.rows
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

const resolvedLayout = computed(() => {
    // cloning the original layout to avoid modifying the original layout
    let layoutClone = { ...props.layout }
    const sizeDefaults = getSizeDefaults()

    for (const row of layoutClone.rows) {
        let rowMaxHeight = 'small'

        for (const widget of row.widgets) {
            const currentWidgetHeight = widget.size?.height || sizeDefaults?.height
            if (currentWidgetHeight === 'large') {
                rowMaxHeight = 'large'
            } else if (currentWidgetHeight === 'medium') {
                rowMaxHeight = 'medium'
            }

            widget.size = {
                width: widget.size?.width || sizeDefaults?.width,
                height: currentWidgetHeight,
            }
        }
        // set max height of the row
        for (const widget of row.widgets) {
            if (widget.size) {
                widget.size.height = rowMaxHeight as NonNullable<GridSize['height']>
            }
        }
    }
    return layoutClone
})

function computeWidgetSizeClasses(widget: GridWidget) {
    return `${sizeWidthClasses[widget.size?.width ?? 1]} ${sizeHeightClasses[widget.size?.height ?? 'small']}`
}

</script>

<template>

<!-- removing classes => border border-gray-300 rounded-md -->
<div v-for="(row, index) in getRows()" :key="`row-${index}`" class="grid grid-cols-12 gap-2 m-2 p-0">
    <div v-for="(widget, index) in row.widgets" 
        :key="`widget-${index}`" 
        :class="computeWidgetSizeClasses(widget)"
        >
        <!-- _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- -->
        <!-- [note] panel is the container for a widget -->
        <!-- _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- -->
        <BoardWidgetPanel :widget="widget" :layout-file="props.layoutFile">
            <!-- [note] optional slot content -->
            <span>
                {{ widget.name }} -> {{ widget.id }} 
                => {{ computeWidgetSizeClasses(widget) }}
            </span>
        </BoardWidgetPanel>
    </div>
</div>

<!-- _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- -->
<!--                 [debug]                  -->
<!-- _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- -->
<div v-if="$isDebugModeOn()" class="debug-container">
    <div class="debug-label">
        DEBUG_MODE_ON = {{ $isDebugModeOn() }} - LayoutGrid.vue
    </div>
    <div>
        layout file: <span class="italic text-blue-500">{{ props.layoutFile }}</span>;
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
