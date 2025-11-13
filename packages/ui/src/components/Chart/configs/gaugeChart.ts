import type { ChartBaseConfig, ChartData, ChartTheme } from '../types'
import { gradientPairs, darkGradientPairs } from './colors'

/**
 * 仪表盘 - 顶级视觉效果版本
 */
export const createGaugeChartOption = (
  baseConfig: ChartBaseConfig,
  data: ChartData,
  theme: ChartTheme
) => {
  const value = data.value || 0
  const isDark = theme === 'dark'
  const pairs = isDark ? darkGradientPairs : gradientPairs
  const gradient = pairs[0]
  
  return {
    ...baseConfig,
    series: [{
      type: 'gauge',
      radius: '70%',
      center: ['50%', '50%'],
      startAngle: 225,
      endAngle: -45,
      min: data.min || 0,
      max: data.max || 100,
      // 精美的进度条
      progress: {
        show: true,
        width: 20,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              { offset: 0, color: gradient.start },
              { offset: 0.5, color: gradient.end },
              { offset: 1, color: gradient.start }
            ]
          }
        }
      },
      // 轴线样式
      axisLine: {
        lineStyle: {
          width: 20,
          color: [[1, isDark ? '#2a2a2a' : '#f0f0f0']]
        }
      },
      // 刻度样式
      axisTick: {
        show: true,
        distance: -24,
        length: 6,
        lineStyle: {
          color: isDark ? '#555' : '#ccc',
          width: 2
        }
      },
      // 分隔线样式
      splitLine: {
        show: true,
        distance: -28,
        length: 14,
        lineStyle: {
          width: 3,
          color: isDark ? '#555' : '#ccc'
        }
      },
      // 刻度标签
      axisLabel: {
        show: true,
        distance: -55,
        color: isDark ? '#999' : '#666',
        fontSize: 11,
        fontWeight: '600'
      },
      // 中心锚点
      anchor: {
        show: true,
        showAbove: true,
        size: 20,
        itemStyle: {
          borderWidth: 10,
          borderColor: gradient.start
        }
      },
      // 精美的指针
      pointer: {
        length: '65%',
        width: 8,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: `${gradient.start}cc` },
              { offset: 0.5, color: gradient.end },
              { offset: 1, color: gradient.start }
            ]
          }
        }
      },
      // 标题样式
      title: {
        show: !!data.title,
        offsetCenter: [0, '75%'],
        fontSize: 13,
        fontWeight: '600',
        color: isDark ? '#9ca3af' : '#6b7280'
      },
      // 详情数值样式
      detail: {
        show: true,
        valueAnimation: true,
        formatter: '{value}',
        fontSize: 28,
        fontWeight: 'bold',
        color: isDark ? '#fff' : '#333',
        offsetCenter: [0, '50%']
      },
      data: [{
        value: value,
        name: data.title || ''
      }]
    }],
    // 流畅动画
    animationDuration: 1500,
    animationEasing: 'elasticOut'
  }
}
