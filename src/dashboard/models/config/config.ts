import { z } from 'zod'

export const ConfigSchema = z.object({
    layout_folder: z.string(),
    widget_definitions_folder: z.string().optional(),
    comment: z.array(z.string()).optional(),

    // for the dashboard-render-demo?config-file=xxx; render_file = xxx
    render_file: z.string().optional(),
})

export type Config = z.infer<typeof ConfigSchema>