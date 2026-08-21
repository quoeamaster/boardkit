import { z } from 'zod'

export const GridWidgetSizeSchema = z.object({
    // no default values required, since optional and able to inherit from the parent config
    width: z.number().min(1).max(12).positive().optional(),
    height: z.enum(['small', 'medium', 'large']).optional(),
})

export const GridWidgetSchema = z.object({
    // name is a MUST field and is the component's identifier in the registry (though naming could be confusing here)
    name: z.string(),

    // size is optional as can inherit from the parent config
    size: GridWidgetSizeSchema.optional(),
})
