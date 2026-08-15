// import BoardButton from '@/components/board/BoardButton.vue'
// import BoardCombo from '@/components/board/BoardCombo.vue'
import BoardBarChart from '@/components/board/BoardBarChart.vue'

import type { BoardComponentDefinition } from './types'

export const componentRegistry: Record<
  string,
  BoardComponentDefinition
> = {
//   button: {
//     type: 'button',
//     name: 'Button',
//     component: BoardButton,
//     description: 'Standard BoardKit button',
//   },

//   combo: {
//     type: 'combo',
//     name: 'Combo',
//     component: BoardCombo,
//     description: 'Combo box component',
//   },

  barchart: {
    type: 'barchart',
    name: 'Bar Chart',
    component: BoardBarChart,
    description: 'ECharts bar chart',
  },
}

export function getComponent(type: string) {
  return componentRegistry[type]
}