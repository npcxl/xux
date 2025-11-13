import type { ChartBaseConfig, ChartData, ChartTheme } from '../types'
import { chartColors, gradientPairs, darkGradientPairs, createGradientColor } from './colors'
import { getResponsiveConfig } from '../utils/responsive'

/**
 * 基础面积图 - 顶级视觉效果版本
 */
export const createAreaChartOption = (
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
        smoothMonotone: 'x',
        symbolSize: 8,
        symbol: 'circle',
        showSymbol: false,
        // 精美的渐变线条
        lineStyle: {
          width: 3,
          color: createGradientColor(gradient.start, gradient.end, 'horizontal')
        },
        // 惊艳的渐变填充区域
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
                color: `${gradient.start}88`  // 88% 不透明度
              },
              { 
                offset: 0.5, 
                color: `${gradient.end}50`    // 50% 不透明度
              },
              { 
                offset: 1, 
                color: `${gradient.end}10`    // 10% 不透明度
              }
            ]
          }
        },
        // 数据点样式
        itemStyle: {
          color: gradient.start,
          borderColor: '#fff',
          borderWidth: 2
        },
        // 强调效果
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
        // 流畅动画
        animationDelay: (idx: number) => idx * 40,
        animationEasing: 'cubicOut',
        animationDuration: 1200
      }
    })
  }
}

/**
 * 堆叠面积图 - 顶级视觉效果版本
 */
export const createStackedAreaChartOption = (
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
        // 堆叠区域的渐变填充
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
                color: `${gradient.start}aa`
              },
              { 
                offset: 1, 
                color: `${gradient.end}aa`
              }
            ]
          }
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
 * 渐变面积图（增强版） - 顶级视觉效果版本
 */
export const createGradientAreaChartOption = (
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
        smooth: true,
        smoothMonotone: 'x',
        symbolSize: 10,
        symbol: 'circle',
        showSymbol: true,
        // 多彩渐变线条
        lineStyle: {
          width: 4,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: gradient.start },
              { offset: 0.5, color: gradient.end },
              { offset: 1, color: gradient.start }
            ]
          }
        },
        // 梦幻渐变填充
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
                color: `${gradient.start}99`  // 99% 不透明度
              },
              { 
                offset: 0.3, 
                color: `${gradient.end}66`    // 66% 不透明度
              },
              { 
                offset: 0.7, 
                color: `${gradient.end}33`    // 33% 不透明度
              },
              { 
                offset: 1, 
                color: `${gradient.end}05`    // 5% 不透明度
              }
            ]
          }
        },
        // 精美的数据点
        itemStyle: {
          color: gradient.start,
          borderColor: '#fff',
          borderWidth: 3
        },
        // 强调效果
        emphasis: {
          focus: 'series',
          symbolSize: 16,
          scale: true,
          itemStyle: {
            borderWidth: 4,
            borderColor: '#fff'
          },
          lineStyle: {
            width: 5
          }
        },
        // 华丽动画
        animationDelay: (idx: number) => idx * 50,
        animationEasing: 'elasticOut',
        animationDuration: 1500
      }
    })
  }
}
