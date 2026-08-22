import { z } from 'zod'

import { GridLayoutSchema } from '@/models/layouts/grid-layout'
import { FreeflowLayoutSchema } from '@/models/layouts/freeflow-layout'

// [feature] in phase 2, it would support multiple layout types (grid and {freeflow} under consideration)
export const DashboardLayoutSchema = z.discriminatedUnion('layout', [
    GridLayoutSchema,
    FreeflowLayoutSchema,
])

export const DashboardSchema = z.object({
    name: z.string(),

    // [feature] in phase 2, it would support multiple layout types (grid and {freeflow} under consideration)
    layouts: z.array(DashboardLayoutSchema),
})

// [lesson] required as zod is schema, type is another thing. Javascript code need type instead of schema
export type Dashboard = z.infer<typeof DashboardSchema>

