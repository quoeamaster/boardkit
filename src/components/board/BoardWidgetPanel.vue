<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { GridWidget } from '@/models/widgets/grid-widget'
import { fetchFile } from '@/utils/file'
import { useConfigStore } from '@/stores/config'
import { BoardKitError, BoardKitErrorCode } from '@/error/errors'
import { attributesSchema } from '@/models/config/attributes'
import type { Attributes } from '@/models/config/attributes'
import { parse } from 'yaml'


interface Props {
    widget: GridWidget,
    layoutFile: string
}

const props = defineProps<Props>()

// helper function to get the file path for the widget
// if configStore.getWidgetDefinitionsFolder is set
// - use the value directly => ${widgetDefFolder}${props.widget.id}/
// else
// - strip the layoufFile's extension away => $layoutFile
// - form the path => ${import.meta.env.BASE_URL}/${layoutFile}/
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

const attributes = ref<Attributes | null>(null)
const query = ref<unknown>(null)

onMounted(async () => {
    // console.log('filePath', filePath.value)
    // query.sql which is required
    try {
        query.value = await fetchFile(`${filePath.value}/query.sql`, 'sql')
        // trigger QuickBoardServer to run the query
        
    } catch (error) {
        if (error instanceof BoardKitError) {
            // if it is just the file is not available...
            if (error.code === BoardKitErrorCode.FILE_NOT_FOUND) {
                // [todo] move to notifications
                console.error(`${filePath.value}/query.sql not found: ${error}`)
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
        let content = await fetchFile(`${filePath.value}/attributes.yaml`, 'yaml')
        attributes.value = validateAttributesContent(content)
        //console.log('attributes', attributes.value)
    } catch (error) {
        if (error instanceof BoardKitError) {
            if (error.code === BoardKitErrorCode.FILE_NOT_FOUND) {
                // [todo] move to notifications
                console.warn(`${filePath.value}/attributes.yaml not found: ${error}`)
                // use defaults instead of null
                attributes.value = validateAttributesContent('', true)
                // console.log('attributes', attributes.value)
            } else {
                console.error('Error fetching attributes.yaml (other errors)', error)
            }
        } else {
            console.error('Error fetching attributes.yaml (generic error)', error)
        }
    }
})

// validate the attributes.yaml content
function validateAttributesContent(content: string, isEmpty: boolean = false) {
    // yaml parsed
    const parsedContent = isEmpty ? {} : parse(content)
    const result = attributesSchema.safeParse(parsedContent)

    if (!result.success) {
        console.log('result', result)
        console.error(new BoardKitError(
            BoardKitErrorCode.CONFIG_INVALID,
            `Attributes content is invalid: ${content}; ${result}`,
            {
                widgetId: props.widget.id,
                path: `${filePath.value}/attributes.yaml`,
                status: 500,
            }
        ))
        return null
    }
    return result.data
}

function onWidgetEditClick() {
    // [todo] really update the view to edit mode etc
    alert(`widget edit clicked: ${props.widget.id}`);
}

// helper to display the title of the widget
// if the attribute title is set, use it
// otherwise use the widget id (though not expecting it to be null)
const displayTitle = computed(() => {
    const attributeTitle = attributes.value?.title ?? ''
    if (attributeTitle.length > 0) {
        return attributeTitle
    }
    return props.widget.id
})

// [todo]
// - missing sql contents validation
// [todo]
// configure the widget / chart based on the attributes.yaml
// execute code from the sql file and render the result accordingly

</script>

<template>
<div class="border p-2 m-0 h-full panel">
    <!-- top level menu-bar -->
    <div class="border-b border-gray-200 mb-2 flex max-h-32 items-center justify-between">
        <!-- Title -->
        <div class="panel-menu-bar-title">{{ displayTitle }}</div>

        <!-- Window controls -->
        <div class="flex h-full items-center gap-1 px-1.5">
            <button class="panel-menu-bar-icon" @click="onWidgetEditClick">✎</button>
        </div>
    </div>

    <!-- main Component area -->

    <slot />
    {{ props.widget }}
    <!-- span>{{ props.widget }} - layout file: {{ props.layoutFile }} => </span -->
</div>
</template>

<style scoped>
/* determines the border color in general */
.panel {
  border-color: var(--bk-color-border);
  border-radius: var(--bk-radius-md);
}
</style>