export interface ChartBaseConfig {
  color: string[]
  animation: boolean
  animationDuration: number
  animationEasing: string
  animationDelay?: (idx: number) => number
  tooltip: any
  legend?: any
  grid?: any
}

export interface SeriesDataItem {
  name: string
  data: any[]
  type?: 'line' | 'bar'
  yAxisIndex?: number
}

export interface ChartData {
  xAxis?: string[]
  yAxisName?: string[]
  series?: SeriesDataItem[]
  data?: any[]
  indicator?: any[]
  value?: number
  title?: string
  min?: number
  max?: number
}

export type ChartTheme = 'light' | 'dark' | 'auto'

