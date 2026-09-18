import BoardButton from '@/components/board/BoardButton.vue'
import BoardSelect from '@/components/board/BoardSelect.vue'
import BoardBarChart from '@/components/board/BoardBarChart.vue'
import BoardPieChart from '@/components/board/BoardPieChart.vue'
import BoardMarkdown from '@/components/board/BoardMarkdown.vue'

import type { BoardComponentDefinition } from './component-types'

export const componentRegistry: Record<
  string,
  BoardComponentDefinition
> = {
  barchart: {
    type: 'barchart',
    name: 'Bar Chart',
    component: BoardBarChart,
    description: 'charts - bar chart',
    kind: 'query',
  },
  linechart: {
    type: 'linechart',
    name: 'Line Chart',
    component: BoardBarChart,
    description: 'charts - line chart',
    kind: 'query',
  },
  piechart: {
    type: 'piechart',
    name: 'Pie Chart',
    component: BoardPieChart,
    description: 'charts - pie chart',
    kind: 'query',
  },
  button: {
    type: 'button',
    name: 'Button',
    component: BoardButton,
    description: 'Standard BoardKit button',
    kind: 'control',
  },
  select: {
    type: 'select',
    name: 'Select',
    component: BoardSelect,
    description: 'Standard BoardKit select',
    kind: 'control',
  },
  markdown: {
    type: 'markdown',
    name: 'Markdown',
    component: BoardMarkdown,
    description: 'Standard BoardKit markdown',
    kind: 'markdown',
  },
}

export function getComponent(type: string) {
  return componentRegistry[type]
}