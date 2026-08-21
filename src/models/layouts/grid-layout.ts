import { z } from 'zod'
import { GridWidgetSchema } from '@/models/widgets/grid-widget'

export const GridSizeSchema = z.object({
    // have to provide a default value for width and height, this is not optional for the normal use case
    // [note] check GridWidgetSizeSchema for the optional case (actually it inherits the value from this schema if not provided)
    width: z.number().min(1).max(12).positive().default(1),
    height: z.enum(['small', 'medium', 'large']).default('medium'),
})

export const GridLayoutSchema = z.object({
    // important: this is a MUST field and will be used in discrimateUnion() later on...
    layout: z.literal('grid'),

    // version is a MUST field 
    // [note] though you can hard-code to `1` to make it parsable... it is connected to the quickBoard's versioning system ultimately
    version: z.number().positive().nonoptional(),

    // a MUST provided field for default size layouts
    size_defaults: GridSizeSchema,

    // optional comments field
    comments: z.array(z.string()).optional(),

    // rows of Grid-Widget(s)
    // [note][feature] for the meantime, only 1 element is allowed in the rows array (phase 2 will allow multiple rows)
    rows: z.array(z.object({
        widgets: z.array(GridWidgetSchema),
    })).length(1),
})
