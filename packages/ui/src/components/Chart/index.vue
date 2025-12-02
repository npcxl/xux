<template>
  <div ref="chartRef" class="x-chart" :style="{ width, height }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import {
  createLineChartOption,
  createStackedLineChartOption,
  createStepLineChartOption,
  createBarChartOption,
  createStackedBarChartOption,
  createHorizontalBarChartOption,
  createPieChartOption,
  createDoughnutChartOption,
  createRoseChartOption,
  createSemiDoughnutChartOption,
  createAreaChartOption,
  createStackedAreaChartOption,
  createGradientAreaChartOption,
  createScatterChartOption,
  createRadarChartOption,
  createGaugeChartOption,
  createMixedChartOption,
  chartColors
} from './configs'
import type { ChartData, ChartTheme } from './types'
import { getResponsiveConfig } from './utils/responsive'

export interface ChartProps {
  type?: 'line' | 'bar' | 'pie' | 'doughnut' | 'area' | 'scatter' | 'radar' | 'gauge' | 'mixed'
  variant?: 'default' | 'stacked' | 'horizontal' | 'step' | 'gradient' | 'rose' | 'semi'
  data?: ChartData
  option?: any
  width?: string
  height?: string
  theme?: 'light' | 'dark' | 'auto'
  loading?: boolean
  color?: string[]
  smooth?: boolean
  showLabel?: boolean
  showLegend?: boolean
  showGrid?: boolean
  animation?: boolean
}

const props = withDefaults(defineProps<ChartProps>(), {
  type: 'line',
  variant: 'default',
  width: '100%',
  height: '400px',
  theme: 'auto',
  loading: false,
  smooth: false,
  showLabel: false,
  showLegend: true,
  showGrid: true,
  animation: true
})

const emit = defineEmits<{
  click: [params: any]
  legendselectchanged: [params: any]
}>()

const chartRef = ref<HTMLElement>()
let chartInstance: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

// 获取主题
const getTheme = (): ChartTheme => {
  if (props.theme === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return props.theme as ChartTheme
}

// 获取颜色
const getColors = () => {
  if (props.color) return props.color
  const theme = getTheme()
  return chartColors[theme] || chartColors.light
}

// 生成基础配置 - iOS 风格
const createBaseConfig = () => {
  const colors = getColors()
  const theme = getTheme()
  const responsive = getResponsiveConfig()
  const isDark = theme === 'dark'

  return {
    color: colors,
    animation: props.animation,
    animationDuration: 800,
    animationEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    animationDelay: (idx: number) => idx * 50,
    // iOS 风格工具提示
    tooltip: {
      trigger: props.type === 'pie' || props.type === 'doughnut' ? 'item' : 'axis',
      backgroundColor: isDark ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.98)',
      borderWidth: 0,
      borderColor: 'transparent',
      textStyle: {
        color: isDark ? '#FFFFFF' : '#000000',
        fontSize: responsive.fontSize.label,
        fontWeight: 500,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif'
      },
      padding: [10, 14],
      extraCssText: `
        border-radius: 14px; 
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        box-shadow: ${isDark
          ? '0 20px 60px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)'
          : '0 20px 60px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.08)'
        };
        border: 1px solid ${isDark ? 'rgba(142, 142, 147, 0.12)' : 'rgba(0, 0, 0, 0.04)'};
      `,
      axisPointer: {
        type: props.type === 'line' || props.type === 'area' ? 'cross' : 'shadow',
        crossStyle: {
          color: isDark ? 'rgba(142, 142, 147, 0.3)' : 'rgba(0, 0, 0, 0.1)',
          width: 1,
          type: 'dashed'
        },
        lineStyle: {
          color: isDark ? 'rgba(142, 142, 147, 0.3)' : 'rgba(0, 0, 0, 0.1)',
          width: 1,
          type: 'dashed'
        },
        shadowStyle: {
          color: isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)'
        },
        label: {
          backgroundColor: isDark ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.98)',
          color: isDark ? '#FFFFFF' : '#000000',
          borderColor: isDark ? 'rgba(142, 142, 147, 0.12)' : 'rgba(0, 0, 0, 0.04)',
          borderWidth: 1,
          borderRadius: 8,
          padding: [5, 10],
          fontWeight: 600,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
        }
      }
    },
    // iOS 风格图例
    legend: props.showLegend ? {
      top: '5%',
      textStyle: {
        color: isDark ? '#FFFFFF' : '#000000',
        fontSize: responsive.fontSize.legend,
        fontWeight: 500,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif'
      },
      itemWidth: 14,
      itemHeight: 8,
      itemGap: responsive.fontSize.legend + 8,
      borderRadius: 4,
      icon: 'roundRect',
      emphasis: {
        selectorLabel: {
          fontSize: responsive.fontSize.legend + 1,
          fontWeight: 600
        }
      },
      selectorLabel: {
        color: isDark ? 'rgba(142, 142, 147, 0.8)' : 'rgba(0, 0, 0, 0.6)',
        fontSize: responsive.fontSize.legend - 1,
        fontWeight: 500
      },
      selectorItemGap: 10,
      selectorButtonGap: 14
    } : undefined,
    // iOS 风格网格
    grid: props.showGrid && !['pie', 'doughnut', 'gauge', 'radar'].includes(props.type) ? {
      ...responsive.grid,
      top: props.showLegend ? responsive.grid.top : '10%',
      containLabel: true,
      borderColor: isDark ? 'rgba(142, 142, 147, 0.12)' : 'rgba(0, 0, 0, 0.04)',
      borderWidth: 0
    } : undefined,
    responsive: responsive
  }
}

