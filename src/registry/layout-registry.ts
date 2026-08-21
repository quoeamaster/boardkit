import LayoutGrid from '@/components/layout/LayoutGrid.vue'

import type { LayoutComponentDefinition } from './layout-types'

export const layoutRegistry: Record<string, LayoutComponentDefinition> = {
  grid: {
    type: 'grid',
    name: 'Grid',
    component: LayoutGrid,
    description: 'Grid layout - rows with a common height but different widths across columns',
  },
}

export function getLayoutComponent(type: string) {
  return layoutRegistry[type]
}