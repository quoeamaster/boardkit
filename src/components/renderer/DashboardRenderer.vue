<script setup lang="ts">
import { computed } from 'vue'

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

/*
 * [note] the layoutContent is not parsed at this stage, instead after picking the layout, 
 * will let the corresponding layout renderer to parse the layoutContent into a model (type).
 */

</script>

<template>
    <!-- include the layoutRenderer component here -->
    <div v-if="$isDebugModeOn()">
        <div class="mt-2 text-xs text-gray-400">
            DEBUG_MODE_ON = {{ $isDebugModeOn() }}
        </div>
        <!-- using <pre> tag to preserve the formatting of the layoutContent -->
        <div>{{ props.layoutContent }}</div>
        <div class="spacer"></div>
        <div v-if="layout">
            {{ layout }}
        </div>
        <div v-else>
            No layout found
        </div>
    </div>
    
</template>