// 生成图表配置
const generateOption = () => {
  if (props.option) return props.option

  const baseConfig = createBaseConfig()
  const theme = getTheme()
  const chartData = props.data || {}

  switch (props.type) {
    case 'line':
      if (props.variant === 'stacked') {
        return createStackedLineChartOption(baseConfig, chartData, theme, props.smooth)
      }
      if (props.variant === 'step') {
        return createStepLineChartOption(baseConfig, chartData, theme)
      }
      return createLineChartOption(baseConfig, chartData, theme, props.smooth, props.showLabel)

    case 'bar':
      if (props.variant === 'stacked') {
        return createStackedBarChartOption(baseConfig, chartData, theme)
      }
      if (props.variant === 'horizontal') {
        return createHorizontalBarChartOption(baseConfig, chartData, theme)
      }
      return createBarChartOption(baseConfig, chartData, theme, props.showLabel)

    case 'pie':
      if (props.variant === 'rose') {
        return createRoseChartOption(baseConfig, chartData, theme)
      }
      return createPieChartOption(baseConfig, chartData, theme)

    case 'doughnut':
      if (props.variant === 'semi') {
        return createSemiDoughnutChartOption(baseConfig, chartData, theme)
      }
      return createDoughnutChartOption(baseConfig, chartData, theme)

    case 'area':
      if (props.variant === 'stacked') {
        return createStackedAreaChartOption(baseConfig, chartData, theme, props.smooth)
      }
      if (props.variant === 'gradient') {
        return createGradientAreaChartOption(baseConfig, chartData, theme)
      }
      return createAreaChartOption(baseConfig, chartData, theme, props.smooth)

    case 'scatter':
      return createScatterChartOption(baseConfig, chartData, theme)
    case 'radar':
      return createRadarChartOption(baseConfig, chartData, theme)
    case 'gauge':
      return createGaugeChartOption(baseConfig, chartData, theme)
    case 'mixed':
      return createMixedChartOption(baseConfig, chartData, theme)
    default:
      return baseConfig
  }
}

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value, getTheme())

  const option = generateOption()
  chartInstance.setOption(option, true)

  // 绑定事件
  chartInstance.on('click', (params) => {
    emit('click', params)
  })

  chartInstance.on('legendselectchanged', (params) => {
    emit('legendselectchanged', params)
  })

  // 监听窗口大小变化
  resizeObserver = new ResizeObserver(() => {
    chartInstance?.resize()
  })

  resizeObserver.observe(chartRef.value)
}

// 更新图表
const updateChart = () => {
  if (!chartInstance) return

  const option = generateOption()
  chartInstance.setOption(option, true)
}

// 设置加载状态
const setLoading = (loading: boolean) => {
  if (!chartInstance) return

  if (loading) {
    chartInstance.showLoading('default', {
      text: '加载中...',
      color: '#667eea',
      textColor: getTheme() === 'dark' ? '#fff' : '#333',
      maskColor: getTheme() === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'
    })
  } else {
    chartInstance.hideLoading()
  }
}

// 监听数据变化
watch(() => [props.data, props.option, props.type, props.variant], () => {
  nextTick(() => {
    updateChart()
  })
}, { deep: true })

// 监听加载状态
watch(() => props.loading, (val) => {
  setLoading(val)
})

// 监听主题变化
watch(() => props.theme, () => {
  if (chartInstance) {
    chartInstance.dispose()
    initChart()
  }
})

onMounted(() => {
  nextTick(() => {
    initChart()
    setLoading(props.loading)
  })
})

onUnmounted(() => {
  if (resizeObserver && chartRef.value) {
    resizeObserver.unobserve(chartRef.value)
  }
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})

// 暴露方法
const resize = () => {
  chartInstance?.resize()
}

const clear = () => {
  chartInstance?.clear()
}

const getInstance = () => {
  return chartInstance
}

defineExpose({
  resize,
  clear,
  getInstance
})
</script>

<style scoped>
.x-chart {
  position: relative;
  min-height: 200px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .x-chart {
    min-height: 250px;
  }
}

@media (max-width: 480px) {
  .x-chart {
    min-height: 280px;
  }
}
</style>
