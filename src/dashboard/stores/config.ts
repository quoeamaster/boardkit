import { defineStore } from 'pinia'
import type { Config } from '@/models/config/config'
import { ConfigSchema, layoutFileUrl } from '@/models/config/config'

export const useConfigStore = defineStore('config', {
    state: () => ({
      // config file contents
      config: null as Config | null,
      currentLayout: null as string | null,
    }),

    getters: {
        getConfig: (state): Config | null => state.config,
        getLayoutFolder: (state): string | null => state.config?.layout_folder ?? null,
        getLayouts: (state): string[] => state.config?.layouts ?? [],
        getCurrentLayout: (state): string | null => state.currentLayout,
        getCurrentLayoutUrl: (state): string | null => {
            if (!state.config || !state.currentLayout) {
                return null
            }
            return layoutFileUrl(state.config.layout_folder, state.currentLayout)
        },
        getWidgetDefinitionsFolder: (state): string | null => state.config?.widget_definitions_folder ?? null,
        getComment: (state): string[] | null => state.config?.comment ?? null,
    },
  
    actions: {
      async load(configPath: string) {
        const config = await fetch(configPath)
        const configData = await config.json()

        const result = ConfigSchema.safeParse(configData)
        if (!result.success) {
            console.error('Error parsing config file:', result)
            throw new Error('Error parsing config file')
        }
        this.config = result.data
        this.currentLayout = result.data.layouts[0]
      },

      selectLayout(filename: string) {
        if (!this.config?.layouts.includes(filename)) {
            console.error('Layout is not listed in config:', filename)
            return
        }
        this.currentLayout = filename
      },
    },
  })
