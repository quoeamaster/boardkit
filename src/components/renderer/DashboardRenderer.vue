<script setup lang="ts">
import { computed } from 'vue'
import { getLayoutComponent } from '@/registry/layout-registry'
import { DashboardSchema, type Dashboard } from '@/models/dashboard'

interface Props {
    layoutContent: unknown
}

const props = defineProps<Props>()

// [note] parsing the layoutContent into a model (type)
const dashboardConfig = computed<Dashboard | null>(() => {
    // shortcircuit test
    if (props.layoutContent == null) {
        return null
    }
    const result = DashboardSchema.safeParse(props.layoutContent)
    if (!result.success) {
        console.error(result)
        return null
    }
    return result.data
})

const layout = computed(() => {
    if (dashboardConfig.value == null) {
        return null
    }
    return dashboardConfig.value.layouts[0].layout
})

const layoutComponent = computed(() => {
    if (dashboardConfig.value == null) {
        return null
    }
    return getLayoutComponent(dashboardConfig.value.layouts[0].layout).component
})

/*
 * [note] the layoutContent is not parsed at this stage, instead after picking the layout, 
 * will let the corresponding layout renderer to parse the layoutContent into a model (type).
 */

</script>

<template>
    <!-- include the layoutRenderer component here -->
    <!-- [feature] phase 2 will support multiple layouts, hence v-for the layouts array instead -->
    <component 
        :is="layoutComponent" 
        v-if="layoutComponent && dashboardConfig"
        :layout="dashboardConfig.layouts[0]" />

    <!-- _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- -->
    <!--                 [debug]                  -->
    <!-- _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- -->
    <div v-if="$isDebugModeOn()" class="debug-container">
        <div class="debug-label">
            DEBUG_MODE_ON = {{ $isDebugModeOn() }}
        </div>
        <!-- using <pre> tag to preserve the formatting of the layoutContent -->
        <!-- [note] using props.layoutContent (raw string) should be the same as dashboardConfig (typed) -->
        <!-- div>{{ props.layoutContent }}</div -->
        <div>{{ dashboardConfig }}</div>
        <div class="spacer"></div>
        <div v-if="layout">
            <span class="font-bold">chosen layout:</span> {{ layout }}
        </div>
        <div v-else>
            No layout found
        </div>
    </div>
</template>