import type { ChartBaseConfig, ChartData, ChartTheme } from '../types'
import { chartColors, gradientPairs, darkGradientPairs, createGradientColor } from './colors'
import { getResponsiveConfig } from '../utils/responsive'

/**
 * 基础折线图 - 顶级视觉效果版本
 */
export const createLineChartOption = (
  baseConfig: ChartBaseConfig,
  data: ChartData,
  theme: ChartTheme,
  smooth: boolean,
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
      boundaryGap: false,
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
          type: 'dashed',
          width: 1
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
        type: 'line',
        data: item.data,
        smooth: smooth,
        smoothMonotone: 'x',
        symbolSize: 8,
        symbol: 'circle',
        showSymbol: false,
        // 精美的渐变线条
        lineStyle: {
          width: 3,
          color: createGradientColor(gradient.start, gradient.end, 'horizontal')
        },
        // 轻微的渐变填充区域
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { 
                offset: 0, 
                color: `${gradient.start}25`  // 25% 透明度
              },
              { 
                offset: 1, 
                color: `${gradient.end}03`    // 3% 透明度
              }
            ]
          }
        },
        // 数据点样式 - 光晕效果
        itemStyle: {
          color: gradient.start,
          borderColor: '#fff',
          borderWidth: 2
        },
        // 强调效果 - 悬浮放大
        emphasis: {
          focus: 'series',
          symbolSize: 14,
          scale: true,
          itemStyle: {
            borderWidth: 3,
            borderColor: '#fff'
          },
          lineStyle: {
            width: 4
          }
        },
        // 标签
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
        // 入场动画
        animationDelay: (idx: number) => idx * 40,
        animationEasing: 'cubicOut',
        animationDuration: 1200
      }
    })
  }
}

/**
 * 堆叠折线图 - 顶级视觉效果版本
 */
export const createStackedLineChartOption = (
  baseConfig: ChartBaseConfig,
  data: ChartData,
  theme: ChartTheme,
  smooth: boolean
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
      boundaryGap: false,
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
        type: 'line',
        data: item.data,
        smooth: smooth,
        stack: 'total',
        symbolSize: 6,
        symbol: 'circle',
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: createGradientColor(gradient.start, gradient.end, 'horizontal')
        },
        // 渐变堆叠区域
        areaStyle: {
          color: createGradientColor(`${gradient.start}88`, `${gradient.end}88`, 'vertical')
        },
        emphasis: {
          focus: 'series',
          symbolSize: 12,
          lineStyle: {
            width: 3
          }
        },
        animationDelay: (idx: number) => idx * 40,
        animationEasing: 'cubicOut',
        animationDuration: 1200
      }
    })
  }
}

/**
 * 阶梯折线图 - 顶级视觉效果版本
 */
export const createStepLineChartOption = (
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
      boundaryGap: false,
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
        type: 'line',
        data: item.data,
        step: 'end',
        symbolSize: 8,
        symbol: 'circle',
        showSymbol: false,
        lineStyle: {
          width: 3,
          color: createGradientColor(gradient.start, gradient.end, 'horizontal')
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { 
                offset: 0, 
                color: `${gradient.start}20`
              },
              { 
                offset: 1, 
                color: `${gradient.end}03`
              }
            ]
          }
        },
        itemStyle: {
          color: gradient.start,
          borderColor: '#fff',
          borderWidth: 2
        },
        emphasis: {
          focus: 'series',
          symbolSize: 14,
          itemStyle: {
            borderWidth: 3
          },
          lineStyle: {
            width: 4
          }
        },
        animationDelay: (idx: number) => idx * 40,
        animationEasing: 'cubicOut',
        animationDuration: 1200
      }
    })
  }
}
