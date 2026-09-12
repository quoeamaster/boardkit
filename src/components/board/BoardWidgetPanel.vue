<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { GridWidget } from '@/models/widgets/grid-widget'
import { fetchFile } from '@/utils/file'
import { useConfigStore } from '@/stores/config'
import { BoardKitError, BoardKitErrorCode } from '@/error/errors'
import { attributesSchema } from '@/models/config/attributes'
import type { Attributes } from '@/models/config/attributes'
import { parse } from 'yaml'
import type { QueryResponse } from '@/api/query/runQueryInterface'
import { getComponent } from '@/registry/component-registry'
import type { WidgetChildProps } from '@/models/widgets/child-props'
import { useNotificationStore } from '@/stores/notification'
import { NotificationSchema, NotificationLevel } from '@/models/notification/notification'

interface Props {
    widget: GridWidget,
    layoutFile: string
}

const props = defineProps<Props>()
const notificationsStore = useNotificationStore()

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
    return `${widgetDefFolder}/${props.widget.id}/`
})

const attributes = ref<Attributes | null>(null)
const query = ref<unknown>(null)
const queryResult = ref<QueryResponse | null>(null)
const markdownContent = ref('')

onMounted(async () => {
    const kind = getComponent(props.widget.name)?.kind ?? 'query'

    if (kind === 'query') {
        // query.sql which is required for query-backed widgets
        try {
            query.value = await fetchFile(`${filePath.value}/query.sql`, 'sql')
            // trigger QuickBoardServer to run the query [the middleware is actually the same vue.js app -> /api/query]
            const result = await fetch('/api/query', {
                method: 'POST',
                body: JSON.stringify({ query: query.value }),
            })
            const data = await result.json()
            queryResult.value = data

        } catch (error) {
            if (error instanceof BoardKitError) {
                // if it is just the file is not available...
                if (error.code === BoardKitErrorCode.FILE_NOT_FOUND) {
                    // [todo] move to notifications
                    notificationsStore.addItem(NotificationSchema.parse({
                        time: new Date().toISOString(),
                        level: NotificationLevel.enum.error,
                        message: `${filePath.value}/query.sql not found: ${error}`,
                        details: error.message,
                        isRead: false,
                    }))
                    query.value = null
                } else {
                    notificationsStore.addItem(NotificationSchema.parse({
                        time: new Date().toISOString(),
                        level: NotificationLevel.enum.error,
                        message: `Error fetching query.yaml (other errors): ${error}`,
                        details: error.message,
                        isRead: false,
                    }))
                }
            } else {
                notificationsStore.addItem(NotificationSchema.parse({
                    time: new Date().toISOString(),
                    level: NotificationLevel.enum.error,
                    message: `Error fetching query.sql (generic error): ${error}`,
                    details: `${error}`,
                    isRead: false,
                }))
            }
        }
    } else if (kind === 'markdown') {
        try {
            markdownContent.value = await fetchFile(`${filePath.value}/content.md`, 'md')
        } catch (error) {
            markdownContent.value = ''
            if (error instanceof BoardKitError) {
                if (error.code === BoardKitErrorCode.FILE_NOT_FOUND) {
                    notificationsStore.addItem(NotificationSchema.parse({
                        time: new Date().toISOString(),
                        level: NotificationLevel.enum.warning,
                        message: `${filePath.value}/content.md not found: ${error}`,
                        details: error.message,
                        isRead: false,
                    }))
                } else {
                    notificationsStore.addItem(NotificationSchema.parse({
                        time: new Date().toISOString(),
                        level: NotificationLevel.enum.error,
                        message: `Error fetching content.md (other errors): ${error}`,
                        details: `${error}`,
                        isRead: false,
                    }))
                }
            } else {
                notificationsStore.addItem(NotificationSchema.parse({
                    time: new Date().toISOString(),
                    level: NotificationLevel.enum.error,
                    message: `Error fetching content.md (generic error): ${error}`,
                    details: `${error}`,
                    isRead: false,
                }))
            }
        }
    }
    // attributes.yaml which can be optional
    try {
        let content = await fetchFile(`${filePath.value}/attributes.yaml`, 'yaml')
        attributes.value = validateAttributesContent(content)
        //console.log('attributes', attributes.value)
    } catch (error) {
        // attributes.yaml is optional -> use schema defaults
        attributes.value = validateAttributesContent('', true)

        if (error instanceof BoardKitError) {
            if (error.code === BoardKitErrorCode.FILE_NOT_FOUND) {
                notificationsStore.addItem(NotificationSchema.parse({
                    time: new Date().toISOString(),
                    level: NotificationLevel.enum.warning,
                    message: `${filePath.value}/attributes.yaml not found: ${error}`,
                    details: error.message,
                    isRead: false,
                }))
            } else {
                notificationsStore.addItem(NotificationSchema.parse({
                    time: new Date().toISOString(),
                    level: NotificationLevel.enum.error,
                    message: `Error fetching attributes.yaml (other errors): ${error}`,
                    details: `${error}`,
                    isRead: false,
                }))
            }
        } else {
            notificationsStore.addItem(NotificationSchema.parse({
                time: new Date().toISOString(),
                level: NotificationLevel.enum.error,
                message: `Error fetching attributes.yaml (generic error): ${error}`,
                details: `${error}`,
                isRead: false,
            }))
        }
    }    
})

