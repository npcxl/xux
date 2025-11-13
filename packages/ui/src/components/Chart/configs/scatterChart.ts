import type { ChartBaseConfig, ChartData, ChartTheme } from '../types'
import { chartColors, gradientPairs, darkGradientPairs } from './colors'
import { getResponsiveConfig } from '../utils/responsive'

/**
 * 散点图 - 顶级视觉效果版本
 */
export const createScatterChartOption = (
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
      scale: true,
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
      splitLine: {
        lineStyle: {
          color: isDark ? '#374151' : '#f3f4f6',
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      scale: true,
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
        type: 'scatter',
        data: item.data,
        symbolSize: 18,
        symbol: 'circle',
        // 精美的渐变气泡
        itemStyle: {
          color: {
            type: 'radial',
            x: 0.4,
            y: 0.4,
            r: 0.6,
            colorStops: [
              { offset: 0, color: `${gradient.start}ee` },
              { offset: 0.7, color: gradient.end },
              { offset: 1, color: `${gradient.end}99` }
            ]
          },
          borderColor: isDark ? `${gradient.start}66` : `${gradient.start}44`,
          borderWidth: 2
        },
        // 强调效果 - 气泡放大
        emphasis: {
          focus: 'self',
          scale: 1.5,
          itemStyle: {
            borderWidth: 3,
            borderColor: isDark ? gradient.start : gradient.end
          }
        },
        // 流畅动画
        animationDelay: (idx: number) => idx * 20,
        animationEasing: 'elasticOut',
        animationDuration: 1000
      }
    })
  }
}
