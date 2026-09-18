import { z } from 'zod'

import { FreeflowWidgetSchema } from '@/models/widgets/freeflow-widgets'

export const FreeflowLayoutSchema = z.object({
    layout: z.literal('freeflow'),
  
    // version is a MUST field 
    // [note] though you can hard-code to `1` to make it parsable... it is connected to the quickBoard's versioning system ultimately
    version: z.number().positive().nonoptional(),
    
    // optional comments field
    comments: z.array(z.string()).optional(),

    widgets: z.array(FreeflowWidgetSchema),
  })

export type FreeflowLayout = z.infer<typeof FreeflowLayoutSchema>