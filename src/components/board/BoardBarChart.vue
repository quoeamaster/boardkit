<script setup lang="ts">
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

import * as echarts from 'echarts'

interface Props {
  labels: string[]
  values: number[]
  title?: string
}

const props = withDefaults(
  defineProps<Props>(),
  {
    title: '',
  },
)

const chartElement = ref<HTMLDivElement | null>(null)

let chart: echarts.ECharts | null = null

function renderChart() {
  if (!chartElement.value) {
    return
  }

  if (!chart) {
    chart = echarts.init(chartElement.value)
  }

  // [lesson] chance to merge attributes.yaml from customer project with the EChart
  chart.setOption({
    title: {
      text: props.title,
    },

    tooltip: {
      trigger: 'axis',
    },

    xAxis: {
      type: 'category',
      data: props.labels,
    },

    yAxis: {
      type: 'value',
    },

    series: [
      {
        type: 'bar',
        data: props.values,
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
  props.labels,
  props.values,
  props.title,
]
const updateChart = () => {
  renderChart()
}
watch(
  getChartInputs,
  updateChart,
  {
    deep: true,
  },
)

// watch(
//   () => [
//     props.labels,
//     props.values,
//     props.title,
//   ],
//   () => {
//     renderChart()
//   },
//   {
//     deep: true,
//   },
// )

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
</template>