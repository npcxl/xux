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

// 生成基础配置 - 顶级视觉效果版本
const createBaseConfig = () => {
  const colors = getColors()
  const theme = getTheme()
  const responsive = getResponsiveConfig()
  const isDark = theme === 'dark'
  
  return {
    color: colors,
    animation: props.animation,
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    animationDelay: (idx: number) => idx * 60,
    // 精美的工具提示
    tooltip: {
      trigger: props.type === 'pie' || props.type === 'doughnut' ? 'item' : 'axis',
      backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(229, 231, 235, 0.8)',
      textStyle: {
        color: isDark ? '#e5e7eb' : '#374151',
        fontSize: responsive.fontSize.label,
        fontWeight: 500
      },
      padding: [12, 16],
      extraCssText: `
        border-radius: 10px; 
        backdrop-filter: blur(12px);
        box-shadow: ${isDark 
          ? '0 10px 30px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.2)' 
          : '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.06)'
        };
      `,
      axisPointer: {
        type: props.type === 'line' || props.type === 'area' ? 'cross' : 'shadow',
        crossStyle: {
          color: isDark ? '#6b7280' : '#9ca3af',
          width: 1,
          type: 'dashed'
        },
        lineStyle: {
          color: isDark ? '#4b5563' : '#d1d5db',
          width: 1,
          type: 'dashed'
        },
        shadowStyle: {
          color: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(99, 102, 241, 0.1)'
        },
        label: {
          backgroundColor: isDark ? '#374151' : '#f3f4f6',
          color: isDark ? '#e5e7eb' : '#374151',
          borderColor: isDark ? '#4b5563' : '#d1d5db',
          borderWidth: 1,
          borderRadius: 6,
          padding: [6, 10],
          fontWeight: 600
        }
      }
    },
    // 精美的图例
    legend: props.showLegend ? {
      top: '5%',
      textStyle: {
        color: isDark ? '#e5e7eb' : '#374151',
        fontSize: responsive.fontSize.legend,
        fontWeight: 500
      },
      itemWidth: 16,
      itemHeight: 10,
      itemGap: responsive.fontSize.legend + 6,
      borderRadius: 3,
      // 图例图标样式
      icon: 'roundRect',
      // 图例悬浮效果
      emphasis: {
        selectorLabel: {
          fontSize: responsive.fontSize.legend + 1,
          fontWeight: 600
        }
      },
      // 图例选择器样式
      selectorLabel: {
        color: isDark ? '#9ca3af' : '#6b7280',
        fontSize: responsive.fontSize.legend - 1,
        fontWeight: 500
      },
      selectorItemGap: 8,
      selectorButtonGap: 12
    } : undefined,
    // 精美的网格
    grid: props.showGrid && !['pie', 'doughnut', 'gauge', 'radar'].includes(props.type) ? {
      ...responsive.grid,
      top: props.showLegend ? responsive.grid.top : '10%',
      containLabel: true,
      borderColor: isDark ? '#374151' : '#f3f4f6',
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
