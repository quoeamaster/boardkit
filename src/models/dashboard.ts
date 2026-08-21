import { z } from 'zod'

import { GridLayoutSchema } from '@/models/layouts/grid-layout'

export const DashboardSchema = z.object({
    name: z.string(),
    // [feature] in phase 2, it would involve discrimateUnion() to support multiple layout types
    layouts: z.array(GridLayoutSchema),
})