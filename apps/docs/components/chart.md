# Chart 图表

基于 ECharts 封装的可视化图表组件，开箱即用，设计精美。

## 折线图

用于展示数据随时间或类别的变化趋势，支持多种变体。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900">直线折线图</h4>
      <XChart
        type="line"
        :data="lineData"
        :smooth="false"
        height="280px"
      />
    </div>
    
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900">平滑折线图</h4>
      <XChart
        type="line"
        :data="lineData"
        :smooth="true"
        height="280px"
      />
    </div>
    
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900">堆叠折线图</h4>
      <XChart
        type="line"
        variant="stacked"
        :data="lineData"
        :smooth="true"
        height="280px"
      />
    </div>
    
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900">阶梯折线图</h4>
      <XChart
        type="line"
        variant="step"
        :data="lineData"
        height="280px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XChart } from '@xlui/xux-ui'

const lineData = ref({
  xAxis: ['一月', '二月', '三月', '四月', '五月', '六月'],
  series: [
    {
      name: '销售额',
      data: [120, 200, 150, 280, 320, 260]
    },
    {
      name: '访问量',
      data: [80, 150, 180, 200, 250, 280]
    }
  ]
})
</script>

<style scoped>
h4 {
  margin: 0;
}
</style>
```

:::

## 柱状图

用于比较不同类别的数据大小，支持多种变体。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900">基础柱状图</h4>
      <XChart
        type="bar"
        :data="barData"
        height="280px"
        show-label
      />
    </div>
    
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900">堆叠柱状图</h4>
      <XChart
        type="bar"
        variant="stacked"
        :data="barData"
        height="280px"
      />
    </div>
    
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900">横向柱状图</h4>
      <XChart
        type="bar"
        variant="horizontal"
        :data="barData"
        height="280px"
        show-label
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XChart } from '@xlui/xux-ui'

const barData = ref({
  xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  series: [
    {
      name: '订单量',
      data: [320, 332, 301, 334, 390, 420, 380]
    },
    {
      name: '成交量',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
})
</script>

<style scoped>
h4 {
  margin: 0;
}
</style>
```

:::

## 饼图

用于展示数据的占比关系，支持多种变体。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 gap-6">
      <div>
        <h4 class="text-sm font-semibold mb-3 text-gray-900 text-center">基础饼图</h4>
        <XChart
          type="pie"
          :data="pieData"
          height="300px"
          show-label
        />
      </div>
      
      <div>
        <h4 class="text-sm font-semibold mb-3 text-gray-900 text-center">环形图</h4>
        <XChart
          type="doughnut"
          :data="pieData"
          height="300px"
          show-label
        />
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-6">
      <div>
        <h4 class="text-sm font-semibold mb-3 text-gray-900 text-center">南丁格尔玫瑰图</h4>
        <XChart
          type="pie"
          variant="rose"
          :data="pieData"
          height="300px"
          show-label
        />
      </div>
      
      <div>
        <h4 class="text-sm font-semibold mb-3 text-gray-900 text-center">半环图</h4>
        <XChart
          type="doughnut"
          variant="semi"
          :data="pieData"
          height="300px"
          show-label
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XChart } from '@xlui/xux-ui'

const pieData = ref({
  data: [
    { value: 1048, name: '手机数码' },
    { value: 735, name: '家用电器' },
    { value: 580, name: '服装鞋帽' },
    { value: 484, name: '图书音像' },
    { value: 300, name: '其他' }
  ]
})
</script>

<style scoped>
h4 {
  margin: 0;
}
</style>
```

:::

## 面积图

在折线图基础上填充区域，更好地展示数据趋势，支持多种变体。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900">基础面积图</h4>
      <XChart
        type="area"
        :data="areaData"
        height="280px"
        :smooth="true"
      />
    </div>
    
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900">堆叠面积图</h4>
      <XChart
        type="area"
        variant="stacked"
        :data="areaData"
        height="280px"
        :smooth="true"
      />
    </div>
    
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900">渐变面积图</h4>
      <XChart
        type="area"
        variant="gradient"
        :data="areaData"
        height="280px"
        :smooth="true"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XChart } from '@xlui/xux-ui'

const areaData = ref({
  xAxis: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
  series: [
    {
      name: '活跃用户',
      data: [200, 150, 350, 500, 450, 380, 280]
    },
    {
      name: '在线用户',
      data: [100, 80, 200, 350, 300, 250, 180]
    }
  ]
})
</script>

<style scoped>
h4 {
  margin: 0;
}
</style>
```

