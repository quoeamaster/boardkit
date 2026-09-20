import { z } from 'zod'

export const ConfigSchema = z.object({
    layout_folder: z.string(),
    layouts: z.array(z.string()).min(1),
    widget_definitions_folder: z.string().optional(),
    comment: z.array(z.string()).optional(),
})

export type Config = z.infer<typeof ConfigSchema>

export function layoutFileUrl(layoutFolder: string, filename: string): string {
    const folder = layoutFolder.endsWith('/') ? layoutFolder : `${layoutFolder}/`
    return `${folder}${filename}`
}