// validate the attributes.yaml content
function validateAttributesContent(content: string, isEmpty: boolean = false) {
    // yaml parsed
    const parsedContent = isEmpty ? {} : parse(content)
    const result = attributesSchema.safeParse(parsedContent)

    if (!result.success) {
        notificationsStore.addItem(NotificationSchema.parse({
            time: new Date().toISOString(),
            level: NotificationLevel.enum.info,
            message: `Invalid attributes.yaml for widget ${props.widget.id}; using defaults.`,
            details: result.error.message,
            isRead: false,
        }))
        // fallback
        const fallback = attributesSchema.safeParse({})
        if (!fallback.success) {
            // This means your schema itself is broken.
            throw new BoardKitError(
                BoardKitErrorCode.CONFIG_INVALID,
                `Unable to generate default attributes: ${fallback.error}`,
                {
                    widgetId: props.widget.id,
                    path: `${filePath.value}/attributes.yaml`,
                    status: 500,
                }
            )
        }
        return fallback.data
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

// helper to return the correct component based on the widget name (really component and not the parent abstract type / struct)
const definition = computed(() => {
    const resolved = getComponent(props.widget.name)
    if (!resolved) {
        notificationsStore.addItem(NotificationSchema.parse({
            time: new Date().toISOString(),
            level: NotificationLevel.enum.error,
            message: `Component not found for widget type: ${props.widget.name}`,
            details: `${props.widget.name}`,
            isRead: false,
        }))
        //console.error(`Component not found for widget type: ${props.widget.name}`)
        return null
    }
    return resolved
})

const component = computed(() => definition.value?.component ?? null)

const childProps = computed<WidgetChildProps>(() => ({
    widget: props.widget,
    attributes: attributes.value,
    queryResult: queryResult.value ?? {},
    content: markdownContent.value,
}))

</script>

<template>
<!-- [lesson] make it scrollable; hence even if the size of the grid is not good, it is ok to cover everything -->
<div class="border p-2 m-0 h-full panel overflow-auto">
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
    <!-- {{ props.widget }} -->
    <!-- {{ queryResult }} -->
    <!-- span>{{ props.widget }} - layout file: {{ props.layoutFile }} => </span -->

    <component 
        v-if="component"
        :is="component" 
        :childProps="childProps" />
    
</div>
</template>

<style scoped>
/* determines the border color in general */
.panel {
  border-color: var(--bk-color-border);
  border-radius: var(--bk-radius-md);
}
</style>