:::

## 折线柱状混合图

同时展示折线和柱状，适合对比不同维度的数据。

:::demo

```vue
<template>
  <XChart
    type="mixed"
    :data="mixedData"
    height="400px"
  />
</template>

<script setup>
import { ref } from 'vue'
import { XChart } from '@xlui/xux-ui'

const mixedData = ref({
  xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
  yAxisName: ['销售额 (万元)', '增长率 (%)'],
  series: [
    {
      name: '销售额',
      type: 'bar',
      data: [120, 200, 150, 280, 320, 260],
      yAxisIndex: 0
    },
    {
      name: '增长率',
      type: 'line',
      data: [10, 25, 18, 35, 42, 28],
      yAxisIndex: 1
    }
  ]
})
</script>
```

:::

## 实时动态更新

图表数据实时更新，带有平滑的过渡动画。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div class="flex gap-2">
      <XButton @click="startRealtime" type="primary" :disabled="isRunning">
        开始实时更新
      </XButton>
      <XButton @click="stopRealtime" :disabled="!isRunning">
        停止更新
      </XButton>
      <XButton @click="resetData">
        重置数据
      </XButton>
    </div>
    
    <div class="grid grid-cols-2 gap-6">
      <div>
        <h4 class="text-sm font-semibold mb-3 text-gray-900 text-center">实时折线图</h4>
        <XChart
          type="line"
          :data="realtimeLineData"
          height="300px"
          :smooth="true"
        />
      </div>
      
      <div>
        <h4 class="text-sm font-semibold mb-3 text-gray-900 text-center">实时柱状图</h4>
        <XChart
          type="bar"
          :data="realtimeBarData"
          height="300px"
        />
      </div>
    </div>
    
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900 text-center">混合实时图表</h4>
      <XChart
        type="mixed"
        :data="realtimeMixedData"
        height="350px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { XChart, XButton } from '@xlui/xux-ui'

const isRunning = ref(false)
let timer = null

let timeCounter = 10

const realtimeLineData = ref({
  xAxis: ['0s', '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s'],
  series: [
    {
      name: 'CPU',
      data: [45, 48, 52, 49, 55, 51, 53, 50, 54, 52]
    },
    {
      name: '内存',
      data: [60, 62, 58, 65, 63, 68, 66, 64, 67, 65]
    }
  ]
})

const realtimeBarData = ref({
  xAxis: ['服务器1', '服务器2', '服务器3', '服务器4', '服务器5'],
  series: [
    {
      name: '请求数',
      data: [120, 200, 150, 180, 220]
    }
  ]
})

const realtimeMixedData = ref({
  xAxis: Array.from({ length: 10 }, (_, i) => `${i}s`),
  yAxisName: ['访问量', '响应时间(ms)'],
  series: [
    {
      name: '访问量',
      type: 'bar',
      data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 200 + 100)),
      yAxisIndex: 0
    },
    {
      name: '响应时间',
      type: 'line',
      data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100 + 50)),
      yAxisIndex: 1
    }
  ]
})

const startRealtime = () => {
  if (isRunning.value) return
  isRunning.value = true
  
  timer = setInterval(() => {
    // 更新折线图 - 从右往左滚动
    realtimeLineData.value.xAxis.shift()
    realtimeLineData.value.xAxis.push(`${timeCounter}s`)
    
    realtimeLineData.value.series.forEach(series => {
      series.data.shift()
      series.data.push(Math.floor(Math.random() * 30 + 40))
    })
    
    // 更新柱状图
    realtimeBarData.value.series[0].data = 
      realtimeBarData.value.series[0].data.map(() => 
        Math.floor(Math.random() * 150 + 100)
      )
    
    // 更新混合图表 - 从右往左滚动
    realtimeMixedData.value.xAxis.shift()
    realtimeMixedData.value.xAxis.push(`${timeCounter}s`)
    
    realtimeMixedData.value.series[0].data.shift()
    realtimeMixedData.value.series[0].data.push(Math.floor(Math.random() * 200 + 100))
    realtimeMixedData.value.series[1].data.shift()
    realtimeMixedData.value.series[1].data.push(Math.floor(Math.random() * 100 + 50))
    
    timeCounter++
  }, 1000)
}

