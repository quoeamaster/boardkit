import { describe, it, expect } from 'vitest'
import { componentRegistry, getComponent } from '@/registry/component-registry'
import BoardPieChart from '@/components/board/BoardPieChart.vue'
import BoardMarkdown from '@/components/board/BoardMarkdown.vue'

describe('componentRegistry', () => {
  it('registers piechart as BoardPieChart', () => {
    const definition = getComponent('piechart')

    expect(definition).toBeDefined()
    expect(definition.type).toBe('piechart')
    expect(definition.name).toBe('Pie Chart')
    expect(definition.kind).toBe('query')
    expect(definition.component).toBe(BoardPieChart)
    expect(componentRegistry.piechart).toBe(definition)
  })

  it('registers markdown as a markdown-kind widget', () => {
    const definition = getComponent('markdown')

    expect(definition).toBeDefined()
    expect(definition.type).toBe('markdown')
    expect(definition.kind).toBe('markdown')
    expect(definition.component).toBe(BoardMarkdown)
  })
})
