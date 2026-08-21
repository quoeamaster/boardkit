<script setup lang="ts">
import { computed } from 'vue'
import { getLayoutComponent } from '@/registry/layout-registry'

interface Props {
    layoutContent: unknown
}

const props = defineProps<Props>()

const layout = computed(() => {
    // null check
    if (props.layoutContent == null || typeof props.layoutContent !== 'object') {
        return null
    }
    // though non null, but layout could be undefined
    return (props.layoutContent as { layout?: string }).layout ?? null
})

const layoutComponent = computed(() => {
    if (layout.value == null) {
        return null
    }
    return getLayoutComponent(layout.value).component
})

/*
 * [note] the layoutContent is not parsed at this stage, instead after picking the layout, 
 * will let the corresponding layout renderer to parse the layoutContent into a model (type).
 */

</script>

<template>
    <!-- include the layoutRenderer component here -->
    <component 
        :is="layoutComponent" 
        v-if="layoutComponent" />

    <div v-if="$isDebugModeOn()" class="debug-container">
        <div class="mt-2 text-xs text-gray-400">
            DEBUG_MODE_ON = {{ $isDebugModeOn() }}
        </div>
        <!-- using <pre> tag to preserve the formatting of the layoutContent -->
        <div>{{ props.layoutContent }}</div>
        <div class="spacer"></div>
        <div v-if="layout">
            <span class="font-bold">chosen layout:</span> {{ layout }}
        </div>
        <div v-else>
            No layout found
        </div>
    </div>
</template>