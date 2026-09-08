<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

import type { GridWidget } from '@/models/widgets/grid-widget'
import type { Attributes } from '@/models/config/attributes'
import type { QueryResponse } from '@/api/query/runQueryInterface'
import * as echarts from 'echarts'

interface Props {
  widget: GridWidget
  attributes: Attributes
  queryResult: QueryResponse
}

const props = defineProps<Props>()

const pieData = computed(() => {
  if (!props.queryResult.rows) {
    return []
  }
  return props.queryResult.rows.map((row) => ({
    name: row.label,
    value: row.values,
  }))
})

const chartElement = ref<HTMLDivElement | null>(null)

let chart: echarts.ECharts | null = null

function renderChart() {
  // [note] make sure the div holding the chart is available
  if (!chartElement.value) {
    return
  }
  if (!chart) {
    // init the chart object (if the div container is available)
    chart = echarts.init(chartElement.value)
  }

  // [lesson] chance to merge attributes.yaml from customer project with the EChart
  chart.setOption({
    title: {
      // the title / label for the chart; return '' blank line if not provided
      text: props.attributes?.title ?? '',
      padding: [0, 0, 10, 0],
    },

    textStyle: {
      color: props.attributes?.style?.textColorX ?? '#000000',
      // font weight like 'normal', 'bold', 'bolder', 'lighter'
      fontWeight: 'normal',
    },

    tooltip: {
      // trigger the tooltip on hover over a pie slice
      trigger: 'item',
      // show the tooltip or not
      show: true,
    },

    legend: {
      show: true,
    },

    series: [
      {
        name: props.attributes?.chart?.yAxis?.field ?? '',
        // [hardcode] as easier to manage
        type: 'pie', 
        data: pieData.value ?? [],
      },
    ],
  })
}

function resizeChart() {
  chart?.resize()
}

onMounted(async () => {
  await nextTick()

  renderChart()

  window.addEventListener(
    'resize',
    resizeChart,
  )
})

const getChartInputs = () => [
  pieData.value,
  props.queryResult,
  props.attributes,
]
const updateChart = () => {
  renderChart()
}

// [lesson] `chart` stays a plain let on purpose. The ECharts instance must not be
// wrapped in a Vue proxy. Empty first paint is expected: queryResult arrives later
// from BoardWidgetPanel. Re-render by watching that data, not by making `chart` a ref.
watch(
  getChartInputs,
  updateChart,
  {
    deep: true,
  },
)

onBeforeUnmount(() => {
  window.removeEventListener(
    'resize',
    resizeChart,
  )

  chart?.dispose()
  chart = null
})
</script>

<template>
  <div
    ref="chartElement"
    class="min-h-[320px] w-full"
  />
</template>
