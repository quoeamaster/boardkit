import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import { attributesSchema } from '@/models/config/attributes'
import type { QueryResponse } from '@/api/query/runQueryInterface'
import type { GridWidget } from '@/models/widgets/grid-widget'

const chartMocks = vi.hoisted(() => ({
  setOption: vi.fn(),
  resize: vi.fn(),
  dispose: vi.fn(),
  init: vi.fn(),
}))

vi.mock('echarts', () => ({
  init: chartMocks.init,
}))

import BoardPieChart from '@/components/board/BoardPieChart.vue'

describe('BoardPieChart', () => {
  const widget: GridWidget = { name: 'piechart', id: 'share' }
  const attributes = attributesSchema.parse({ title: 'Share' })
  const queryResult: QueryResponse = {
    columns: [
      { name: 'label', type: 'string' },
      { name: 'values', type: 'number' },
    ],
    rows: [
      { label: 'Alpha', values: 10 },
      { label: 'Beta', values: 20 },
    ],
  }

  beforeEach(() => {
    chartMocks.setOption.mockReset()
    chartMocks.resize.mockReset()
    chartMocks.dispose.mockReset()
    chartMocks.init.mockReset()
    chartMocks.init.mockReturnValue({
      setOption: chartMocks.setOption,
      resize: chartMocks.resize,
      dispose: chartMocks.dispose,
    })
  })

  it('renders a pie series from query row labels and values', async () => {
    mount(BoardPieChart, {
      props: { widget, attributes, queryResult },
    })

    await nextTick()
    await flushPromises()

    expect(chartMocks.init).toHaveBeenCalledTimes(1)
    expect(chartMocks.setOption).toHaveBeenCalled()

    const option = chartMocks.setOption.mock.calls.at(-1)?.[0]
    expect(option.series[0].type).toBe('pie')
    expect(option.series[0].data).toEqual([
      { name: 'Alpha', value: 10 },
      { name: 'Beta', value: 20 },
    ])
    expect(option.title.text).toBe('Share')
    expect(option.tooltip.trigger).toBe('item')
    expect(option.xAxis).toBeUndefined()
    expect(option.yAxis).toBeUndefined()
  })
})
