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

const resultLabels = computed(() => {
  if (!props.queryResult.rows) {
    return []
  }
  return props.queryResult.rows.map((row) => row.label)
})
const resultValues = computed(() => {
  if (!props.queryResult.rows) {
    return []
  }
  return props.queryResult.rows.map((row) => row.values)
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
      text: props.attributes?.title ?? '',
    },

    tooltip: {
      trigger: 'axis',
    },

    xAxis: {
      type: 'category',
      data: resultLabels.value ?? [],
    },

    yAxis: {
      type: 'value',
    },

    series: [
      {
        // [lesson] the type is hard-coded here... bar(chart)
        // possible values: bar, line, pie, scatter, etc.
        type: 'bar',
        data: resultValues.value ?? [],
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
  resultLabels.value,
  resultValues.value,
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
    class="h-[320px] w-full"
  />
  <!-- {{ queryResult.rows }} -->
  <!-- {{ resultLabels }} --> 
  <!-- {{ resultValues }} -->
</template>