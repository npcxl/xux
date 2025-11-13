import type { ChartBaseConfig, ChartData, ChartTheme } from '../types'
import { chartColors, gradientPairs, darkGradientPairs, createGradientColor } from './colors'
import { getResponsiveConfig } from '../utils/responsive'

/**
 * 基础柱状图 - 顶级视觉效果版本
 */
export const createBarChartOption = (
  baseConfig: ChartBaseConfig,
  data: ChartData,
  theme: ChartTheme,
  showLabel: boolean
) => {
  const colors = chartColors[theme === 'auto' ? 'light' : theme]
  const responsive = getResponsiveConfig()
  const isDark = theme === 'dark'
  const pairs = isDark ? darkGradientPairs : gradientPairs
  
  return {
    ...baseConfig,
    color: colors,
    xAxis: {
      type: 'category',
      data: data.xAxis || [],
      axisLine: {
        lineStyle: {
          color: isDark ? '#4b5563' : '#e5e7eb',
          width: 2
        }
      },
      axisLabel: {
        color: isDark ? '#9ca3af' : '#6b7280',
        fontSize: responsive.fontSize.axisLabel,
        fontWeight: 500
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: isDark ? '#374151' : '#f3f4f6',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: isDark ? '#9ca3af' : '#6b7280',
        fontSize: responsive.fontSize.axisLabel,
        fontWeight: 500
      }
    },
    series: (data.series || []).map((item: any, index: number) => {
      const pairIndex = index % pairs.length
      const gradient = pairs[pairIndex]
      
      return {
        name: item.name,
        type: 'bar',
        data: item.data,
        barMaxWidth: 40,
        // 顶级渐变效果 - 从上到下
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: createGradientColor(gradient.start, gradient.end, 'vertical')
        },
        // 强调效果 - 悬浮时更亮
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: createGradientColor(gradient.start, gradient.end, 'vertical')
          }
        },
        // 标签样式
        label: showLabel ? {
          show: true,
          position: 'top',
          color: isDark ? '#fff' : '#333',
          fontSize: 11,
          fontWeight: '600',
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          padding: [4, 8],
          borderRadius: 4
        } : undefined,
        // 流畅动画
        animationDelay: (idx: number) => idx * 60,
        animationEasing: 'elasticOut',
        animationDuration: 1000
      }
    })
  }
}

/**
 * 堆叠柱状图 - 顶级视觉效果版本
 */
export const createStackedBarChartOption = (
  baseConfig: ChartBaseConfig,
  data: ChartData,
  theme: ChartTheme
) => {
  const colors = chartColors[theme === 'auto' ? 'light' : theme]
  const responsive = getResponsiveConfig()
  const isDark = theme === 'dark'
  const pairs = isDark ? darkGradientPairs : gradientPairs
  
  return {
    ...baseConfig,
    color: colors,
    xAxis: {
      type: 'category',
      data: data.xAxis || [],
      axisLine: {
        lineStyle: {
          color: isDark ? '#4b5563' : '#e5e7eb',
          width: 2
        }
      },
      axisLabel: {
        color: isDark ? '#9ca3af' : '#6b7280',
        fontSize: responsive.fontSize.axisLabel,
        fontWeight: 500
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: isDark ? '#374151' : '#f3f4f6',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: isDark ? '#9ca3af' : '#6b7280',
        fontSize: responsive.fontSize.axisLabel,
        fontWeight: 500
      }
    },
    series: (data.series || []).map((item: any, index: number) => {
      const pairIndex = index % pairs.length
      const gradient = pairs[pairIndex]
      const isFirst = index === 0
      const isLast = index === (data.series || []).length - 1
      
      return {
        name: item.name,
        type: 'bar',
        data: item.data,
        stack: 'total',
        barMaxWidth: 40,
        itemStyle: {
          borderRadius: isLast ? [8, 8, 0, 0] : [0, 0, 0, 0],
          color: createGradientColor(gradient.start, gradient.end, 'vertical')
        },
        emphasis: {
          focus: 'series'
        },
        animationDelay: (idx: number) => idx * 60,
        animationEasing: 'elasticOut',
        animationDuration: 1000
      }
    })
  }
}

/**
 * 横向柱状图 - 顶级视觉效果版本
 */
export const createHorizontalBarChartOption = (
  baseConfig: ChartBaseConfig,
  data: ChartData,
  theme: ChartTheme
) => {
  const colors = chartColors[theme === 'auto' ? 'light' : theme]
  const responsive = getResponsiveConfig()
  const isDark = theme === 'dark'
  const pairs = isDark ? darkGradientPairs : gradientPairs
  
  return {
    ...baseConfig,
    color: colors,
    xAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: isDark ? '#374151' : '#f3f4f6',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: isDark ? '#9ca3af' : '#6b7280',
        fontSize: responsive.fontSize.axisLabel,
        fontWeight: 500
      }
    },
    yAxis: {
      type: 'category',
      data: data.xAxis || [],
      axisLine: {
        lineStyle: {
          color: isDark ? '#4b5563' : '#e5e7eb',
          width: 2
        }
      },
      axisLabel: {
        color: isDark ? '#9ca3af' : '#6b7280',
        fontSize: responsive.fontSize.axisLabel,
        fontWeight: 500
      },
      axisTick: {
        show: false
      }
    },
    series: (data.series || []).map((item: any, index: number) => {
      const pairIndex = index % pairs.length
      const gradient = pairs[pairIndex]
      
      return {
        name: item.name,
        type: 'bar',
        data: item.data,
        barMaxWidth: 30,
        // 横向渐变 - 从左到右
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: createGradientColor(gradient.start, gradient.end, 'horizontal')
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderRadius: [0, 8, 8, 0]
          }
        },
        label: {
          show: true,
          position: 'right',
          color: isDark ? '#9ca3af' : '#6b7280',
          fontSize: 11,
          fontWeight: '600'
        },
        animationDelay: (idx: number) => idx * 60,
        animationEasing: 'elasticOut',
        animationDuration: 1000
      }
    })
  }
}
