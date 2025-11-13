import type { ChartBaseConfig, ChartData, ChartTheme } from '../types'
import { chartColors, gradientPairs, darkGradientPairs, createGradientColor } from './colors'
import { getResponsiveConfig } from '../utils/responsive'

/**
 * 雷达图 - 顶级视觉效果版本
 */
export const createRadarChartOption = (
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
    radar: {
      indicator: data.indicator || [],
      center: ['50%', '55%'],
      radius: '65%',
      // 精美的轴线样式
      axisLine: {
        lineStyle: {
          color: isDark ? '#4b5563' : '#e5e7eb',
          width: 2
        }
      },
      // 渐变分割线
      splitLine: {
        lineStyle: {
          color: isDark ? '#374151' : '#f3f4f6',
          width: 2
        }
      },
      // 精美的分割区域
      splitArea: {
        areaStyle: {
          color: isDark 
            ? ['#1f293711', '#37415122', '#4b556311', '#1f293711']
            : ['#f9fafb11', '#f3f4f622', '#e5e7eb11', '#f9fafb11']
        }
      },
      // 轴名称样式
      axisName: {
        color: isDark ? '#d1d5db' : '#4b5563',
        fontSize: responsive.fontSize.axisLabel,
        fontWeight: '600',
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        borderRadius: 4,
        padding: [4, 8]
      }
    },
    series: [{
      type: 'radar',
      data: (data.series || []).map((item: any, index: number) => {
        const pairIndex = index % pairs.length
        const gradient = pairs[pairIndex]
        
        return {
          name: item.name,
          value: item.data,
          // 精美的区域样式
          areaStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                { offset: 0, color: `${gradient.start}66` },
                { offset: 0.5, color: `${gradient.end}44` },
                { offset: 1, color: `${gradient.end}22` }
              ]
            }
          },
          // 精美的线条
          lineStyle: {
            width: 3,
            color: createGradientColor(gradient.start, gradient.end, 'horizontal')
          },
          // 数据点样式
          itemStyle: {
            color: gradient.start,
            borderColor: '#fff',
            borderWidth: 2
          },
          // 标签样式
          label: {
            show: false
          },
          // 强调效果
          emphasis: {
            areaStyle: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  { offset: 0, color: `${gradient.start}88` },
                  { offset: 0.5, color: `${gradient.end}66` },
                  { offset: 1, color: `${gradient.end}33` }
                ]
              }
            },
            lineStyle: {
              width: 4
            },
            itemStyle: {
              borderWidth: 3
            }
          }
        }
      }),
      // 流畅动画
      animationDelay: (idx: number) => idx * 100,
      animationEasing: 'elasticOut',
      animationDuration: 1200
    }]
  }
}
