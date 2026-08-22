import { z } from 'zod'

export const FreeflowWidgetSchema = z.object({
    // name is a MUST field and is the component's identifier in the registry (though naming could be confusing here)
    name: z.string(),

    x: z.number(),  
    y: z.number(),
    width: z.number(),
    height: z.number(),
})

export type FreeflowWidget = z.infer<typeof FreeflowWidgetSchema>
