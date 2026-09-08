import { describe, it, expect } from 'vitest'
import { componentRegistry, getComponent } from '@/registry/component-registry'
import BoardPieChart from '@/components/board/BoardPieChart.vue'

describe('componentRegistry', () => {
  it('registers piechart as BoardPieChart', () => {
    const definition = getComponent('piechart')

    expect(definition).toBeDefined()
    expect(definition.type).toBe('piechart')
    expect(definition.name).toBe('Pie Chart')
    expect(definition.component).toBe(BoardPieChart)
    expect(componentRegistry.piechart).toBe(definition)
  })
})
