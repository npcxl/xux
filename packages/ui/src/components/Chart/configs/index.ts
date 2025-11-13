// 折线图
export { 
  createLineChartOption,
  createStackedLineChartOption,
  createStepLineChartOption
} from './lineChart'

// 柱状图
export { 
  createBarChartOption,
  createStackedBarChartOption,
  createHorizontalBarChartOption
} from './barChart'

// 饼图
export { 
  createPieChartOption, 
  createDoughnutChartOption,
  createRoseChartOption,
  createSemiDoughnutChartOption
} from './pieChart'

// 面积图
export { 
  createAreaChartOption,
  createStackedAreaChartOption,
  createGradientAreaChartOption
} from './areaChart'

// 其他
export { createScatterChartOption } from './scatterChart'
export { createRadarChartOption } from './radarChart'
export { createGaugeChartOption } from './gaugeChart'
export { createMixedChartOption } from './mixedChart'
export { chartColors } from './colors'
