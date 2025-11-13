import type { ChartBaseConfig, ChartData, ChartTheme } from '../types'
import { chartColors, gradientPairs, darkGradientPairs, createGradientColor } from './colors'
import { getResponsiveConfig } from '../utils/responsive'

/**
 * 混合图表（折线+柱状）- 顶级视觉效果版本
 */
export const createMixedChartOption = (
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
    yAxis: [
      {
        type: 'value',
        name: data.yAxisName?.[0] || '',
        nameTextStyle: {
          color: isDark ? '#9ca3af' : '#6b7280',
          fontSize: responsive.fontSize.axisLabel,
          fontWeight: '600'
        },
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
      {
        type: 'value',
        name: data.yAxisName?.[1] || '',
        nameTextStyle: {
          color: isDark ? '#9ca3af' : '#6b7280',
          fontSize: responsive.fontSize.axisLabel,
          fontWeight: '600'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          color: isDark ? '#9ca3af' : '#6b7280',
          fontSize: responsive.fontSize.axisLabel,
          fontWeight: 500
        }
      }
    ],
    series: (data.series || []).map((item: any, index: number) => {
      const pairIndex = index % pairs.length
      const gradient = pairs[pairIndex]
      const isBar = item.type === 'bar'
      
      if (isBar) {
        // 柱状图系列
        return {
          name: item.name,
          type: 'bar',
          data: item.data,
          yAxisIndex: item.yAxisIndex || 0,
          barMaxWidth: 35,
          // 精美的渐变柱子
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: createGradientColor(gradient.start, gradient.end, 'vertical')
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderRadius: [8, 8, 0, 0]
            }
          },
          animationDelay: (idx: number) => idx * 60,
          animationEasing: 'elasticOut',
          animationDuration: 1000
        }
      } else {
        // 折线图系列
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          yAxisIndex: item.yAxisIndex || 0,
          smooth: true,
          smoothMonotone: 'x',
          symbolSize: 8,
          symbol: 'circle',
          showSymbol: false,
          // 精美的渐变线条
          lineStyle: {
            width: 3,
            color: createGradientColor(gradient.start, gradient.end, 'horizontal')
          },
          // 轻微的渐变填充
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: `${gradient.start}20` },
                { offset: 1, color: `${gradient.end}03` }
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
      }
    })
  }
}
