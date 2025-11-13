/**
 * 响应式配置工具
 */

// 获取当前视口尺寸类型
export const getViewportSize = () => {
  const width = window.innerWidth
  if (width < 480) return 'xs'
  if (width < 768) return 'sm'
  if (width < 1024) return 'md'
  if (width < 1280) return 'lg'
  return 'xl'
}

// 响应式字体大小
export const responsiveFontSize = {
  xs: { label: 10, axisLabel: 10, legend: 11, title: 12 },
  sm: { label: 11, axisLabel: 11, legend: 12, title: 13 },
  md: { label: 12, axisLabel: 12, legend: 13, title: 14 },
  lg: { label: 12, axisLabel: 12, legend: 13, title: 15 },
  xl: { label: 13, axisLabel: 12, legend: 13, title: 16 }
}

// 响应式线宽
export const responsiveLineWidth = {
  xs: { line: 2, bar: 25, symbolSize: 6 },
  sm: { line: 2.5, bar: 30, symbolSize: 7 },
  md: { line: 3, bar: 35, symbolSize: 8 },
  lg: { line: 3, bar: 40, symbolSize: 8 },
  xl: { line: 3, bar: 40, symbolSize: 8 }
}

// 响应式内边距
export const responsiveGrid = {
  xs: { left: '5%', right: '5%', top: '20%', bottom: '5%' },
  sm: { left: '4%', right: '4%', top: '18%', bottom: '4%' },
  md: { left: '3%', right: '4%', top: '15%', bottom: '3%' },
  lg: { left: '3%', right: '4%', top: '15%', bottom: '3%' },
  xl: { left: '3%', right: '4%', top: '15%', bottom: '3%' }
}

// 获取响应式配置
export const getResponsiveConfig = () => {
  const size = getViewportSize()
  return {
    fontSize: responsiveFontSize[size],
    lineWidth: responsiveLineWidth[size],
    grid: responsiveGrid[size]
  }
}