const stopRealtime = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  isRunning.value = false
}

const resetData = () => {
  stopRealtime()
  
  timeCounter = 10
  
  realtimeLineData.value = {
    xAxis: ['0s', '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s'],
    series: [
      { name: 'CPU', data: [45, 48, 52, 49, 55, 51, 53, 50, 54, 52] },
      { name: '内存', data: [60, 62, 58, 65, 63, 68, 66, 64, 67, 65] }
    ]
  }
  
  realtimeBarData.value = {
    xAxis: ['服务器1', '服务器2', '服务器3', '服务器4', '服务器5'],
    series: [{ name: '请求数', data: [120, 200, 150, 180, 220] }]
  }
  
  realtimeMixedData.value = {
    xAxis: Array.from({ length: 10 }, (_, i) => `${i}s`),
    yAxisName: ['访问量', '响应时间(ms)'],
    series: [
      {
        name: '访问量',
        type: 'bar',
        data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 200 + 100)),
        yAxisIndex: 0
      },
      {
        name: '响应时间',
        type: 'line',
        data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100 + 50)),
        yAxisIndex: 1
      }
    ]
  }
}

onUnmounted(() => {
  stopRealtime()
})
</script>

<style scoped>
h4 {
  margin: 0;
}
</style>
```

:::

## 散点图

展示两个变量之间的关系。

:::demo

```vue
<template>
  <XChart
    type="scatter"
    :data="scatterData"
    height="400px"
  />
</template>

<script setup>
import { ref } from 'vue'
import { XChart } from '@xlui/xux-ui'

const scatterData = ref({
  series: [
    {
      name: '产品 A',
      data: [[10, 20], [15, 35], [20, 30], [25, 45], [30, 40], [35, 55]]
    },
    {
      name: '产品 B',
      data: [[12, 25], [18, 30], [22, 35], [28, 40], [32, 45], [38, 50]]
    }
  ]
})
</script>
```

:::

## 雷达图

用于多维度数据比较。

:::demo

```vue
<template>
  <XChart
    type="radar"
    :data="radarData"
    height="400px"
  />
</template>

<script setup>
import { ref } from 'vue'
import { XChart } from '@xlui/xux-ui'

const radarData = ref({
  indicator: [
    { name: '性能', max: 100 },
    { name: '功能', max: 100 },
    { name: '易用性', max: 100 },
    { name: '美观度', max: 100 },
    { name: '稳定性', max: 100 },
    { name: '文档', max: 100 }
  ],
  series: [
    {
      name: '产品 A',
      data: [85, 90, 80, 95, 88, 92]
    },
    {
      name: '产品 B',
      data: [75, 85, 90, 80, 82, 88]
    }
  ]
})
</script>
```

:::

## 仪表盘

用于展示进度或完成度。

:::demo

```vue
<template>
  <div class="grid grid-cols-2 gap-6">
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900 text-center">任务完成度</h4>
      <XChart
        type="gauge"
        :data="gaugeData1"
        height="300px"
      />
    </div>
    
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900 text-center">系统健康度</h4>
      <XChart
        type="gauge"
        :data="gaugeData2"
        height="300px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XChart } from '@xlui/xux-ui'

const gaugeData1 = ref({
  value: 68,
  title: '完成度',
  min: 0,
  max: 100
})

const gaugeData2 = ref({
  value: 92,
  title: '健康度',
  min: 0,
  max: 100
})
</script>

<style scoped>
h4 {
  margin: 0;
}
</style>
```

:::

## 自定义颜色

通过 `color` 属性自定义图表配色。

:::demo

```vue
<template>
  <XChart
    type="bar"
    :data="colorData"
    :color="['#f59e0b', '#10b981', '#3b82f6', '#ef4444']"
    height="400px"
  />
</template>

<script setup>
import { ref } from 'vue'
import { XChart } from '@xlui/xux-ui'

