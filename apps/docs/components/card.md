# Card 卡片

卡片组件，支持商品卡片、信息卡片和基础卡片三种类型。采用 iOS 17 设计语言，提供精致的毛玻璃效果、流畅的动画和优雅的光效。

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 32px;">

<div>

## 商品卡片（不带描述）

商品卡片默认不显示描述，包含产品图片、名称、价格和收藏功能。

:::demo

```vue
<template>
  <div style="max-width: 280px;">
    <XCard 
      type="product"
      title="北欧风简约陶瓷花瓶"
      image="https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400"
      price="¥299"
      label="热卖"
      @click="handleClick"
      @like="handleLike"
    />
  </div>
</template>

<script setup>
const handleClick = () => {
  console.log('点击卡片')
}

const handleLike = () => {
  console.log('点击收藏')
}
</script>
```

:::

</div>

<div>

## 商品卡片（带描述）

通过 `showDescription` 属性可以显示商品描述。

:::demo

```vue
<template>
  <div style="max-width: 280px;">
    <XCard 
      type="product"
      title="手工编织棉麻抱枕套"
      description="纯手工编织，采用优质棉麻面料，触感柔软舒适，为您的家居增添一抹温馨。"
      image="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400"
      price="¥89"
      label="新品"
      :show-description="true"
      :is-liked="true"
      @click="handleClick"
      @like="handleLike"
    />
  </div>
</template>

<script setup>
const handleClick = () => {
  console.log('点击卡片')
}

const handleLike = () => {
  console.log('点击收藏')
}
</script>
```

:::

</div>

</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 24px;">

<div>

## 商品卡片列表

在网格布局中使用多个商品卡片。

:::demo

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px;">
    <XCard 
      v-for="product in products" 
      :key="product.id"
      type="product"
      :title="product.title"
      :image="product.image"
      :price="product.price"
      :label="product.label"
      @click="handleClick(product.id)"
      @like="handleLike(product.id)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  {
    id: '1',
    title: '实木原木置物架',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400',
    price: '¥459',
    label: ''
  },
  {
    id: '2',
    title: 'ins风格桌面摆件',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400',
    price: '¥129',
    label: '特价'
  },
  {
    id: '3',
    title: '现代简约台灯',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    price: '¥399',
    label: '热卖'
  }
])

const handleClick = (id) => {
  console.log('点击产品:', id)
}

const handleLike = (id) => {
  console.log('收藏产品:', id)
}
</script>
```

:::

</div>

<div>

## 信息卡片

信息卡片用于展示带图标的信息内容。

:::demo

```vue
<template>
  <div style="max-width: 400px;">
    <XCard 
      type="info"
      icon="mdi:chart-line"
      title="销售统计"
      description="本月销售额同比增长 25%，环比增长 15%"
      extra="更新时间：2024-01-15"
      @click="handleClick"
    />
  </div>
</template>

<script setup>
const handleClick = () => {
  console.log('点击卡片')
}
</script>
```

:::

## 基础卡片

基础卡片支持自定义内容插槽。

:::demo

```vue
<template>
  <div style="max-width: 400px;">
    <XCard 
      type="basic"
      title="自定义卡片"
      description="这是一个基础卡片，可以通过插槽自定义内容。"
      @click="handleClick"
    >
      <div style="padding: 12px; background: #f3f4f6; border-radius: 8px; margin-top: 8px;">
        <p style="margin: 0; color: #6b7280;">这里可以放置任意自定义内容</p>
      </div>
    </XCard>
  </div>
</template>

<script setup>
const handleClick = () => {
  console.log('点击卡片')
}
</script>
```

:::

## 基础卡片带图片

基础卡片也可以显示图片。

:::demo

```vue
<template>
  <div style="max-width: 280px;">
    <XCard 
      type="basic"
      title="精美风景"
      description="探索世界的美好，记录生活的点滴。"
      image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
      @click="handleClick"
    />
  </div>
</template>

<script setup>
const handleClick = () => {
  console.log('点击卡片')
}
</script>
```

:::

</div>

</div>

## API

### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 卡片类型 | `string` | `product` / `info` / `basic` | `basic` |
| title | 标题 | `string` | - | - |
| description | 描述 | `string` | - | - |
| image | 图片地址 | `string` | - | - |
| label | 标签（商品卡片） | `string` | - | - |
| price | 价格（商品卡片） | `string` | - | - |
| showDescription | 是否显示描述（商品卡片） | `boolean` | - | `false` |
| showLike | 是否显示收藏按钮（商品卡片） | `boolean` | - | `true` |
| isLiked | 是否已收藏（商品卡片） | `boolean` | - | `false` |
| icon | 图标（信息卡片） | `string` | - | - |
| extra | 额外信息（信息卡片） | `string` | - | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击卡片时触发 | - |
| like | 点击收藏按钮时触发（商品卡片） | - |

### Slots

| 插槽名 | 说明 | 适用类型 |
|--------|------|----------|
| default | 自定义卡片内容 | `basic` |

## 设计说明

### 卡片类型

- **商品卡片（product）**：专为电商场景设计，包含图片、标题、价格、标签和收藏功能
- **信息卡片（info）**：适合展示统计信息、通知消息等，支持图标和额外信息
- **基础卡片（basic）**：灵活的通用卡片，支持自定义内容插槽


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
  <div class="contributor-item">
    <a href="https://gitee.com/haijun-li" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://p3.itc.cn/images01/20230307/e9d72e3788844ed1a9259e442899e1bd.png" 
        alt="lihaijun"
        class="contributor-avatar"
      />
      <span class="contributor-name">lihaijun</span>
    </a>
  </div>
</div>

