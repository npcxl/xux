import type { ChartBaseConfig, ChartData, ChartTheme } from '../types'
import { chartColors } from './colors'
import { getResponsiveConfig } from '../utils/responsive'

/**
 * 基础饼图 - 顶级视觉效果版本
 */
export const createPieChartOption = (
  baseConfig: ChartBaseConfig,
  data: ChartData,
  theme: ChartTheme
) => {
  const colors = chartColors[theme === 'auto' ? 'light' : theme]
  const responsive = getResponsiveConfig()
  const isDark = theme === 'dark'
  
  return {
    ...baseConfig,
    color: colors,
    series: [{
      type: 'pie',
      radius: ['0%', '70%'],
      center: ['50%', '50%'],
      data: data.data || [],
      // 精美的标签样式
      label: {
        fontSize: responsive.fontSize.label,
        fontWeight: '600',
        color: isDark ? '#e5e7eb' : '#374151',
        formatter: '{b}\n{d}%',
        lineHeight: 16
      },
      labelLine: {
        length: 15,
        length2: 10,
        smooth: true,
        lineStyle: {
          width: 2,
          color: isDark ? '#4b5563' : '#d1d5db'
        }
      },
      // 每个扇区的样式
      itemStyle: {
        borderRadius: 8,
        borderColor: isDark ? '#1f2937' : '#ffffff',
        borderWidth: 2
      },
      // 强调效果 - 扇区突出
      emphasis: {
        scale: true,
        scaleSize: 12,
        label: {
          fontSize: responsive.fontSize.label + 2,
          fontWeight: 'bold'
        },
        itemStyle: {
          borderWidth: 3
        }
      },
      // 流畅动画
      animationType: 'expansion',
      animationEasing: 'elasticOut',
      animationDelay: (idx: number) => idx * 100,
      animationDuration: 1000
    }]
  }
}

/**
 * 环形图 - 顶级视觉效果版本
 */
export const createDoughnutChartOption = (
  baseConfig: ChartBaseConfig,
  data: ChartData,
  theme: ChartTheme
) => {
  const colors = chartColors[theme === 'auto' ? 'light' : theme]
  const responsive = getResponsiveConfig()
  const isDark = theme === 'dark'
  
  return {
    ...baseConfig,
    color: colors,
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '50%'],
      data: data.data || [],
      // 精美的标签
      label: {
        fontSize: responsive.fontSize.label,
        fontWeight: '600',
        color: isDark ? '#e5e7eb' : '#374151',
        formatter: '{b}\n{d}%',
        lineHeight: 16
      },
      labelLine: {
        length: 15,
        length2: 10,
        smooth: true,
        lineStyle: {
          width: 2,
          color: isDark ? '#4b5563' : '#d1d5db'
        }
      },
      // 每个扇区的样式
      itemStyle: {
        borderRadius: 8,
        borderColor: isDark ? '#1f2937' : '#ffffff',
        borderWidth: 2
      },
      // 强调效果
      emphasis: {
        scale: true,
        scaleSize: 12,
        label: {
          fontSize: responsive.fontSize.label + 2,
          fontWeight: 'bold'
        },
        itemStyle: {
          borderWidth: 3
        }
      },
      // 流畅动画
      animationType: 'expansion',
      animationEasing: 'elasticOut',
      animationDelay: (idx: number) => idx * 100,
      animationDuration: 1000
    }]
  }
}

/**
 * 玫瑰图 - 顶级视觉效果版本
 */
export const createRoseChartOption = (
  baseConfig: ChartBaseConfig,
  data: ChartData,
  theme: ChartTheme
) => {
  const colors = chartColors[theme === 'auto' ? 'light' : theme]
  const responsive = getResponsiveConfig()
  const isDark = theme === 'dark'
  
  return {
    ...baseConfig,
    color: colors,
    series: [{
      type: 'pie',
      radius: ['20%', '70%'],
      center: ['50%', '50%'],
      roseType: 'area',
      data: data.data || [],
      // 精美的标签
      label: {
        fontSize: responsive.fontSize.label,
        fontWeight: '600',
        color: isDark ? '#e5e7eb' : '#374151',
        formatter: '{b}\n{c}',
        lineHeight: 16
      },
      labelLine: {
        length: 20,
        length2: 15,
        smooth: true,
        lineStyle: {
          width: 2,
          color: isDark ? '#4b5563' : '#d1d5db'
        }
      },
      // 每个扇区的样式
      itemStyle: {
        borderRadius: 6,
        borderColor: isDark ? '#1f2937' : '#ffffff',
        borderWidth: 2
      },
      // 强调效果
      emphasis: {
        scale: true,
        scaleSize: 10,
        label: {
          fontSize: responsive.fontSize.label + 2,
          fontWeight: 'bold'
        },
        itemStyle: {
          borderWidth: 3
        }
      },
      // 流畅动画
      animationType: 'expansion',
      animationEasing: 'elasticOut',
      animationDelay: (idx: number) => idx * 100,
      animationDuration: 1200
    }]
  }
}

/**
 * 半环形图 - 顶级视觉效果版本
 */
export const createSemiDoughnutChartOption = (
  baseConfig: ChartBaseConfig,
  data: ChartData,
  theme: ChartTheme
) => {
  const colors = chartColors[theme === 'auto' ? 'light' : theme]
  const responsive = getResponsiveConfig()
  const isDark = theme === 'dark'
  
  return {
    ...baseConfig,
    color: colors,
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['50%', '60%'],
      startAngle: 180,
      endAngle: 360,
      data: data.data || [],
      // 精美的标签
      label: {
        fontSize: responsive.fontSize.label,
        fontWeight: '600',
        color: isDark ? '#e5e7eb' : '#374151',
        formatter: '{b}\n{d}%',
        lineHeight: 16
      },
      labelLine: {
        length: 15,
        length2: 10,
        smooth: true,
        lineStyle: {
          width: 2,
          color: isDark ? '#4b5563' : '#d1d5db'
        }
      },
      // 每个扇区的样式
      itemStyle: {
        borderRadius: 8,
        borderColor: isDark ? '#1f2937' : '#ffffff',
        borderWidth: 2
      },
      // 强调效果
      emphasis: {
        scale: true,
        scaleSize: 12,
        label: {
          fontSize: responsive.fontSize.label + 2,
          fontWeight: 'bold'
        },
        itemStyle: {
          borderWidth: 3
        }
      },
      // 流畅动画
      animationType: 'expansion',
      animationEasing: 'elasticOut',
      animationDelay: (idx: number) => idx * 100,
      animationDuration: 1000
    }]
  }
}
