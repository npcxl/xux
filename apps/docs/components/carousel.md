# Carousel 走马灯

轮播图组件，支持多种炫酷动画效果、触摸滑动、自动播放等功能。

<div style="columns: 2; column-gap: 32px; margin-top: 32px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

基本的走马灯展示。

:::demo

```vue
<template>
  <XCarousel :items="items" height="300px" />
</template>

<script setup>
import { XCarousel } from '@xlui/xux-ui'

const items = [
  {
    image: 'https://picsum.photos/800/400?random=1',
    title: '精彩瞬间 1',
    description: '探索美好世界'
  },
  {
    image: 'https://picsum.photos/800/400?random=2',
    title: '精彩瞬间 2',
    description: '记录生活点滴'
  },
  {
    image: 'https://picsum.photos/800/400?random=3',
    title: '精彩瞬间 3',
    description: '分享美好时刻'
  }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 淡入淡出

使用淡入淡出动画效果。

:::demo

```vue
<template>
  <XCarousel :items="items" effect="fade" height="300px" />
</template>

<script setup>
import { XCarousel } from '@xlui/xux-ui'

const items = [
  { image: 'https://picsum.photos/800/400?random=4', title: '淡入效果 1' },
  { image: 'https://picsum.photos/800/400?random=5', title: '淡入效果 2' },
  { image: 'https://picsum.photos/800/400?random=6', title: '淡入效果 3' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 缩放动画

带有缩放动画的切换效果。

:::demo

```vue
<template>
  <XCarousel :items="items" effect="zoom" height="300px" />
</template>

<script setup>
import { XCarousel } from '@xlui/xux-ui'

const items = [
  { image: 'https://picsum.photos/800/400?random=7', title: '缩放动画 1' },
  { image: 'https://picsum.photos/800/400?random=8', title: '缩放动画 2' },
  { image: 'https://picsum.photos/800/400?random=9', title: '缩放动画 3' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 翻转效果

3D翻转动画效果。

:::demo

```vue
<template>
  <XCarousel :items="items" effect="flip" height="300px" />
</template>

<script setup>
import { XCarousel } from '@xlui/xux-ui'

const items = [
  { image: 'https://picsum.photos/800/400?random=10', title: '翻转效果 1' },
  { image: 'https://picsum.photos/800/400?random=11', title: '翻转效果 2' },
  { image: 'https://picsum.photos/800/400?random=12', title: '翻转效果 3' }
]
</script>
```

:::

</div>

</div>

<div style="margin-top: 24px;">

## 3D Coverflow 效果

超炫酷的 3D Coverflow 效果，展示前后图片，仿 Apple iTunes 风格。

:::demo

```vue
<template>
  <XCarousel :items="items" effect="3d-coverflow" height="420px" :interval="4000" />
</template>

<script setup>
import { XCarousel } from '@xlui/xux-ui'

const items = [
  { image: 'https://picsum.photos/800/500?random=13', title: '3D 效果 1', description: '超炫酷的立体展示' },
  { image: 'https://picsum.photos/800/500?random=14', title: '3D 效果 2', description: '视觉冲击力十足' },
  { image: 'https://picsum.photos/800/500?random=15', title: '3D 效果 3', description: '沉浸式体验' },
  { image: 'https://picsum.photos/800/500?random=16', title: '3D 效果 4', description: '前沿设计风格' },
  { image: 'https://picsum.photos/800/500?random=17', title: '3D 效果 5', description: '创新交互体验' }
]
</script>
```

:::

## 卡片堆叠效果

卡片堆叠动画，带有阴影和旋转效果。

:::demo

```vue
<template>
  <XCarousel :items="items" effect="cards" height="420px" :interval="3500" />
</template>

<script setup>
import { XCarousel } from '@xlui/xux-ui'

const items = [
  { image: 'https://picsum.photos/900/600?random=40', title: '卡片效果 1', description: '优雅的堆叠动画' },
  { image: 'https://picsum.photos/900/600?random=41', title: '卡片效果 2', description: '自然的过渡效果' },
  { image: 'https://picsum.photos/900/600?random=42', title: '卡片效果 3', description: '立体感十足' },
  { image: 'https://picsum.photos/900/600?random=43', title: '卡片效果 4', description: '层次分明' }
]
</script>
```

:::

## 创意动画效果

富有创意的立体旋转动画效果。

:::demo

```vue
<template>
  <XCarousel :items="items" effect="creative" height="420px" :interval="3500" />
</template>

<script setup>
import { XCarousel } from '@xlui/xux-ui'

const items = [
  { image: 'https://picsum.photos/900/600?random=50', title: '创意动画 1', description: '富有想象力的动画' },
  { image: 'https://picsum.photos/900/600?random=51', title: '创意动画 2', description: '独特的视觉体验' },
  { image: 'https://picsum.photos/900/600?random=52', title: '创意动画 3', description: '充满活力' },
  { image: 'https://picsum.photos/900/600?random=53', title: '创意动画 4', description: '令人印象深刻' }
]
</script>
```

:::

</div>

<div style="columns: 2; column-gap: 32px; margin-top: 24px;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 垂直方向

设置垂直方向的走马灯。

:::demo

```vue
<template>
  <XCarousel :items="items" direction="vertical" height="400px" />
</template>

<script setup>
import { XCarousel } from '@xlui/xux-ui'

const items = [
  { image: 'https://picsum.photos/800/400?random=18', title: '垂直滚动 1' },
  { image: 'https://picsum.photos/800/400?random=19', title: '垂直滚动 2' },
  { image: 'https://picsum.photos/800/400?random=20', title: '垂直滚动 3' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 控制轮播速度

通过 `interval` 属性控制自动播放的时间间隔。

:::demo

```vue
<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">快速切换（1秒）</div>
      <XCarousel :items="items" :interval="1000" height="280px" />
    </div>
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">慢速切换（5秒）</div>
      <XCarousel :items="items" :interval="5000" height="280px" />
    </div>
  </div>
</template>

<script setup>
import { XCarousel } from '@xlui/xux-ui'

const items = [
  { image: 'https://picsum.photos/800/400?random=60', title: '图片 1' },
  { image: 'https://picsum.photos/800/400?random=61', title: '图片 2' },
  { image: 'https://picsum.photos/800/400?random=62', title: '图片 3' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 指示器位置

支持 4 个方向的指示器位置：上、下、左、右。

:::demo

```vue
<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">顶部指示器</div>
      <XCarousel :items="items" indicator-position="top" height="280px" />
    </div>
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">底部指示器（默认）</div>
      <XCarousel :items="items" indicator-position="bottom" height="280px" />
    </div>
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">左侧指示器</div>
      <XCarousel :items="items" indicator-position="left" height="280px" />
    </div>
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">右侧指示器</div>
      <XCarousel :items="items" indicator-position="right" height="280px" />
    </div>
  </div>
</template>

<script setup>
import { XCarousel } from '@xlui/xux-ui'

const items = [
  { image: 'https://picsum.photos/800/400?random=21', title: '位置示例 1' },
  { image: 'https://picsum.photos/800/400?random=22', title: '位置示例 2' },
  { image: 'https://picsum.photos/800/400?random=23', title: '位置示例 3' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 箭头显示控制

控制箭头的显示时机：始终显示、悬停显示、永不显示。

:::demo

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">始终显示</div>
      <XCarousel :items="items" arrow="always" height="250px" />
    </div>
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">悬停显示（默认）</div>
      <XCarousel :items="items" arrow="hover" height="250px" />
    </div>
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">隐藏箭头</div>
      <XCarousel :items="items" arrow="never" height="250px" />
    </div>
  </div>
</template>

<script setup>
import { XCarousel } from '@xlui/xux-ui'

const items = [
  { image: 'https://picsum.photos/800/400?random=24', title: '箭头示例 1' },
  { image: 'https://picsum.photos/800/400?random=25', title: '箭头示例 2' },
  { image: 'https://picsum.photos/800/400?random=26', title: '箭头示例 3' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 隐藏指示器

通过 `indicator` 属性控制是否显示指示器。

:::demo

```vue
<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">显示指示器（默认）</div>
      <XCarousel :items="items" :indicator="true" height="280px" />
    </div>
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px">隐藏指示器</div>
      <XCarousel :items="items" :indicator="false" height="280px" />
    </div>
  </div>
</template>

<script setup>
import { XCarousel } from '@xlui/xux-ui'

const items = [
  { image: 'https://picsum.photos/800/400?random=70', title: '纯净模式 1' },
  { image: 'https://picsum.photos/800/400?random=71', title: '纯净模式 2' },
  { image: 'https://picsum.photos/800/400?random=72', title: '纯净模式 3' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 自定义内容

使用插槽自定义轮播内容。

:::demo

```vue
<template>
  <XCarousel :items="products"  height="320px">
    <template #default="{ item }">
      <div :style="{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: item.bg,
        position: 'relative'
      }">
        <div style="text-align: center; color: #1a1a1a; padding: 40px;">
          <div style="font-size: 64px; margin-bottom: 24px">{{ item.icon }}</div>
          <div style="font-size: 28px; font-weight: 600; margin-bottom: 12px">{{ item.name }}</div>
          <div style="font-size: 18px; color: #666">{{ item.description }}</div>
          <div style="margin-top: 24px; padding: 8px 24px; background: #1a1a1a; color: white; display: inline-block; border-radius: 4px; font-size: 16px; font-weight: 500">
            {{ item.price }}
          </div>
        </div>
      </div>
    </template>
  </XCarousel>
</template>

<script setup>
import { XCarousel } from '@xlui/xux-ui'

const products = [
  { icon: '🎮', name: '游戏主机', description: '畅玩精彩游戏', price: '¥2999', bg: '#f0f9ff' },
  { icon: '📱', name: '智能手机', description: '体验极速5G', price: '¥4999', bg: '#fef3c7' },
  { icon: '💻', name: '笔记本电脑', description: '高效办公利器', price: '¥8999', bg: '#fee2e2' },
  { icon: '⌚', name: '智能手表', description: '健康生活助手', price: '¥1999', bg: '#f3e8ff' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 事件监听

监听轮播切换事件。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XCarousel :items="items" height="250px" @change="handleChange" />
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px; font-size: 14px">
      当前索引：{{ currentIndex + 1 }} / {{ items.length }}
    </div>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCarousel } from '@xlui/xux-ui'

const currentIndex = ref(0)

const items = [
  { image: 'https://picsum.photos/800/400?random=27', title: '图片 1' },
  { image: 'https://picsum.photos/800/400?random=28', title: '图片 2' },
  { image: 'https://picsum.photos/800/400?random=29', title: '图片 3' }
]

const handleChange = (current, prev) => {
  currentIndex.value = current
}
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 手动控制

通过 ref 手动控制轮播。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <XCarousel ref="carouselRef" :items="items" :autoplay="false" height="250px" />
    <XFlex gap="12" justify="center">
      <XButton @click="carouselRef?.prev()">上一张</XButton>
      <XButton type="primary" @click="carouselRef?.next()">下一张</XButton>
      <XButton @click="carouselRef?.goTo(0)">回到首页</XButton>
    </XFlex>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XCarousel, XButton } from '@xlui/xux-ui'

const carouselRef = ref()

const items = [
  { image: 'https://picsum.photos/800/400?random=30', title: '图片 1' },
  { image: 'https://picsum.photos/800/400?random=31', title: '图片 2' },
  { image: 'https://picsum.photos/800/400?random=32', title: '图片 3' },
  { image: 'https://picsum.photos/800/400?random=33', title: '图片 4' }
]
</script>
```

:::

</div>

</div>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| items | 轮播项数据 | `CarouselItem[]` | `[]` |
| initial-index | 初始索引 | `number` | `0` |
| autoplay | 是否自动播放 | `boolean` | `true` |
| interval | 自动播放间隔（毫秒） | `number` | `3000` |
| effect | 切换动画效果 | `'slide' \| 'fade' \| 'zoom' \| 'flip' \| '3d-coverflow' \| 'cards' \| 'creative'` | `'slide'` |
| direction | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| height | 高度 | `string` | `'400px'` |
| arrow | 箭头显示时机 | `'always' \| 'hover' \| 'never'` | `'hover'` |
| indicator | 是否显示指示器 | `boolean` | `true` |
| indicator-position | 指示器位置 | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` |
| loop | 是否循环播放 | `boolean` | `true` |
| duration | 动画持续时间（毫秒） | `number` | `600` |
| pause-on-hover | 鼠标悬停时是否暂停 | `boolean` | `true` |

### CarouselItem

| 属性名 | 说明 | 类型 |
|--------|------|------|
| key | 唯一标识 | `string \| number` |
| image | 图片地址 | `string` |
| title | 标题 | `string` |
| description | 描述 | `string` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 切换时触发 | `(current: number, prev: number)` |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 自定义轮播内容 | `{ item: CarouselItem, index: number }` |

### Exposes

| 方法名 | 说明 | 参数 |
|--------|------|------|
| prev | 切换到上一张 | - |
| next | 切换到下一张 | - |
| goTo | 切换到指定索引 | `(index: number)` |
| getCurrentIndex | 获取当前索引 | - |

