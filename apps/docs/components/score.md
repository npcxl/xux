# Score 评分

评分组件用于收集用户对商品、服务等的评价，支持多种尺寸和自定义配置。

## 基础用法

最简单的评分组件用法。

:::demo

```vue
<template>
  <div class="flex gap-6 items-center">
    <XScore v-model="score1" />
    <span>当前评分: {{ score1 }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score1 = ref(0)
</script>
```

:::

## 不同尺寸

支持三种尺寸：`small`、`medium`、`large`。

:::demo

```vue
<template>
  <div class="flex gap-8 items-center">
    <div class="flex flex-col items-center gap-2">
      <XScore v-model="score" size="small" />
      <span class="text-sm text-gray-500">小尺寸</span>
    </div>
    
    <div class="flex flex-col items-center gap-2">
      <XScore v-model="score" size="medium" />
      <span class="text-sm text-gray-500">中等尺寸</span>
    </div>
    
    <div class="flex flex-col items-center gap-2">
      <XScore v-model="score" size="large" />
      <span class="text-sm text-gray-500">大尺寸</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score = ref(3)
</script>
```

:::

## 显示评分文字

可以显示对应的评分文字描述。

:::demo

```vue
<template>
  <div class="flex gap-6 items-center">
    <XScore 
      v-model="score2" 
      :show-text="true"
      :texts="['极差', '差', '一般', '好', '极好']"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score2 = ref(4)
</script>
```

:::

## 显示数值

可以显示具体的评分数值。

:::demo

```vue
<template>
  <div class="flex gap-6 items-center">
    <XScore 
      v-model="score3" 
      :show-value="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score3 = ref(3)
</script>
```

:::

## 同时显示文字和数值

可以同时显示评分文字和数值。

:::demo

```vue
<template>
  <div class="flex gap-6 items-center">
    <XScore 
      v-model="score4" 
      :show-text="true"
      :show-value="true"
      :texts="['极差', '差', '一般', '好', '极好']"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score4 = ref(5)
</script>
```

## 自定义最大星数

可以自定义最大星数，比如 10 星评分。

:::demo

```vue
<template>
  <div class="flex gap-6 items-center">
    <XScore 
      v-model="score5" 
      :max-stars="10"
      :show-value="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score5 = ref(7)
</script>
```

:::

## 自定义颜色

可以自定义星星的颜色。

:::demo

```vue
<template>
  <div class="flex gap-6 items-center">
    <XScore 
      v-model="score6" 
      color="#ff6b6b"
      :show-text="true"
    />
    
    <XScore 
      v-model="score6" 
      color="#4ecdc4"
      :show-text="true"
    />
    
    <XScore 
      v-model="score6" 
      color="#45b7d1"
      :show-text="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score6 = ref(4)
</script>
```

:::

## 禁用状态

评分组件可以设置为禁用状态。

:::demo

```vue
<template>
  <div class="flex gap-6 items-center">
    <XScore 
      v-model="score7" 
      :disabled="true"
      :show-text="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score7 = ref(3)
</script>
```

:::

## 监听评分变化

可以监听评分变化事件。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <XScore 
      v-model="score8" 
      :show-text="true"
      :show-value="true"
      @change="handleScoreChange"
    />
    <div class="text-sm text-gray-600">
      评分变化记录: {{ changeLog }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const score8 = ref(0)
const changeLog = ref('')

const handleScoreChange = (value) => {
  changeLog.value += `${new Date().toLocaleTimeString()}: 评分变为 ${value} 星\n`
}
</script>
```

:::

## 电商场景示例

在电商场景中的实际应用。

:::demo

```vue
<template>
  <div class="max-w-md p-6 border rounded-lg">
    <div class="flex items-center gap-4 mb-4">
      <img 
        src="https://via.placeholder.com/80x80" 
        alt="商品图片" 
        class="w-20 h-20 rounded"
      />
      <div>
        <h3 class="font-semibold">商品名称</h3>
        <p class="text-sm text-gray-600">请为这个商品评分</p>
      </div>
    </div>
    
    <XScore 
      v-model="productScore" 
      :show-text="true"
      :show-value="true"
      :texts="['极差', '差', '一般', '好', '极好']"
      size="large"
      @change="handleProductScore"
    />
    
    <div v-if="productScore > 0" class="mt-4 p-3 bg-green-50 rounded">
      <p class="text-sm text-green-700">
        感谢您的评分！您给了 {{ productScore }} 星评价。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const productScore = ref(0)

const handleProductScore = (value) => {
  console.log('商品评分:', value)
}
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| modelValue | 当前评分值 | `number` | — | `0` |
| maxStars | 最大星数 | `number` | — | `5` |
| size | 组件尺寸 | `string` | `small` / `medium` / `large` | `medium` |
| disabled | 是否禁用 | `boolean` | — | `false` |
| showText | 是否显示评分文字 | `boolean` | — | `false` |
| showValue | 是否显示数值 | `boolean` | — | `false` |
| texts | 自定义评分文字 | `string[]` | — | `['极差', '差', '一般', '好', '极好']` |
| color | 自定义颜色 | `string` | — | `#ffc73a` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 评分变化时触发 | `(value: number)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| — | 无插槽 |

## 设计说明

### 动画效果

- **idle 动画**：星星边框的流动效果，增加视觉吸引力
- **yippee 动画**：点击时的爆炸效果，提供即时反馈
- **hover 效果**：鼠标悬停时的缩放和颜色变化

### 交互设计

- 使用 `flex-direction: row-reverse` 实现从右到左的评分逻辑
- 支持键盘导航和屏幕阅读器
- 禁用状态下的视觉反馈

### 自定义能力

- 支持自定义颜色、尺寸、星数
- 可配置评分文字和显示选项

## 注意事项

1. 评分值范围：0 到 maxStars
2. 多个评分组件在同一页面时，会自动生成唯一ID避免冲突
3. 建议在电商场景中配合文字描述使用，提升用户体验
4. 颜色建议使用暖色调，符合评分的积极含义