const colorData = ref({
  xAxis: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    {
      name: '收入',
      data: [180, 220, 260, 300]
    },
    {
      name: '支出',
      data: [120, 150, 180, 200]
    },
    {
      name: '利润',
      data: [60, 70, 80, 100]
    }
  ]
})
</script>
```

:::

## 加载状态

通过 `loading` 属性显示加载动画。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div class="flex gap-2">
      <XButton @click="toggleLoading" type="primary">
        {{ loading ? '隐藏加载' : '显示加载' }}
      </XButton>
      <XButton @click="refreshData">
        刷新数据
      </XButton>
    </div>
    
    <XChart
      type="line"
      :data="loadingData"
      :loading="loading"
      height="400px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XChart, XButton } from '@xlui/xux-ui'

const loading = ref(false)
const loadingData = ref({
  xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
  series: [
    {
      name: '数据',
      data: [120, 200, 150, 280, 320, 260]
    }
  ]
})

const toggleLoading = () => {
  loading.value = !loading.value
}

const refreshData = () => {
  loading.value = true
  setTimeout(() => {
    loadingData.value = {
      xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
      series: [{
        name: '数据',
        data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 400 + 100))
      }]
    }
    loading.value = false
  }, 1500)
}
</script>
```

:::

## 自定义配置

通过 `option` 属性完全自定义 ECharts 配置。

:::demo

```vue
<template>
  <XChart
    :option="customOption"
    height="400px"
  />
</template>

<script setup>
import { ref } from 'vue'
import { XChart } from '@xlui/xux-ui'

const customOption = ref({
  title: {
    text: '自定义图表',
    left: 'center',
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['产品A', '产品B', '产品C', '产品D', '产品E']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290],
    type: 'line',
    smooth: true,
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(102, 126, 234, 0.5)' },
          { offset: 1, color: 'rgba(102, 126, 234, 0.05)' }
        ]
      }
    },
    lineStyle: {
      width: 3,
      color: '#667eea'
    }
  }]
})
</script>
```

:::

## 实际场景

在实际项目中的应用示例。

:::demo

