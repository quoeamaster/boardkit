import type { GridWidget } from '@/models/widgets/grid-widget'
import type { Attributes } from '@/models/config/attributes'
import type { QueryResponse } from '@/api/query/runQueryInterface'

export interface WidgetChildProps {
  widget?: GridWidget
  attributes?: Attributes | null
  queryResult?: QueryResponse | Record<string, never>
  content?: string
}
