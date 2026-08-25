<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { GridWidget } from '@/models/widgets/grid-widget'
import { fetchFile } from '@/utils/file'
import { useConfigStore } from '@/stores/config'
import { BoardKitError, BoardKitErrorCode } from '@/error/errors'

interface Props {
    widget: GridWidget,
    layoutFile: string
}

const props = defineProps<Props>()

const filePath = computed(() => {
    const configStore = useConfigStore()
    let widgetDefFolder = configStore.getWidgetDefinitionsFolder
    if (!widgetDefFolder) {
        // strip the .json extension from the layout file
        const layoutFile = props.layoutFile.replace('.json', '')
        widgetDefFolder = `${import.meta.env.BASE_URL}/${layoutFile}/`
    }
    return `${widgetDefFolder}${props.widget.id}/`
})

const attributes = ref<unknown>(null)
const query = ref<unknown>(null)

onMounted(async () => {
    // console.log('filePath', filePath.value)
    // query.sql which is required
    try {
        query.value = await fetchFile(`${filePath.value}/query.sql`, 'sql')
    } catch (error) {
        if (error instanceof BoardKitError) {
            // if it is just the file is not available...
            if (error.code === BoardKitErrorCode.FILE_NOT_FOUND) {
                // [todo] move to notifications
                console.warn(`${filePath.value}/query.sql not found: ${error}`)
                query.value = null
            } else {
                console.error('Error fetching query.yaml (other errors)', error)
            }
        } else {
            console.error('Error fetching query.sql (generic error)', error)
        }
    }
    // attributes.yaml which can be optional
    try {
        attributes.value = await fetchFile(`${filePath.value}/attributes.yaml`, 'yaml')
        // console.log('attributes', attributes.value)
    } catch (error) {
        if (error instanceof BoardKitError) {
            if (error.code === BoardKitErrorCode.FILE_NOT_FOUND) {
                // [todo] move to notifications
                console.warn(`${filePath.value}/attributes.yaml not found: ${error}`)
                attributes.value = null
            } else {
                console.error('Error fetching attributes.yaml (other errors)', error)
            }
        } else {
            console.error('Error fetching attributes.yaml (generic error)', error)
        }
    }
})
// [todo]
// configure the widget / chart based on the attributes.yaml
// execute code from the sql file and render the result accordingly

</script>

<template>
<div class="border p-2 m-0 h-full panel">
    <!-- top level menu-bar -->
    <div class="border-b border-gray-200 mb-2 flex h-8 items-center justify-between">
        <!-- Title -->
        <div class="panel-menu-bar-title">BoardKit</div>

        <!-- Window controls -->
        <div class="flex h-full items-center gap-1 px-1.5">
            <button class="panel-menu-bar-icon">✎</button>
        </div>
    </div>

    <span>{{ props.widget }} - layout file: {{ props.layoutFile }} => </span>
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