```vue
<template>
  <div class="space-y-6">
    <!-- 销售数据趋势 -->
    <div class="p-4 bg-white rounded-lg shadow-sm">
      <h4 class="text-sm font-semibold mb-3 text-gray-900">销售数据趋势</h4>
      <XChart
        type="area"
        :data="salesData"
        height="300px"
        :smooth="true"
      />
    </div>
    
    <!-- 分类占比 -->
    <div class="p-4 bg-white rounded-lg shadow-sm">
      <h4 class="text-sm font-semibold mb-3 text-gray-900">商品分类占比</h4>
      <XChart
        type="doughnut"
        :data="categoryData"
        height="300px"
        show-label
      />
    </div>
    
    <!-- 性能指标 -->
    <div class="p-4 bg-white rounded-lg shadow-sm">
      <h4 class="text-sm font-semibold mb-3 text-gray-900">系统性能指标</h4>
      <XChart
        type="radar"
        :data="performanceData"
        height="350px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XChart } from '@xlui/xux-ui'

const salesData = ref({
  xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  series: [
    {
      name: '今年',
      data: [820, 932, 901, 934, 1290, 1330, 1320, 1450, 1380, 1520, 1680, 1800]
    },
    {
      name: '去年',
      data: [680, 750, 820, 880, 950, 1020, 1100, 1150, 1200, 1280, 1350, 1420]
    }
  ]
})

const categoryData = ref({
  data: [
    { value: 3580, name: '电子产品' },
    { value: 2735, name: '服装鞋帽' },
    { value: 2180, name: '食品饮料' },
    { value: 1684, name: '家居用品' },
    { value: 1200, name: '图书文具' }
  ]
})

const performanceData = ref({
  indicator: [
    { name: 'CPU', max: 100 },
    { name: '内存', max: 100 },
    { name: '磁盘', max: 100 },
    { name: '网络', max: 100 },
    { name: '响应时间', max: 100 }
  ],
  series: [
    {
      name: '当前状态',
      data: [85, 72, 65, 88, 92]
    }
  ]
})
</script>

<style scoped>
h4 {
  margin: 0;
}
</style>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 图表类型 | `'line' \| 'bar' \| 'pie' \| 'doughnut' \| 'area' \| 'scatter' \| 'radar' \| 'gauge' \| 'mixed'` | `'line'` |
| variant | 图表变体 | `'default' \| 'stacked' \| 'horizontal' \| 'step' \| 'gradient' \| 'rose' \| 'semi'` | `'default'` |
| data | 图表数据 | `object` | - |
| option | 自定义 ECharts 配置（优先级最高） | `object` | - |
| width | 图表宽度 | `string` | `'100%'` |
| height | 图表高度 | `string` | `'400px'` |
| theme | 主题模式 | `'light' \| 'dark' \| 'auto'` | `'auto'` |
| loading | 是否显示加载动画 | `boolean` | `false` |
| color | 自定义颜色数组 | `string[]` | - |
| smooth | 是否平滑曲线（折线图/面积图） | `boolean` | `true` |
| showLabel | 是否显示数据标签 | `boolean` | `false` |
| showLegend | 是否显示图例 | `boolean` | `true` |
| showGrid | 是否显示网格 | `boolean` | `true` |
| animation | 是否启用动画 | `boolean` | `true` |

### 图表变体说明

通过 `variant` 属性可以为不同类型的图表选择不同的展示方式：

| 图表类型 | 可用变体 | 说明 |
|---------|---------|------|
| line | `default` | 基础折线图 |
| line | `stacked` | 堆叠折线图（填充区域） |
| line | `step` | 阶梯折线图 |
| bar | `default` | 基础柱状图 |
| bar | `stacked` | 堆叠柱状图 |
| bar | `horizontal` | 横向柱状图 |
| pie | `default` | 基础饼图 |
| pie | `rose` | 南丁格尔玫瑰图 |
| doughnut | `default` | 环形图 |
| doughnut | `semi` | 半环图 |
| area | `default` | 基础面积图 |
| area | `stacked` | 堆叠面积图 |
| area | `gradient` | 渐变面积图 |

### Data 格式

#### 折线图 / 柱状图 / 面积图

```typescript
{
  xAxis: string[],          // X 轴数据
  series: [{
    name: string,           // 系列名称
    data: number[]          // Y 轴数据
  }]
}
```

#### 混合图表（折线+柱状）

```typescript
{
  xAxis: string[],          // X 轴数据
  yAxisName: [string, string],  // 左右 Y 轴名称
  series: [{
    name: string,           // 系列名称
    type: 'bar' | 'line',   // 图表类型
    data: number[],         // 数据
    yAxisIndex: 0 | 1       // 使用的 Y 轴索引（0=左，1=右）
  }]
}
```

#### 饼图 / 环形图

```typescript
{
  data: [{
    name: string,           // 类别名称
    value: number           // 数值
  }]
}
```

#### 散点图

```typescript
{
  series: [{
    name: string,
    data: [number, number][]  // [x, y] 坐标对
  }]
}
```

#### 雷达图

```typescript
{
  indicator: [{
    name: string,           // 指标名称
    max: number            // 最大值
  }],
  series: [{
    name: string,
    data: number[]         // 各指标的值
  }]
}
```

#### 仪表盘

```typescript
{
  value: number,           // 当前值
  title: string,           // 标题
  min: number,            // 最小值
  max: number             // 最大值
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击图表元素时触发 | `(params: any)` |
| legendselectchanged | 图例选择改变时触发 | `(params: any)` |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| resize | 重新计算和绘制图表 | - |
| clear | 清空图表 | - |
| getInstance | 获取 ECharts 实例 | - |

## 贡献者

<div class="contributors">
  <div class="contributor-item">
    <a href="https://gitee.com/leheya" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://foruda.gitee.com/avatar/1751620424517657404/10604783_leheya_1751620424.png!avatar200" 
        alt="leheya"
        class="contributor-avatar"
      />
      <span class="contributor-name">无敌暴龙神</span>
    </a>
  </div>
</div>

<style scoped>
.contributors {
  display: flex;
  gap: 24px;
  margin: 24px 0;
  flex-wrap: wrap;
}

.contributor-item a {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
}

.contributor-item a:hover {
  transform: translateY(-2px);
}

.contributor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--vp-c-border);
  transition: border-color 0.2s ease;
  object-fit: cover;
}

.contributor-item a:hover .contributor-avatar {
  border-color: var(--vp-c-brand-1);
}

.contributor-name {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.2s ease;
}

.contributor-item a:hover .contributor-name {
  color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .contributors {
    gap: 16px;
  }
  
  .contributor-avatar {
    width: 60px;
    height: 60px;
  }
  
  .contributor-name {
    font-size: 12px;
  }
}
</style>

