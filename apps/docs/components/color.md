# Color 颜色选择器

一个优雅的颜色选择器组件，支持预设颜色和自定义颜色输入。

## 基础用法

最简单的颜色选择器示例。

:::demo

```vue
<script setup>
import { ref } from 'vue'

const color = ref('#3b82f6')
</script>

<template>
  <div>
    <div class='pt-10'>
    <XColor v-model="color" />
    </div>
    <div style="margin-top: 16px">选中的颜色：{{ color }}</div>
  </div>
</template>
```

:::

## 自定义颜色列表

通过 `colors` 属性可以自定义颜色列表。

:::demo

```vue
<script setup>
import { ref } from 'vue'

const color = ref('#ff5733')

const customColors = [
  '#ff5733',
  '#33ff57',
  '#3357ff',
  '#ff33f5',
  '#33fff5',
  '#f5ff33',
  '#ff8c00',
  '#7b68ee'
]
</script>

<template>
<div class='pt-10'>
  <XColor v-model="color" :colors="customColors" />
  </div>

</template>
```

:::

## 隐藏颜色输入框

通过设置 `show-input` 为 `false` 可以隐藏原生颜色输入框。

:::demo

```vue
<script setup>
import { ref } from 'vue'

const color = ref('#8b5cf6')
</script>

<template>
  <div class='pt-10'>
  <XColor v-model="color" :show-input="false" />
  </div>
</template>
```

:::

## 隐藏提示信息

通过设置 `show-tooltips` 为 `false` 可以隐藏悬停时的颜色值提示。

:::demo

```vue
<script setup>
import { ref } from 'vue'

const color = ref('#10b981')
</script>

<template>
<div class='pt-10'>
  <XColor v-model="color" :show-tooltips="false" />
  </div>
</template>
```

:::

## 禁用状态

通过 `disabled` 属性可以禁用颜色选择器。

:::demo

```vue
<script setup>
import { ref } from 'vue'

const color = ref('#f472b6')
</script>

<template>
    <div class='pt-10'>
  <XColor v-model="color" disabled />
  </div>
</template>
```

:::

## 事件监听

颜色选择器支持 `change` 事件，在颜色变化时触发。

:::demo

```vue
<script setup>
import { ref } from 'vue'
import { xlMsg } from '@xlui/xux-ui'

const color = ref('#3b82f6')

const handleChange = (value) => {
  xlMsg({
    message: `颜色已变更为：${value}`,
    type: 'success'
  })
}
</script>

<template>
    <div class='pt-10'>
  <XColor v-model="color" @change="handleChange" />
  </div>
</template>
```

:::

## 主题色配置示例

使用颜色选择器配置应用主题色。

:::demo

```vue
<script setup>
import { ref, computed } from 'vue'

const themeColor = ref('#3b82f6')

const themeColors = [
  '#3b82f6', // 蓝色
  '#10b981', // 绿色
  '#f59e0b', // 橙色
  '#ef4444', // 红色
  '#8b5cf6', // 紫色
  '#ec4899', // 粉色
  '#14b8a6', // 青色
  '#f97316'  // 深橙
]

const themeStyle = computed(() => ({
  backgroundColor: themeColor.value,
  padding: '20px',
  borderRadius: '8px',
  color: 'white',
  textAlign: 'center',
  marginBottom: '20px'
}))
</script>

<template>
  <div>
    <div :style="themeStyle">
      <h3 style="margin: 0 0 8px 0">当前主题色</h3>
      <p style="margin: 0">{{ themeColor }}</p>
    </div>
    <XColor v-model="themeColor" :colors="themeColors" />
  </div>
</template>
```

:::

## 电商场景示例

颜色选择器在电商场景中的应用，比如商品颜色选择。

:::demo

```vue
<script setup>
import { ref } from 'vue'

const productColor = ref('#e11d48')

const productColors = [
  '#000000', // 经典黑
  '#ffffff', // 纯净白
  '#e11d48', // 玫瑰红
  '#f472b6', // 樱花粉
  '#0ea5e9', // 天空蓝
  '#10b981', // 薄荷绿
  '#f59e0b', // 香槟金
  '#8b5cf6'  // 薰衣紫
]
</script>

<template>
  <div>
    <div style="margin-bottom: 12px; font-weight: 500;">选择商品颜色</div>
    <XColor 
      v-model="productColor" 
      :colors="productColors"
      :show-input="false"
    />
    <div style="margin-top: 16px; color: #666;">
      已选择：<span :style="{ color: productColor, fontWeight: 'bold' }">{{ productColor }}</span>
    </div>
  </div>
</template>
```

:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `string` | — |
| colors | 自定义颜色列表 | `string[]` | 默认 10 种颜色 |
| show-input | 是否显示原生颜色输入框 | `boolean` | `true` |
| show-tooltips | 是否显示颜色值提示 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| default-color | 默认颜色 | `string` | `#3b82f6` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值变化时触发 | `(value: string)` |
| change | 颜色变化时触发 | `(value: string)` |

### 默认颜色列表

组件内置了 10 种精选颜色：

```js
[
  '#e11d48', // 玫红
  '#f472b6', // 粉红
  '#fb923c', // 橙色
  '#facc15', // 黄色
  '#84cc16', // 青柠
  '#10b981', // 翠绿
  '#0ea5e9', // 天蓝
  '#3b82f6', // 蓝色
  '#8b5cf6', // 紫色
  '#a78bfa'  // 淡紫
]
```

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
