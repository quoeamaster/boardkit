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
      // the title / label for the chart; return '' blank line if not provided
      text: props.attributes?.title ?? '',
    },

    // background color for the chart (whole widget wide)
    //backgroundColor: props.attributes?.style?.backgroundColor ?? '#ffffff',

    textStyle: {
      // color of the text (but might not work as expected, check the axis settings as well)
      // use xAxis color if possible
      color: props.attributes?.style?.textColorX ?? '#000000',  
      // font weight like 'normal', 'bold', 'bolder', 'lighter'
      fontWeight: 'normal',
    },

    tooltip: {
      // trigger the tooltip on hover over the axis
      trigger: 'axis',
      // show the tooltip or not
      show: true,
    },

    xAxis: {
      axisLabel: {
        // the xAxis label color
        color: props.attributes?.style?.textColorX ?? '#000000',
        // the xAxis label font size
        fontSize: props.attributes?.style?.textSize ?? '8px',
      },
      // [doc] https://echarts.apache.org/en/option.html#xAxis.type
      // possible values: 'value', 'category', 'time', 'log'
      type: 'category',
      data: resultLabels.value ?? [],
      // the xAxis field name
      name: props.attributes?.chart?.xAxis?.field ?? '',
    },

    yAxis: {
      axisLabel: {
        // the yAxis label color
        color: props.attributes?.style?.textColorY ?? '#000000',
        // the yAxis label font size
        fontSize: props.attributes?.style?.textSize ?? '8px',
      },
      // [doc] https://echarts.apache.org/en/option.html#xAxis.type
      // possible values: 'value', 'category', 'time', 'log'
      type: 'value',
      // the yAxis field name
      name: props.attributes?.chart?.yAxis?.field ?? '',
    },

    series: [
      {
        type: props.attributes?.chart?.type ?? 'bar',
        data: resultValues.value ?? [],
        itemStyle: {
          // set the background color of the bars/ line
          color: props.attributes?.style?.backgroundColor ?? '#000000',
        },
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
  <!-- {{ queryResult }} -->
</template>