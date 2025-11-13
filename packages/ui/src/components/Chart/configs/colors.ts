// 顶级渐变配色方案 - 打造万中无一的视觉效果
import type { ChartTheme } from '../types'

// 精心设计的渐变色板 - 灵感来自 Stripe、Linear、Apple
export const gradientPalettes = {
  // 霞光渐变
  sunset: ['#FF6B6B', '#FFE66D', '#4ECDC4'],
  // 极光渐变
  aurora: ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
  // 青柠渐变
  lime: ['#11998e', '#38ef7d', '#a8ff78'],
  // 樱花渐变
  sakura: ['#fa709a', '#fee140', '#feca57'],
  // 海洋渐变
  ocean: ['#0066FF', '#00C9FF', '#92FE9D'],
  // 薰衣草渐变
  lavender: ['#a8edea', '#fed6e3', '#d299c2'],
  // 火焰渐变
  fire: ['#ff0844', '#ffb199', '#ffd700'],
  // 森林渐变
  forest: ['#134e5e', '#71b280', '#b5e48c'],
  // 银河渐变
  galaxy: ['#2E3192', '#1BFFFF', '#A8FFE5'],
  // 紫罗兰渐变
  violet: ['#9D50BB', '#6E48AA', '#4A00E0']
}

// 为每个系列创建精美的渐变色
export const createGradientColor = (startColor: string, endColor: string, direction: 'horizontal' | 'vertical' | 'diagonal' = 'diagonal') => {
  const coords = {
    horizontal: { x: 0, y: 0, x2: 1, y2: 0 },
    vertical: { x: 0, y: 0, x2: 0, y2: 1 },
    diagonal: { x: 0, y: 0, x2: 1, y2: 1 }
  }
  
  return {
    type: 'linear',
    ...coords[direction],
    colorStops: [
      { offset: 0, color: startColor },
      { offset: 1, color: endColor }
    ]
  }
}

// 创建多色渐变
export const createMultiGradient = (colors: string[], direction: 'horizontal' | 'vertical' | 'diagonal' = 'diagonal') => {
  const coords = {
    horizontal: { x: 0, y: 0, x2: 1, y2: 0 },
    vertical: { x: 0, y: 0, x2: 0, y2: 1 },
    diagonal: { x: 0, y: 0, x2: 1, y2: 1 }
  }
  
  const step = 1 / (colors.length - 1)
  
  return {
    type: 'linear',
    ...coords[direction],
    colorStops: colors.map((color, index) => ({
      offset: index * step,
      color: color
    }))
  }
}

export const chartColors: Record<ChartTheme, string[]> = {
  light: [
    '#667eea', // 靛蓝紫
    '#f093fb', // 粉紫
    '#4facfe', // 天蓝
    '#43e97b', // 翠绿
    '#fa709a', // 粉红
    '#fee140', // 金黄
    '#00f2fe', // 青色
    '#38f9d7', // 青绿
    '#ffa07a', // 浅橙
    '#764ba2'  // 深紫
  ],
  dark: [
    '#818cf8', // 亮靛蓝
    '#f9a8d4', // 亮粉紫
    '#7dd3fc', // 亮天蓝
    '#86efac', // 亮翠绿
    '#fb923c', // 亮粉红
    '#fcd34d', // 亮金黄
    '#67e8f9', // 亮青色
    '#6ee7b7', // 亮青绿
    '#fdba74', // 亮浅橙
    '#c084fc'  // 亮深紫
  ],
  auto: []
}

// 为系列创建渐变对 - 每个系列都有独特的渐变
export const gradientPairs: { start: string; end: string }[] = [
  { start: '#667eea', end: '#764ba2' },  // 靛蓝到深紫
  { start: '#f093fb', end: '#f5576c' },  // 粉紫到玫瑰
  { start: '#4facfe', end: '#00f2fe' },  // 天蓝到青色
  { start: '#43e97b', end: '#38f9d7' },  // 翠绿到青绿
  { start: '#fa709a', end: '#fee140' },  // 粉红到金黄
  { start: '#feca57', end: '#ff9ff3' },  // 橙黄到紫粉
  { start: '#00c6ff', end: '#0072ff' },  // 浅蓝到深蓝
  { start: '#38ef7d', end: '#11998e' },  // 浅绿到深绿
  { start: '#ff9a56', end: '#ffeaa7' },  // 橙色到奶黄
  { start: '#a29bfe', end: '#6c5ce7' }   // 淡紫到深紫
]

// 为暗色主题创建渐变对
export const darkGradientPairs: { start: string; end: string }[] = [
  { start: '#818cf8', end: '#a78bfa' },
  { start: '#f9a8d4', end: '#f472b6' },
  { start: '#7dd3fc', end: '#38bdf8' },
  { start: '#86efac', end: '#4ade80' },
  { start: '#fb923c', end: '#f97316' },
  { start: '#fcd34d', end: '#facc15' },
  { start: '#67e8f9', end: '#22d3ee' },
  { start: '#6ee7b7', end: '#34d399' },
  { start: '#fdba74', end: '#fb923c' },
  { start: '#c084fc', end: '#a855f7' }
]
