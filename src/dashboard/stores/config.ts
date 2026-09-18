import { defineStore } from 'pinia'
import type { Config } from '@/models/config/config'
import { ConfigSchema } from '@/models/config/config'

export const useConfigStore = defineStore('config', {
    state: () => ({
      // config file contents
      config: null as Config | null,
    }),

    getters: {
        getConfig: (state): Config | null => state.config,
        getLayoutFolder: (state): string | null => state.config?.layout_folder ?? null,
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
      },
    },
  })