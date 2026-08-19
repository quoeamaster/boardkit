// import BoardButton from '@/components/board/BoardButton.vue'
// import BoardCombo from '@/components/board/BoardCombo.vue'
import BoardBarChart from '@/components/board/BoardBarChart.vue'
import BoardButton from '@/components/board/BoardButton.vue'
import BoardSelect from '@/components/board/BoardSelect.vue'

import type { BoardComponentDefinition } from './types'

export const componentRegistry: Record<
  string,
  BoardComponentDefinition
> = {
  barchart: {
    type: 'barchart',
    name: 'Bar Chart',
    component: BoardBarChart,
    // original description: 'ECharts bar chart'
    description: 'charts - bar chart',
  },
  button: {
    type: 'button',
    name: 'Button',
    component: BoardButton,
    description: 'Standard BoardKit button',
  },
  select: {
    type: 'select',
    name: 'Select',
    component: BoardSelect,
    description: 'Standard BoardKit select',
  },
}

export function getComponent(type: string) {
  return componentRegistry[type]
}